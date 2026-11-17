---
date: 2026-11-16
source: a private project
tags: [ci, release, build]
status: practice
promoted_to:
  - plugins/agent-workflow/skills/best-practices/git-and-ci.md
---

# Pin a bundle's digest from a clean install on the Node CI uses

**What happened.** A release candidate pins the sha256 of its downloadable bundles, and CI refused the pin twice in one day. The first pins were made on a newer Node than CI builds on. The second set were made on the right Node, but from a long-lived worktree whose installed packages were an older patch than the lockfile, and the plugin bundle includes those packages.

**Why.** Two things change the bytes without touching a source file: the zlib that ships with the Node that builds the ZIP, and the installed dependency tree when the bundle contains it. A worktree drifts from its lockfile silently; a clean install cannot.

**Do instead.** Pin only from a fresh checkout of the exact commit, after a clean `npm ci`, on the Node the repository names (`.nvmrc`). Make the pin command refuse any other Node and any installed tree that differs from the lockfile. A second build in the same clean tree proves the pin, and CI's own guard is the final proof.

**Evidence.** A clean checkout of the same commit rebuilt locally in one build and reproduced CI's refusal, naming the same three bundles; the diff of the two plugin ZIPs was one embedded archive, differing by the older package patch. Two independent clean builds then agreed on every digest, and CI accepted them.
