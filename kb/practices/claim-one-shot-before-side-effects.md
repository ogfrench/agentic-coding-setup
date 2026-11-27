---
id: claim-one-shot-before-side-effects
type: practice
summary: Claim a one-shot action before its side effects; answer a retry with the first result.
concern: data
stack: [any]
severity: should
last_verified: 2026-11-22
status: active
derived_from: [2026-10-26-claim-a-one-shot-action-before-its-side-effects]
related: [claim-shared-work-atomically]
---

A check that asks whether the action is allowed stays true after its first success. Set a pending claim with set-if-absent, then write the final result over it. A retry that finds a pending claim gets 409.
