---
type: llm
---

PASS if the response identifies a read-then-write race, uses a database-atomic conditional update or an equivalent transaction with capacity invariant, checks affected row count and rollback/retry behavior, and proposes a deterministic two-client race regression against real persistence. FAIL if it uses only a client-side lock, recommends CRDTs by default, ignores duplicate/retry semantics or claims tests ran.
