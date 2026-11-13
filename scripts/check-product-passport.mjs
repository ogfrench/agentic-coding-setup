#!/usr/bin/env node
// Optional Product Passport validator: navigation integrity is not runtime proof.
import { readFileSync, realpathSync, statSync, writeFileSync, mkdirSync, lstatSync, openSync, closeSync, constants } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const INDEX = 'docs/product-passport/index.json';
const ID = /^[a-z][a-z0-9-]*$/;
const inside = (root, path) => path === root || path.startsWith(root + sep);

function existing(root, entry, kind) {
  if (typeof entry !== 'string' || !entry || isAbsolute(entry) ||
    entry.includes('\\') || entry.split('/').some(p => !p || p === '.' || p === '..')) {
    throw Error('Invalid ' + kind + ' path: ' + JSON.stringify(entry));
  }
  const target = resolve(root, entry);
  if (!inside(root, target)) throw Error('Path escapes repository: ' + entry);
  let actual;
  try { actual = realpathSync(target); }
  catch { throw Error('Missing ' + kind + ' path: ' + entry); }
  if (!inside(root, actual)) throw Error('Symlink escapes repository: ' + entry);
  const stat = statSync(actual);
  if (kind !== 'source' && !stat.isFile()) throw Error(kind + ' must be a file: ' + entry);
  if (kind === 'source' && !stat.isFile() && !stat.isDirectory()) throw Error('Invalid source: ' + entry);
  return { path: entry, directory: stat.isDirectory() };
}

export function validatePassport(repositoryRoot) {
  const root = realpathSync(resolve(repositoryRoot));
  existing(root, 'docs/product-passport/README.md', 'map');
  existing(root, INDEX, 'map');
  let index;
  try { index = JSON.parse(readFileSync(resolve(root, INDEX), 'utf8')); }
  catch (error) { throw Error('Cannot parse ' + INDEX + ': ' + error.message); }
  if (index.schemaVersion !== 1 || !Array.isArray(index.capabilities) || !index.capabilities.length) {
    throw Error('Passport needs schemaVersion 1 and a nonempty capabilities array');
  }
  const ids = new Set();
  const capabilities = index.capabilities.map(entry => {
    if (!entry || !ID.test(entry.id || '') || ids.has(entry.id)) {
      throw Error('Invalid or duplicate capability id: ' + entry?.id);
    }
    ids.add(entry.id);
    if (typeof entry.summary !== 'string' || entry.summary.trim().length < 12) {
      throw Error('Missing meaningful summary for ' + entry.id);
    }
    if (typeof entry.map !== 'string' || !entry.map.startsWith('docs/product-passport/')) {
      throw Error('Invalid feature map for ' + entry.id);
    }
    existing(root, entry.map, 'map');
    if (!Array.isArray(entry.source) || !entry.source.length ||
      !Array.isArray(entry.tests) || !entry.tests.length) {
      throw Error('Capability ' + entry.id + ' needs source and existing test references');
    }
    return {
      id: entry.id, map: entry.map,
      source: entry.source.map(p => existing(root, p, 'source')),
      tests: entry.tests.map(p => existing(root, p, 'test').path),
    };
  });
  return { root, capabilities };
}

export function detectImpact(capabilities, paths) {
  const changes = [...new Set(paths)].sort();
  const touches = (f, p) => f.source.some(s => p === s.path || (s.directory && p.startsWith(s.path + '/')));
  return {
    impacted: capabilities.filter(f => changes.some(p => touches(f, p))).map(f => f.id),
    unmapped: changes.filter(p => !capabilities.some(f => touches(f, p))),
  };
}

export function reportPassport(repositoryRoot, changedPaths = [], expectedRevision = process.env.GITHUB_SHA) {
  const { root, capabilities } = validatePassport(repositoryRoot);
  let sha = null;
  try { sha = execFileSync('git', ['-C', root, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(); }
  catch { /* Fixtures can be outside Git. */ }
  if (expectedRevision && sha !== expectedRevision) {
    throw Error('Checkout revision differs from GITHUB_SHA');
  }
  return {
    schemaVersion: 1, sourceRevision: sha, kind: 'navigation-integrity-only',
    navigation: 'passed', behavior: 'not_run', hostAcceptance: 'not_run',
    capabilities: capabilities.map(f => ({ id: f.id, map: f.map, tests: f.tests })),
    impact: detectImpact(capabilities, changedPaths),
  };
}

function main(args) {
  let root = '.', base, output;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--root') root = args[++i];
    else if (args[i] === '--base') base = args[++i];
    else if (args[i] === '--evidence') output = args[++i];
    else throw Error('Unknown argument: ' + args[i]);
    if (!root || (args[i-1] === '--base' && !base) || (args[i-1] === '--evidence' && !output)) {
      throw Error('Missing option argument');
    }
  }
  root = realpathSync(resolve(root));
  const changes = base ? execFileSync('git',
    ['-C', root, 'diff', '--name-only', '-z', '--diff-filter=ACMR', base + '...HEAD'])
    .toString('utf8').split('\0').filter(Boolean) : [];
  const report = JSON.stringify(reportPassport(root, changes), null, 2) + '\n';
  if (output) {
    const target = resolve(root, output);
    if (!inside(root, target)) throw Error('Evidence output escapes repository');
    // Evidence is generated output. Do not allow a typo to truncate source,
    // tests or other repository files through --evidence.
    if (!relative(root, target).split(sep).join('/').startsWith('.dune/')) {
      throw Error('Evidence output must be under .dune/');
    }
    // Check each ancestor *before* creating subdirectories. Recursive mkdir could
    // otherwise follow a link and create directories outside the checkout.
    const parent = dirname(target);
    let current = root;
    for (const part of relative(root, parent).split(sep).filter(Boolean)) {
      current = resolve(current, part);
      try {
        const stat = lstatSync(current);
        if (stat.isSymbolicLink() || !stat.isDirectory()) {
          throw Error('Evidence output directory contains a symlink or non-directory');
        }
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        mkdirSync(current);
      }
    }
    if (realpathSync(parent) !== parent) {
      throw Error('Evidence output directory contains a symlink');
    }
    try {
      const stat = lstatSync(target);
      if (stat.isSymbolicLink() || !stat.isFile()) {
        throw Error('Evidence output must be a regular file, not a symlink');
      }
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    // O_NOFOLLOW closes the final-component symlink race on supporting platforms.
    const fd = openSync(target, constants.O_WRONLY | constants.O_CREAT |
      constants.O_TRUNC | (constants.O_NOFOLLOW ?? 0), 0o600);
    try { writeFileSync(fd, report); } finally { closeSync(fd); }
  }
  process.stdout.write(report);
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(process.argv.slice(2)); }
  catch (error) { console.error('Product Passport: ' + error.message); process.exitCode = 1; }
}
