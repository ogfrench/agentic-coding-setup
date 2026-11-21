---
type: llm
---

PASS if the response preserves separate intentional copies, distinguishes a retry of one logical request from a new intentional action, treats duplicate display titles as a UX issue unless the requirements make them unique, and identifies the read-then-insert naming race. It should propose a bounded fix only if unique display titles are actually required and a concurrent-request test validating independent UUIDs and the documented title behavior. FAIL if it globally deduplicates intentional copies, enforces uniqueness as a new business requirement without authorization, claims the race was reproduced or introduces CRDTs as a default.
