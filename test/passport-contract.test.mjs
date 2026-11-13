import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, symlinkSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { validatePassport, detectImpact, reportPassport } from '../scripts/check-product-passport.mjs';

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'dune-passport-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const write = (path, data) => {
    const file = join(root, path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, data);
  };
  const index = { schemaVersion: 1, capabilities: [{
    id: 'search', summary: 'Visitors search for available items',
    map: 'docs/product-passport/features/search.md',
    source: ['src/search.mjs'], tests: ['test/search.test.mjs']
  }] };
  write('docs/product-passport/README.md', '# Product Passport\n');
  write('docs/product-passport/features/search.md', '# Search\n');
  write('src/search.mjs', 'export const search = () => [];\n');
  write('test/search.test.mjs', '// test\n');
  const save = () => write('docs/product-passport/index.json', JSON.stringify(index, null, 2));
  save();
  return { root, write, index, save };
}
test('validates navigation and never asserts runtime or host success', t => {
  const x = fixture(t);
  const report = reportPassport(x.root, [], null);
  assert.equal(report.navigation, 'passed');
  assert.equal(report.behavior, 'not_run');
  assert.equal(report.hostAcceptance, 'not_run');
  assert.deepEqual(report.capabilities.map(f => f.id), ['search']);
});
test('rejects stale source references', t => {
  const x = fixture(t); x.index.capabilities[0].source = ['src/missing.mjs']; x.save();
  assert.throws(() => validatePassport(x.root), /Missing source path/);
});
test('rejects absent tests and empty inventories', t => {
  const x = fixture(t); x.index.capabilities[0].tests = []; x.save();
  assert.throws(() => validatePassport(x.root), /needs source and existing test references/);
  x.index.capabilities = []; x.save();
  assert.throws(() => validatePassport(x.root), /nonempty capabilities/);
});
test('rejects duplicate IDs and vague summaries', t => {
  const x = fixture(t); x.index.capabilities.push({ ...x.index.capabilities[0] }); x.save();
  assert.throws(() => validatePassport(x.root), /duplicate capability/);
  x.index.capabilities.pop(); x.index.capabilities[0].summary = 'No'; x.save();
  assert.throws(() => validatePassport(x.root), /meaningful summary/);
});
test('rejects traversal and symlinks outside repository', t => {
  const x = fixture(t); x.index.capabilities[0].source = ['../outside.mjs']; x.save();
  assert.throws(() => validatePassport(x.root), /Invalid source path/);
  const outside = mkdtempSync(join(tmpdir(), 'dune-outside-'));
  t.after(() => rmSync(outside, { recursive: true, force: true }));
  writeFileSync(join(outside, 'data.mjs'), 'export default 1');
  symlinkSync(outside, join(x.root, 'external'));
  x.index.capabilities[0].source = ['external/data.mjs']; x.save();
  assert.throws(() => validatePassport(x.root), /Symlink escapes repository/);
});
test('reports changed implementation paths without hiding unmapped paths', t => {
  const x = fixture(t);
  const { capabilities } = validatePassport(x.root);
  assert.deepEqual(detectImpact(capabilities, ['README.md', 'src/search.mjs', 'src/search.mjs']), {
    impacted: ['search'], unmapped: ['README.md']
  });
});
test('matches nested source-directory changes', t => {
  const x = fixture(t); x.index.capabilities[0].source = ['src']; x.save();
  const { capabilities } = validatePassport(x.root);
  assert.deepEqual(detectImpact(capabilities, ['src/search.mjs']).impacted, ['search']);
});
test('CLI can write evidence but does not claim executed behavior', t => {
  const x = fixture(t);
  const script = fileURLToPath(new URL('../scripts/check-product-passport.mjs', import.meta.url));
  const run = spawnSync(process.execPath, [script, '--root', x.root, '--evidence', '.dune/evidence.json'],
    { encoding: 'utf8', env: { ...process.env, GITHUB_SHA: '' } });
  assert.equal(run.status, 0, run.stderr);
  const evidence = JSON.parse(readFileSync(join(x.root, '.dune/evidence.json'), 'utf8'));
  assert.equal(evidence.navigation, 'passed');
  assert.equal(evidence.behavior, 'not_run');
});

test('CLI refuses a symlinked evidence directory without writing outside the checkout', { skip: process.platform === 'win32' }, t => {
  const x = fixture(t);
  const outside = mkdtempSync(join(tmpdir(), 'dune-evidence-outside-'));
  t.after(() => rmSync(outside, { recursive: true, force: true }));
  symlinkSync(outside, join(x.root, 'redirect'), 'dir');
  const script = fileURLToPath(new URL('../scripts/check-product-passport.mjs', import.meta.url));
  const result = spawnSync(process.execPath,
    [script, '--root', x.root, '--evidence', 'redirect/subfolder/evidence.json'],
    { encoding: 'utf8', env: { ...process.env, GITHUB_SHA: '' } });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Evidence output directory contains a symlink/);
  assert.equal(existsSync(join(outside, 'subfolder')), false);
});

test('CLI refuses to overwrite a symlinked evidence file', { skip: process.platform === 'win32' }, t => {
  const x = fixture(t);
  const outside = mkdtempSync(join(tmpdir(), 'dune-evidence-outside-'));
  t.after(() => rmSync(outside, { recursive: true, force: true }));
  const original = join(outside, 'private.txt');
  writeFileSync(original, 'keep me');
  mkdirSync(join(x.root, '.dune'), { recursive: true });
  symlinkSync(original, join(x.root, '.dune', 'evidence.json'));
  const script = fileURLToPath(new URL('../scripts/check-product-passport.mjs', import.meta.url));
  const result = spawnSync(process.execPath,
    [script, '--root', x.root, '--evidence', '.dune/evidence.json'],
    { encoding: 'utf8', env: { ...process.env, GITHUB_SHA: '' } });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Evidence output must be a regular file/);
  assert.equal(readFileSync(original, 'utf8'), 'keep me');
});

test('requires a matching revision when an expected SHA is supplied', t => {
  const x = fixture(t);
  assert.throws(() => reportPassport(x.root, [], '0000000000000000000000000000000000000000'),
    /Checkout revision differs from GITHUB_SHA/);
});
