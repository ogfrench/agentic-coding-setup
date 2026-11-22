# Agent workflow evaluations

These are end-to-end plugin evaluation cases, not static unit tests. They check
skill routing and output quality with and without this plugin. The scores are
not proof of downstream performance and should never be invented.

From `plugins/agent-workflow` on an authorized Claude Code machine:

```sh
claude plugin eval . --case 'fold-specialists' --runs 1 --no-publish --max-cost-usd 5
claude plugin eval . --runs 3 --no-publish --max-cost-usd 30
```

For Architecture Gardener routing, start with `claude plugin eval . --case 'architecture-gardener-root-cause' --runs 1 --no-publish --max-cost-usd 5`, then run the negative and ambiguous cases. Compare against the skill-disabled baseline before claiming improvement.

For Test Strategy and Security Review, run their positive, ambiguous and negative
cases and compare to a skill-disabled baseline. Static fixture validation cannot
prove that the model routes or performs better.

For Delivery Loop, run `claude plugin eval . --case 'delivery-loop-positive' --runs 1 --no-publish --max-cost-usd 5`, plus negative and ambiguous cases. Compare actual outcomes against a skill-disabled baseline before claiming behavior improvement.

The first is a cheap smoke test. Repeat the full suite only when the account
can cover model use and the plugin directory is trusted. Check grader output,
skipped runs, task-level regressions and with-minus-without deltas. Invocation
graders are diagnostic in two-arm runs, not evidence that output improved.
Reports under `evals/results/` stay local and must not enter this public repo.

Documentation: https://code.claude.com/docs/en/plugin-evals

For conflict-aware coordination, run `agent-coordination-semantic-conflict` and evaluate
whether the model protects shared contracts without defaulting to an orchestration service.
For shared-state correctness, compare `multi-user-correctness-positive`,
`multi-user-correctness-ambiguous`, and `multi-user-correctness-negative` against
skill-disabled baselines. Static validation alone is not a behavioral evaluation.

The `multi-user-correctness-intentional-copies` case tests whether the model separates
transport retries from deliberately repeated actions and respects product rules that
allow duplicate display titles. Do not turn a UX naming race into an invented
uniqueness constraint or global deduplication rule.

For feedback-driven skill changes, run `learning-feedback-positive`,
`learning-feedback-negative` and `learning-feedback-ambiguous` against the
unchanged skill and the proposed version using representative real-work cases.
Record observed correctness, false positives, critical misses, latency and cost;
the fixtures and static checks are only a starting point, not a measured gain.
Do not upload private review comments or inferred reviewer identities.
