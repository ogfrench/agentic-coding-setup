---
date: 2026-11-15
source: a private project
tags: [release, process]
status: raw
promoted_to: []
---

# Release notes read from the default branch can describe a different commit than the tagged one

**What happened.** The release workflow reads its notes from the default branch but tags the revision it is given. A notes-only merge made after the deployed revision therefore describes later commits, unless the notes name the tagged revision.

**Why.** The notes and the tag are chosen by different inputs, and nothing checks that they refer to the same code.

**Do instead.** Put the tagged revision and the commits since the previous tag in the notes. Land the notes before running the release. Confirm that no code changed between the notes commit and the tagged revision.

**Evidence.** The release script source, which reads notes from the default branch and tags the requested revision, and a notes PR that names the revision explicitly.
