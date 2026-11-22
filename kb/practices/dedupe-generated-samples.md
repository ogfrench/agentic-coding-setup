---
id: dedupe-generated-samples
type: practice
summary: Dedupe generated samples by what the viewer sees; append the structural close last.
concern: testing
stack: [any]
severity: should
last_verified: 2026-11-22
status: active
derived_from: [2026-10-18-generated-samples-repeat-repeated-slots]
---

Repeated slots filled with the same placeholder make identical slides. Dedupe by layout plus variant, not by slot, and append the close last.
