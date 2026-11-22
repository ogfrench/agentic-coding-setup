---
id: new-claim-keeps-old-tokens
type: practice
summary: A new required token claim must renew old tokens that lack it; test that case.
concern: security
stack: [any]
severity: should
last_verified: 2026-11-22
status: active
derived_from: [2026-10-24-new-token-claim-must-not-strand-old-tokens]
---

Treat no claim differently from a wrong claim. Test with a hand-signed token in the old format, or the deploy signs every user out and the suite never notices.
