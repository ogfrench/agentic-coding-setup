---
id: keys-share-one-ttl
type: practice
summary: Give each session key one TTL constant; test TTLs by reading them back.
concern: data
stack: [any]
severity: should
last_verified: 2026-11-22
status: active
derived_from: [2026-10-26-session-keys-share-one-ttl]
---

Literal per-write expiries end before the session they belong to. Drive a short session against a real cache, list every key under its id, and assert each TTL. Name the expected key kinds so a renamed key cannot pass by vanishing.
