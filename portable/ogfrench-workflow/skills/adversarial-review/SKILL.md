---
name: adversarial-review
description: Critically review a technical design, pull request, product decision or security posture using code and operational evidence. Use for pre-merge, architecture and high-stakes reviews.
---

# Adversarial review grounded in evidence

Begin with the decision or claim being tested. Read the actual code, diff, tests, operational configuration and documentation when accessible. Reproduce or inspect behavior when practical. Separate observed facts, reasoned inferences and unknowns.

Look for the real failure modes: trust boundaries, authorization versus authentication, data exposure, destructive operations, concurrency, rollback, environment drift, dependency provenance, platform assumptions, cost and maintainability. Consider incentives and operational constraints when relevant. Do not invent vulnerabilities, benchmark numbers or a successful test run.

Prioritize findings by severity, likelihood and impact. Give an exact file, line, reproduction or source link where possible; explain how the failure happens and what would disprove the finding. Avoid a long list of stylistic nits when one root cause dominates.

Recommend a decision with trade-offs: fix before release, accept with explicit residual risk, or defer. Proposed mitigation is not verified remediation. If asked to implement, keep scope surgical, test the affected paths and report what was actually run.
