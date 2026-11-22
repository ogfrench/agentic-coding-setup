---
id: pass-the-whole-object-through
type: practice
summary: A loader that picks fields drops new ones silently; pass the object through.
concern: testing
stack: [any]
severity: should
last_verified: 2026-11-22
status: active
derived_from: [2026-10-24-a-picked-passthrough-drops-new-fields]
---

An explicit pick is an allow-list, and a missing field reads as off. Trace each hop of a new field, and cover it with one end-to-end test that asserts the feature appears.
