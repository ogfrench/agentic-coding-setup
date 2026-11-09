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

## Not yet verified

- [ ] Run `node scripts/check-public.mjs` and `node --test` against the exact branch checkout.
- [ ] Run `node scripts/build-kb.mjs --check` to confirm all generated assets match canonical source.
- [ ] Run `claude plugin validate . --strict` and any product-relevant plugin validation.
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

Shared foundation authored in a dedicated branch. Runtime and full CI acceptance are still pending. No downstream implementation is complete and no merge or release is authorized by this document.
