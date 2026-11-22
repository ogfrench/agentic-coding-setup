---
id: sign-in-link-needs-a-press
type: practice
summary: A sign-in link must not sign in on load; mail scanners open links and run pages.
concern: security
stack: [any]
severity: should
last_verified: 2026-11-22
status: active
derived_from: [2026-10-24-email-sign-in-links-wait-for-a-press]
---

Show a button and act only when it is pressed, disabled until the page hydrates. After the fix, revoke sessions that scanners created before it.
