# DUNE: code-first, agent-friendly engineering

This is an engineering method, not a new agent or an official implementation of any third-party framework.

**Code defines what exists. Requirements define the intended behavior. Tests and real execution establish what is verified. The Product Passport is a navigation index, not an alternate specification.**

## The paved path

1. **Orient:** locate the user capability in the existing product map and verify its entrypoints, real source and tests. If the map is stale, investigate instead of forcing code to follow it.
2. **Choose the owner:** identify canonical state ownership, interfaces, allowed dependencies, and nearby established patterns. Avoid parallel APIs, duplicated state, and unexplained new abstractions.
3. **Implement:** change the smallest appropriate source path, respecting existing stack and user requirements. Add a regression that catches the changed or previously broken behavior.
4. **Constrain:** use types, schemas, dependency checks, generated-code parity and focused tests to make known mistakes difficult. Prefer mechanical enforcement to prose, but only enforce a rule after testing an actual failure and a legitimate counterexample.
5. **Verify:** run the product's real journey and meaningful negative cases. Record source revision, environment, assertions and outcomes (passed, failed, blocked, not_run). Compilation alone is not end-user proof.
6. **Reconcile:** update affected map entries *after* checking source and behavior. A purely cosmetic or unrelated edit needs an explicit "map unchanged" reason, not artificial document churn.
7. **Ship:** use one authoritative PR checklist, review exact-head CI, and preserve existing merge, release, rollback and deployment permissions. Record deployed/released state separately.

Do not create a mandatory agent swarm, global React or Python bans, a new DUNE skill, or a custom runtime to replace each product's native tools. Ownership boundaries are project- and stack-specific.

## Optional product navigation validator

A product may adopt `docs/product-passport/index.json` with `schemaVersion: 1` and capability records with `id`, `summary`, `map`, `source` paths and `tests` paths. Run the dependency-free `scripts/check-product-passport.mjs` in an opted-in repository. Use `--base <sha>` for advisory changed-path impact reporting and `--evidence .dune/evidence.json` for machine-readable output. Evidence output is restricted to `.dune/` to prevent accidental overwriting of source files.

The validator checks source/test paths, duplicate IDs, invalid paths and symlink escapes. **It never declares behavior or host acceptance passed.** Impact coverage is advisory; a changed file may legitimately affect multiple capabilities or be unrelated. This tool supplements, not replaces, the repo's own tests. Never invent a test path to satisfy the index.

## Scope and scaling

At 5 contributors, a simple map and PR verification are enough. At 50, add ownership and boundary tests. At 500 or 5,000, federate product-owned maps, interface contracts and discovery instead of creating one giant manually maintained passport. Public generic instructions must not contain a private project's name, source or evidence.

## Evaluation and pruning

Keep the existing Product Passport, Delivery Loop, Architecture Gardener, Session Continuity and Learning Loop as separate owners. The plugin eval suite validates static fixtures; model routing and actual task quality need authenticated with/without comparisons before removing skills. Promote lessons into structural checks only when evidence justifies the recurring cost.

**Release boundary:** a code merge is not a plugin installation, accepted host behavior or published release. Source releases remain manually authorized.
