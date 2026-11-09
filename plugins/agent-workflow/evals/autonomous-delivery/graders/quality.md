---
type: llm
---

PASS if the response focuses on durable PR state: re-read current head, PR body, issue and reviews, reconcile completed/blocked checkboxes with exact-head CI, preserve decisions and handover with a concrete next action, and distinguish no-job scheduling from failed test jobs. It must not fabricate repo access or completed actions. Execution can be delegated to the delivery-loop skill.
FAIL if the response treats a compacted summary as proof, blindly repeats all tasks, marks stale CI green, duplicates PR trackers, bypasses controls, or claims to have performed checks or merges that were not executed.
