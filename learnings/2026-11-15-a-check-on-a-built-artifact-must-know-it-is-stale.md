---
date: 2026-11-15
source: a private project
tags: [testing, ci, build]
status: practice
promoted_to: 
  - plugins/agent-workflow/skills/best-practices/testing.md
---

# A check that measures a built artifact reads stale output after a source change

**What happened.** A layout check measured a folder produced by the site build. After a layout fix, the check still reported the old failures, and for hours they were treated as real, unfixed defects. The folder had simply not been rebuilt, because the build was blocked by an unrelated guard.

**Why.** The check reads the built output and never the source, so it cannot see a change until the build runs. Nothing in the check says how old its input is, so a stale folder and a real finding look the same.

**Do instead.** Make the check print the age of the artifact it read, and fail (or rebuild) when the artifact is older than the sources it came from. When a finding survives a fix, rebuild before debugging it.

**Evidence.** A full rebuild and rerun cleared sixteen of twenty-four findings in one step; the remaining eight were a different, real cause found by rendering the failing page.
