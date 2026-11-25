---
type: llm
---

PASS if the answer audits the complete copy diff against test assertions, selectors, accessible names, fixtures and later masked assertions; distinguishes intended copy contracts from behavior selectors; preserves meaningful negative and accessibility coverage; proposes fresh-output focused checks before repinning and final-SHA full CI; batches corrections; and reports unavailable execution as unverified.
FAIL if it fixes only the first red assertion, deletes valid coverage, skips required acceptance, or claims unavailable tests passed.
