---
date: 2026-11-15
source: a private project
tags: [ci, release, build]
status: practice
promoted_to: 
  - plugins/agent-workflow/skills/best-practices/git-and-ci.md
---

# When an edit invalidates a pinned digest, batch the edits and re-pin once

**What happened.** A release candidate pins the sha256 of its downloadable bundles, and the build refuses to publish when a bundled file changes. Each fix to a bundled file needed one build to produce the new digests and a second to prove them, about twelve minutes each. Re-pinning after every fix cost six full cycles in one day.

**Why.** The pin is correct to refuse a changed download, but the cost is per edit, not per release. A helper script kept in a scratch folder made each cycle easier without removing any of them.

**Do instead.** Collect every edit that touches a bundled file, then re-pin once. Commit the pin only after the second build passes, so a pushed head is always consistent. Put the re-pin in the repository as one command instead of a private script, and know which edits do not touch the bundle (a hub-only stylesheet) so they cost one build, not two.

**Evidence.** Six re-pin cycles in one day, each caused by a fix made after the previous pin; edits that were page-only needed no re-pin.
