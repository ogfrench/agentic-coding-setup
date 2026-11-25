---
max_turns: 8
allowed_tools: [Skill]
---

A release PR renames several UI download buttons, accessible labels and onboarding steps, and edits example prompts. Fast checks pass, but full CI's generated-site test stopped at the first obsolete text assertion; package repinning and browser acceptance are expensive. No checkout is available. Explain how to identify the remaining failures before another full run, keep meaningful coverage, and sequence verification.
