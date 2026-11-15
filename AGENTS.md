# Agent entrypoint

Read [the product passport](docs/product-passport/README.md) to navigate; confirm its assertions against actual source and tests. The map is not the implementation or proof.

For substantive work, follow [the DUNE paved path](docs/dune.md): identify capability and owner, inspect code and dependencies, implement the smallest correct change, test actual user behavior plus negative cases, and reconcile affected map entries with exact revision evidence in the same PR. Cosmetic or internal changes may say "map unchanged" with a reason.

**Radically code first:** no explanatory comments by default; remove stale/redundant comments in code you touch. Preserve required licenses, tool directives and rare explanations of non-obvious external constraints. Fix code and tests before writing about them. Keep internal documentation to short, accurate navigation and required contracts; create user-facing documentation when requested.

Do not bypass dependency boundaries, create parallel state ownership, claim tests you did not execute, or overwrite project-owned configuration. Keep the PR description authoritative for task progress. Merge and release require their existing approvals.

This repository is public. Never commit confidential source, private project identities or data. See [CLAUDE.md](CLAUDE.md) and [CONTRIBUTING.md](CONTRIBUTING.md).
