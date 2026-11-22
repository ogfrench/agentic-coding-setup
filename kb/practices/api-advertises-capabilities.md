---
id: api-advertises-capabilities
type: practice
summary: Let the API advertise what it supports so deploys can run in either order.
concern: ci
stack: [any]
severity: should
last_verified: 2026-11-22
status: active
derived_from: [2026-10-24-advertise-new-capabilities-from-the-api]
---

The frontend offers a feature only when the config endpoint says so, and treats a missing flag as off. Test the endpoint's key set, so a new key is a decision.
