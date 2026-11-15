---
date: 2026-11-15
source: a private project
tags: [docs, process]
status: raw
promoted_to: []
---

# A hand-written product map goes stale within a day and costs more than it returns

**What happened.** Product maps were added to several repositories in one day. Verification then found a commit reference that did not match the PR head, a version count that did not match the code, and claims that needed correcting. The maps added roughly 200 lines of prose, and no comparison run measured whether they helped.

**Why.** Prose restates the code, so every code change is also a documentation change, and nothing checks it. Status claims age faster than paths.

**Do instead.** Keep one short map per repository: the owners of each journey, the commands that prove them, and no status. Delete scratchpads. Check the map's paths in CI, or do not keep the map.

**Evidence.** The stale references found while verifying the maps, and the diffs that removed them.
