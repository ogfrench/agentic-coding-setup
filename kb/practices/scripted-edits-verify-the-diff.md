---
id: scripted-edits-verify-the-diff
type: practice
summary: After a scripted edit, insert at a fixed anchor and read the diff.
concern: ci
stack: [any]
severity: should
last_verified: 2026-11-22
status: active
derived_from: [2026-10-18-scripted-import-insertion-can-land-in-a-string, 2026-10-24-scripted-edits-can-delete-their-anchor]
---

An anchor that ends mid-guard can delete the guard while the assert still passes. Run the formatter's check and the type check on each edited file before committing.
