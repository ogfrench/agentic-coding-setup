---
id: magnitude-is-not-a-switch
type: practice
summary: Switch on presence, not on a magnitude that can be small; test the smallest real value.
concern: testing
stack: [any]
severity: should
last_verified: 2026-11-22
status: active
derived_from: [2026-10-11-a-magnitude-is-not-a-switch]
---

One value that carries two meanings breaks when the magnitude is small. Switch on `> 0` or pass a flag, then pin the threshold in a test.
