---
name: release-handover
description: Prepare and assess a technical release, a pull-request merge sequence, CI gates, risk acceptance, rollback and second-agent handover. Use for release readiness and operational delivery.
---

# Release and handover

Use the current repositories and live PRs. Record exact commit IDs, relevant PRs, base and head, version alignment, migrations, environmental dependencies, approved decisions, CI runs and the evidence available at the time of review.

Keep separate: implemented, checked locally, CI green, tested on a real host, released, and production-verified. A passing static suite does not establish host compatibility; a draft plugin ZIP is not an installed integration. If something is unknown, state the missing evidence and the next verifiable action.

Resolve overlapping PR ownership and release order before merging. Surface dependency and security gates, approval requirements, secrets and access boundaries, rollback strategy, migrations/backups and whether closing an issue would be truthful. Preserve uncommitted work and avoid modifying unrelated branches or dependency PRs.

Write the handover so a second independent agent can continue without guessing. Prioritize exact commands and links, before/after changes, residual risks, decision consequences, test matrix, release sequence, rollback and explicit stop conditions. Never mark a check passed or a release complete without proof.
