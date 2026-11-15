---
date: 2026-11-15
source: a private project
tags: [git, tooling]
status: raw
promoted_to: []
---

# A shallow single-branch clone makes tooling report that a pushed branch has no remote

**What happened.** A stop hook kept reporting "no remote branch" for branches that had already been pushed. The clone fetched only its default branch, so no remote-tracking ref existed for the feature branch.

**Why.** A single-branch clone maps only the default branch. Git cannot resolve an upstream for any other branch until its refspec is added.

**Do instead.** Add the branch's refspec with `git config --add remote.origin.fetch "+refs/heads/<branch>:refs/remotes/origin/<branch>"`, fetch, and set the upstream. Compare `git ls-remote --heads origin <branch>` with `HEAD` before pushing again.

**Evidence.** Three hook firings on different branches, each cleared by this change and none needed a new push.
