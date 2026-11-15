import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const source = /\.(?:js|mjs|cjs|jsx|ts|tsx|css|py)$/;
const exception = /^(?:\/\/\s*(?:@ts-|eslint-|prettier-ignore|biome-ignore|# sourceMappingURL)|\/\*\s*(?:!|@license)|#(?:!|\s*(?:type:|noqa|pragma:|coding[:=])))/;

export function addedCommentViolations(diff) {
  const findings = [];
  let file = '';
  let lineNumber = 0;
  let inHunk = false;
  for (const line of diff.split('\n')) {
    if (line.startsWith('diff --git ')) {
      file = '';
      inHunk = false;
    } else if (line.startsWith('+++ b/')) {
      file = line.slice(6);
    } else if (line.startsWith('@@')) {
      lineNumber = Number(/\+(\d+)/.exec(line)?.[1] || 0);
      inHunk = true;
    } else if (inHunk && line.startsWith('+') && !line.startsWith('+++')) {
      const added = line.slice(1).trimStart();
      const comment = /^(?:\/\/|\/\*|\*\s)/.test(added) || (file.endsWith('.py') && /^#/.test(added));
      if (source.test(file) && comment && !exception.test(added)) findings.push(`${file}:${lineNumber}`);
      lineNumber += 1;
    } else if (inHunk && line.startsWith(' ')) {
      lineNumber += 1;
    }
  }
  return findings;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [base, head] = process.argv.slice(2);
  if (!/^[a-f0-9]{40}$/.test(base || '') || !/^[a-f0-9]{40}$/.test(head || '')) {
    console.error('Usage: node scripts/check-added-comments.mjs BASE_SHA HEAD_SHA');
    process.exitCode = 2;
  } else {
    const diff = execFileSync('git', ['diff', '--no-ext-diff', '--unified=0', base, head, '--'], { encoding: 'utf8', maxBuffer: 16 << 20 });
    const findings = addedCommentViolations(diff);
    if (findings.length) {
      console.error(`New explanatory comments: ${findings.join(', ')}. Put the invariant in code/tests or remove the comment.`);
      process.exitCode = 1;
    }
  }
}
