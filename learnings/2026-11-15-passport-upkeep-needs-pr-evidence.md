---
date: 2026-11-15
source: a private project
tags: [docs, process, verification]
status: raw
promoted_to: []
---

# A passport upkeep rule needs an observable PR decision

**What happened.** Source-linked maps were adopted, but later substantive change PRs did not record whether their maps were updated, unaffected or blocked. Some dated pilot scratchpads continued to describe already merged work as pending.

**Why.** A written agent rule is not enforced by a validator that checks only whether referenced files exist. Historical status text also decays independently of source.

**Do instead.** Record one reviewable outcome in each affected PR: `map updated` with paths, `map unchanged` with a reason, or `map blocked` with missing evidence. Store current progress in the PR and use live release/CI facts. Start path/diff drift checking as advisory, measure false positives and cost, and only then consider a mandatory CI gate.

**Evidence.** Review of follow-up change records and their product maps revealed missing upkeep decisions and stale historical status. No cross-agent compliance rate or enforcement benchmark was measured.
