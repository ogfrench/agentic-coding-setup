# Native shipping and bounded PR remediation

## Route by observed capability and authority

| Situation | Delivery path |
| --- | --- |
| Claude Code exposes /ship and its effects fit the authorization | Use the native command for a prepared change; verify PR state and exact-head evidence afterward |
| Existing PR and local /steward or auto-fix is available | Use one authorized native remediation path, not both |
| Managed PR Steward is explicitly enabled and authorized | Hand off bounded remediation to it, then remain read-only |
| Codex, ChatGPT or any host without those capabilities | Use actual connected repository tools and the ordinary Delivery Loop |
| Missing write or runtime access | Continue independent safe work and leave an exact blocked handover |

Check the actual host command inventory, permissions, branch policy, review
status and pending writers. Do not invoke slash commands via an invented API.
If a native path may merge, deploy or change settings beyond the granted scope,
do not use it until the scope is safely constrained. Never turn on auto-merge
for convenience. A PR verdict is not release acceptance.

## One writer, one tracker

Record current writer, exact head, authorized scope, budget, stop condition and
next action in the existing PR description. A comment is not a lock; confirm
exclusive ownership before writes. Managed Steward can push without asking.
Its watching label is `claude-pr-steward-watching`; when authorized, stop it
with `@claude stop` or remove the label, then verify no pending writes and
re-read the remote head before reclaiming ownership. Do not enable Steward
or start a billed run solely because this guide is installed.

## Convergence

1. Establish scope, tests, baseline head, review findings and explicit risk floor.
2. Full review once; require a concrete scenario and counterevidence for findings.
3. Repair root causes in scope, group duplicate findings, and add regressions.
4. Targeted re-review of changed paths and impacted callers; repeat full review
   on material scope or risk expansion. Reconcile all required final-head gates.
5. Default to at most two repair/review rounds on the same unresolved claim;
   also set a total iteration, time and spend budget before automatic remediation.
   Stop on budget, permission, scope expansion, repeated failure or critical risk.
   Reframe or escalate; never weaken tests or hide open findings.
6. Verify actual product behavior, release evidence and authorized approval
   independently of the shipping agent. A new head makes earlier proof stale
   until reconciled. Never report a green source check as a host test.

Use the existing risk-gated review, session continuity and release readiness
skills for their respective contracts. No new daemon or custom command is needed.

## Managed rollout (owner decision only)

Start on one eligible repository: Code Review with a spend limit, then manual
Steward with its own limit, then an approval policy in observe mode. Verify
policy matching and GitHub required checks before enforcement. Observe mode
can generate billed reviews. A policy on the default branch can activate
Approvals and change automatic review coverage; do not install or sync a live
`.claude/approvals.yml`. Keep project policies local and opt-in. CI remains
independently required; Claude approval cannot stand in for explicit human authorization.

Sources verified 2026-11-25: [Claude Ship](https://code.claude.com/docs/en/claude-ship),
[PR Steward](https://code.claude.com/docs/en/pr-steward),
[Claude Approvals](https://code.claude.com/docs/en/approvals).
