# Product Passport implementation scratchpad

Updated: 2026-11-09. This is a progress log, not a release or verification claim.

## Scope and boundaries

Build a shared on-demand skill and evidence contract first. Reuse existing runtime, UI, and test tools in each downstream project. Product-specific maps and any private evidence belong only to their owning repositories. No production actions, automatic releases, or default destructive tests. Do not merge until review and acceptance.

## Done on this branch

- [x] Read the existing shared-skill architecture, learning/visual-loop guidance, tool registry, generator, and evaluation patterns.
- [x] Create the standalone `product-passport` skill within the existing agent-workflow plugin.
- [x] Add reference contracts for feature maps, verification evidence, and architecture gardening.
- [x] Add a registered skill node under `kb/tools/` and generate the knowledge index, graph and routing documentation from source nodes.
- [x] Update agent-workflow plugin metadata to include Product Passport (version 1.10.0).
- [x] Add positive, negative, and ambiguous evaluation prompts and quality graders.
- [x] Align the skill-used invocation grader with the repository's existing regex format.

## Verification evidence

- [x] GitHub Actions check succeeded on skill-description fix head `fea9135f3955fd58a0f6bb186f9408c3260ad70a` ([run 42588081914](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42588081914)). The first run failed due to the existing 1,100-token always-on description budget; shortened overlapping descriptions instead of raising the budget.
- [x] PR [#51](https://github.com/ogfrench/agentic-coding-setup/pull/51) merged at `82045459f3425fd4fc7e7e6244bd9afc46352414`, introducing Product Passport in agent-workflow v1.10.0; the final patch source version is 1.10.1.

## Verification and outstanding work

- [x] `node --test` completed in exact-head GitHub CI (run 42588081914), including public-content test and generated-index parity.
- [x] Generated indexes matched canonical nodes in the repository's `node --test` registry parity test; direct `node scripts/build-kb.mjs --check` was not separately invoked.
- [x] Repository CI check passed, including plugin validation configured in the existing CI workflow. Host-specific runtime remains untested.
- [ ] Execute actual model routing evaluations, including comparison without the skill.
- [x] A source-first PR head passed GitHub CI at `0cae0d5642acbdfe6bb910e6dcedb258e69af06b` ([run 42589390976](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42589390976)).
- [ ] Reconfirm CI after the latest README change and this scratchpad update.
- [ ] Complete independent security/adversarial review.

## Next steps

1. Reconfirm CI at the final head and run positive/negative/ambiguous model routing evaluations, including a baseline without the skill.
2. Review skill overlap with portable workflow PR #47 and rename/sync PR #48. Do not overwrite those changes.
3. Inspect product-owned pilot PRs in their respective repositories, including actual executable evidence and limitations. Keep private repository identifiers and cross-repository links out of this public project.
4. Decide whether the pilot improves behavior before expanding feature mapping; do not build a universal CLI without demonstrated need.

## Coordination

- The shared setup's portable workflow plugin is a separate change. Its implementation-proof and adversarial-review skills own visual inspection and independent challenge; Product Passport only selects affected feature journeys and evidence.
- Reconcile with other open PRs before merging; do not overwrite them.
- Downstream sync is explicit and reviewable; no automatic installation is implied.
- Never cite a report or schema validation as proof that a real host executed a task.

## Current status

Shared foundation merged to `main` through PR #51. Source release patch v1.10.1 follows. Independent source review and repository CI passed before merge; authenticated model routing comparisons and product-specific pilot acceptance remain open. No automatic downstream sync is authorized.
