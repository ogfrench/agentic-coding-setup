# Risk-gated adversarial review

Use this protocol when change risk makes an independent challenge valuable:
architecture or contract changes across multiple systems, trust boundaries,
security or privacy, destructive migration, hard-to-undo product choices,
contradictory requirements, broad blast radius, or costly ambiguity. Even a
one-line authorization change can deserve escalation.

## Choose the smallest useful mode

| Mode | Trigger | Review |
| --- | --- | --- |
| Routine | Clear, bounded fix | Executive's FPE and native verification |
| Focused | Material uncertainty, one sensitive boundary | Executive plus one independent critic if available |
| Escalated | Multiple interacting risks or high-consequence decision | Executive plus 2-3 independent read-only critics; judge only as needed |

This guidance is not an agent runtime. If independent reviewers are unavailable,
use explicit self-review and name it honestly. A plugin does not create model,
filesystem, deployment or background capabilities.

## Approval floor

Classify the highest-risk changed behavior, not just the size of the diff.
Routine changes follow existing checks and merge authorization. Material product
changes need focused independent review; trust boundaries, destructive operations,
migration, credentials, permissions, CI/release controls and installer/sync
ownership need explicit human authorization and independent review before merge.
For these sensitive paths, an AI risk classifier cannot lower the review floor.
A reviewer cannot approve their own implementation; if independence is missing,
record it as blocked rather than claim a second review. GitHub rules and required
checks remain the enforcement layer; neither a model verdict nor a PR checkbox
satisfies human authorization. Do not introduce a new mandatory check or change
review counts without repository-owner approval.

## Protocol

1. **Frame.** Executive records outcome, requirements, actual code/behavior,
   assumptions, constraints, source revision, acceptance and authorized scope.
   Identify what evidence would disprove the favored approach.
2. **Pre-commitment review where warranted.** Ask critics with independent
   scopes (e.g., architecture/root cause, security/correctness, user/product
   effects) to read the *original* requirements and source. Do not prime them
   with the executive's rationale or other reviewers' reports.
3. **Falsifiable feedback.** Require claim, source/line or reproduction,
   observed versus inferred status, severity, impact, counterevidence that
   would disprove it and the smallest corrective action. Keep reviews
   read-only. No parallel shared-state writes.
4. **Synthesis only if needed.** Judge merges duplicates and prioritizes
   investigation, but preserves credible minority findings and disagreements.
   A majority vote never invalidates a reproducible defect.
5. **Executive reconciliation.** Mark findings accepted, rejected, deferred
   or unresolved with evidence and reason in the *existing* PR tracker or
   decision record. Reframe when the original premise fails; do not
   automatically implement every speculative suggestion.
6. **Final verification.** Prove behavior, regressions and negative paths
   at the final exact revision. Request independent pre-merge review at the
   applicable risk level. Keep unaccepted severe risks visible and blocking
   unless the authorized decision-maker expressly accepts them and required
   gates allow proceeding.

## Stopping conditions and evaluation

Use no more than two repeated review-revise rounds for the same unresolved
claim before changing strategy: inspect evidence, narrow scope, reframe or
escalate to an authorized decision-maker. This is not permission to silently
close blockers. One executive, one PR tracker, no duplicate boards. Deduplicate by affected invariant and reproduction, not comment wording; preserve distinct defects. Re-review the changed paths and affected callers after a fix, and repeat full review if the change expands risk or scope. A new head invalidates earlier approval and proof until reconciled with the new revision.

Compare against an executive-only baseline using representative tasks:
outcome correctness, important bugs caught, false positives, latency,
tool/model cost and authorized release outcomes. Separate static fixtures
from real model tests, and remove the added machinery if it doesn't help.
