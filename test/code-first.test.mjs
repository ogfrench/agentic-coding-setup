import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addedCommentViolations } from '../scripts/check-added-comments.mjs';

test('rejects new standalone explanatory comments in code', () => {
  const diff = [
    'diff --git a/src/app.ts b/src/app.ts',
    '+++ b/src/app.ts',
    '@@ -1,0 +5,2 @@',
    '+// Explains the obvious',
    '+const answer = 42;',
    'diff --git a/site/styles.css b/site/styles.css',
    '+++ b/site/styles.css',
    '@@ -1,0 +1 @@',
    '+/* Decorative remark */',
    'diff --git a/task.py b/task.py',
    '+++ b/task.py',
    '@@ -1,0 +1 @@',
    '+# another explanation'
  ].join('\n');
  assert.deepEqual(addedCommentViolations(diff), ['src/app.ts:5', 'site/styles.css:1', 'task.py:1']);
});

test('preserves tool directives, legal notices and non-comment syntax', () => {
  const diff = [
    'diff --git a/app.ts b/app.ts',
    '+++ b/app.ts',
    '@@ -1,0 +1,4 @@',
    '+// @ts-expect-error third-party contract',
    '+/* @license MIT */',
    '+const url = "https://example.com";',
    '+const css = "/* generated asset */";',
    'diff --git a/x.py b/x.py',
    '+++ b/x.py',
    '@@ -1,0 +1,2 @@',
    '+#!/usr/bin/env python3',
    '+# type: ignore[assignment]',
    'diff --git a/copyright.ts b/copyright.ts',
    '+++ b/copyright.ts',
    '@@ -1,0 +1,3 @@',
    '+// SPDX-FileCopyrightText: 2026 contributors',
    '+// SPDX-License-Identifier: MPL-2.0',
    '+/* @license MIT */',
    'diff --git a/header.py b/header.py',
    '+++ b/header.py',
    '@@ -1,0 +1,2 @@',
    '+# SPDX-FileCopyrightText: 2026 contributors',
    '+# SPDX-License-Identifier: MPL-2.0',
    'diff --git a/README.md b/README.md',
    '+++ b/README.md',
    '@@ -1,0 +1 @@',
    '+// This is prose, not source'
  ].join('\n');
  assert.deepEqual(addedCommentViolations(diff), []);
});
