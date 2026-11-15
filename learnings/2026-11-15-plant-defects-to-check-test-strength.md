---
date: 2026-11-15
source: a private project
tags: [testing, verification]
status: raw
promoted_to: []
---

# Planted defects expose gaps hidden by green feature tests

**What happened.** Isolated feature pilots deliberately introduced plausible regressions and reverted them after each check. Some existing tests caught the defect; others still passed when output ordering was wrong or invalid input was persisted. New semantic assertions caught those previously missed cases.

**Why.** A green test only supports its asserted postconditions. Counts, UI presence and happy-path status can all pass while content integrity or rejection behavior is wrong.

**Do instead.** For consequential changes, select a realistic bad outcome and verify that existing tests fail when it occurs. Assert actual output content, persisted state and negative-path refusal through the canonical test harness. Add the smallest regression that detects the missed failure. Avoid running planted defects against production.

**Evidence.** Controlled pilot runs compared passing source with isolated, intentionally broken variants and distinguished detected failures from missed ones. This does not demonstrate that every untested behavior is now covered.
