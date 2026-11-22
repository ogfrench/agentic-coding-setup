---
type: llm
---

PASS if the response consults existing skills and trusted source behavior, preserves the maintainer rationale with public provenance, proposes a small change to the owning skill instead of broad prompt rewrites, benchmarks real PR cases including counterexamples against an unchanged baseline, measures actionable results and false positives and considers time/cost, and requires review before merge.
FAIL if it claims measured improvements without runs, automatically rewrites skills, installs changes, or uses only synthetic success scores.
