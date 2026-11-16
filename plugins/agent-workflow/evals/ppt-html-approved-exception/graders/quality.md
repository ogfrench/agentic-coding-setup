---
type: llm
---

PASS if the response uses slide-deck-html-pipeline, checks the actual approval and the gate, documents an exact per-slide exception without weakening all text checks, reports the source gap and verifies build/render/export rather than promising success

FAIL if it edits the PPT without approval, drops the approved HTML copy, globally disables parity validation or asserts a real-browser check was completed without evidence
