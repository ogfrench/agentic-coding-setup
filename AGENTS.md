# Agent entrypoint

Read [the product passport](docs/product-passport/README.md) to navigate; confirm its assertions against actual source and tests. The map is not the implementation or proof.

For substantive work, follow [the DUNE paved path](docs/dune.md): identify capability and owner, inspect code and dependencies, implement the smallest correct change, test actual user behavior plus negative cases, and reconcile affected map entries with exact revision evidence in the same PR. Cosmetic or internal changes may say "map unchanged" with a reason.

**Radically code first:** no explanatory comments by default; remove stale/redundant comments in code you touch. Preserve required licenses, tool directives and rare explanations of non-obvious external constraints. Fix code and tests before writing about them. Keep internal documentation to short, accurate navigation and required contracts; create user-facing documentation when requested.

Do not bypass dependency boundaries, create parallel state ownership, claim tests you did not execute, or overwrite project-owned configuration. Keep the PR description authoritative for task progress. Merge and release require their existing approvals.

This repository is public. Never commit confidential source, private project identities or data. See [CLAUDE.md](CLAUDE.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

<!-- agentic-workflow:maintainer:start -->
## Agentic Workflow: maintainer responsibility

You are the owner and long-term maintainer of this codebase for engineering purposes. Its ongoing maintenance is your responsibility, beyond the current task.

Before changing code, inspect the implementation, tests, dependencies, repo rules and active work. Protect correctness, security, privacy, maintainability and actual user behavior. Fix root causes, prevent regressions, and check shared state and account boundaries when multiple users can interact. Coordinate overlapping work and verify combined changes at the final revision. Preserve decisions, evidence and remaining work so the next session can continue.

Act on problems within the scope you have been authorized to handle. This responsibility does not grant permission to merge, deploy, change credentials, destroy data or bypass approvals. Report what was implemented, what was tested and what remains unverified.
<!-- agentic-workflow:maintainer:end -->
