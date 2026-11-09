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
- [x] PR [#51](https://github.com/ogfrench/agentic-coding-setup/pull/51) opened as draft. Not merged.

## Not yet verified

- [x] `node --test` completed in exact-head GitHub CI (run 42588081914), including public-content test and generated-index parity.
- [x] Generated indexes matched canonical nodes in the repository's `node --test` registry parity test; direct `node scripts/build-kb.mjs --check` was not separately invoked.
- [x] Repository CI check passed, including plugin validation configured in the existing CI workflow. Host-specific runtime remains untested.
- [ ] Execute actual model routing evaluations, including comparison without the skill.
- [ ] Obtain full GitHub CI status for the final PR head and correct any failures.
- [ ] Complete independent security/adversarial review.

## Next steps

1. Review the exact branch diff for confidentiality, unnecessary duplication, and conflicts with existing skills.
2. Open a draft PR for the shared foundation. Keep it unmerged until the checks above are complete.
3. Implement the first product-owned pilot separately, exercising an actual feature with native tools and real artifacts.
4. Compare the pilot's verification effectiveness with existing behavior before copying the approach to other projects.
5. Follow with per-product PRs and avoid a universal CLI until duplicated runtime logic is demonstrated.

## Coordination

- The shared setup's portable workflow plugin is a separate change. Its implementation-proof and adversarial-review skills own visual inspection and independent challenge; Product Passport only selects affected feature journeys and evidence.
- Reconcile with other open PRs before merging; do not overwrite them.
- Downstream sync is explicit and reviewable; no automatic installation is implied.
- Never cite a report or schema validation as proof that a real host executed a task.

## Current status

Shared foundation in draft PR #51, with green exact-head repository CI at the cited revision. Live model-routing comparisons, host acceptance and independent review are outstanding. No merge or release is authorized by this document.
