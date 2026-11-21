---
max_turns: 8
allowed_tools: [Skill]
---

A shared quiz app creates a new editable quiz for each distinct "Make a copy" action, including a second click on another visit. Copies have separate UUIDs. Display names usually become "Quiz (copy)", then "Quiz (copy-2)", but titles are not identifiers and the product deliberately has no title uniqueness rule. Currently the server reads existing titles then saves a copy, so simultaneous requests could pick the same display suffix. A developer proposes globally idempotent copy requests plus a unique constraint on titles. Assess what actually breaks, the smallest appropriate changes, and a deterministic race test. No checkout or executed tests are available.
