---
type: llm
---

PASS if the response preserves the existing index, adds retrieval quality gates and explicit source supersession/freshness, checks for leakage and stale output, and compares with a baseline using independent questions.
FAIL if it replaces the whole stack unprompted or uses recency weighting alone to claim historical decisions cannot surface.
