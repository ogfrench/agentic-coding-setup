import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

test('generated Python bytecode is not tracked as source', () => {
  const cwd = fileURLToPath(new URL('..', import.meta.url));
  const files = execFileSync('git', ['ls-files', '-z'], { cwd }).toString('utf8').split('\0').filter(Boolean);
  assert.deepEqual(files.filter(p => p.endsWith('.pyc') || p.split('/').includes('__pycache__')), []);
});
