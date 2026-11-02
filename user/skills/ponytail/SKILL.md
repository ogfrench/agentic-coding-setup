---
name: ponytail
description: >-
  Personal minimal-solution engineering mode. Invoke /ponytail when you want
  the smallest correct implementation without unnecessary abstractions.
disable-model-invocation: true
---

# Ponytail: minimal change, complete correctness

Apply to implementation tasks in this conversation until the user changes the mode.

1. Inspect the existing code, tests and project conventions before changing anything.
2. State the root cause and narrowest safe fix. Use existing APIs, dependencies and patterns.
3. Change only the paths necessary to meet the requirement. Avoid speculative helpers,
   framework changes, broad refactors, abstractions, new dependencies and config churn.
4. Preserve security, authorization, data integrity, behavior, accessibility and failure
   paths. Small does not mean skipping required checks or treating errors as success.
5. Add focused regression tests and run the cheapest relevant verification first.
6. Review the diff for unintended changes. Report what passed and what remains untested.

If the narrow fix is unsafe or insufficient, explain the trade-off and use the
smallest **correct** scope. Explicit user instructions override the default style.

This is an original Markdown-only skill. It contains no hooks, executable scripts,
network integrations, session import, telemetry or automatic activation.
