---
id: hash-credentials-before-keying
type: practice
summary: Before keying a record by an id, check whether that id proves anything; if so, hash it.
concern: security
stack: [any]
severity: should
last_verified: 2026-11-22
status: active
derived_from: [2026-10-26-never-key-records-by-a-credential]
---

A join key reused from a credential is copied into every backup and dump. Name the column for what it holds, and check the logs and reports that read the table too.
