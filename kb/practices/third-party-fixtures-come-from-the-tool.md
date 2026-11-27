---
id: third-party-fixtures-come-from-the-tool
type: practice
summary: Build a third-party fixture from the tool's own export and assert no pageerror.
concern: testing
stack: [any]
severity: should
last_verified: 2026-11-22
status: active
derived_from: [2026-10-18-fixtures-for-third-party-formats-come-from-the-tool]
---

A hand-written object lacks fields real exports carry, and the page then fails at random. To credit a fix for a flaky failure, revert it and reproduce over several repeats first.
