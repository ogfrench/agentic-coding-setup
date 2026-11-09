# Checklist-driven repository work

For every coding or repository change, write and follow a short checklist of intended
outcomes and how each will be verified. When a pull request exists, its description
is the authoritative live checklist and handover. Before a PR exists, use a durable
issue or plan; migrate its current state into the PR rather than maintaining two
conflicting lists.

At each meaningful checkpoint, reconcile the checklist with current source,
tests, PR head and review comments. Update checked items only on evidence; leave
failed, blocked and unrun work unchecked. Reopen checks when later changes make
their evidence stale. A CI pass, code review, host test and production release
are different states.

Before stopping, review the PR and record exact revision, evidence, pending work,
risks, decisions, owner and next action. Do not claim an unrun check passed or
merge/deploy beyond authorization. For detailed procedure use the existing
`session-continuity` skill, not a new orchestration agent.
