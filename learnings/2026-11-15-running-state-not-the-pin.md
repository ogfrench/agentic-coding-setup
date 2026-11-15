---
date: 2026-11-15
source: a private project
tags: [deploy, verification]
status: raw
promoted_to: []
---

# A repository pin is not a deployment fact: read the running container

**What happened.** A read-only facts check reported the API and worker images but not the search container. After it was added, the check showed the search service running v1.54.3 while the repository pinned v1.55.1. Until then, release notes could have implied the pinned version was live.

**Why.** The pin comes from the repository and the running state comes from the server. Nothing compared the two, so the mismatch stayed invisible.

**Do instead.** The facts check reports the running image ID and the version the binary reports, for every service a release depends on. A mismatch blocks the release or is stated plainly in its notes.

**Evidence.** The facts run after the change, which printed both the image reference and the binary version.
