---
name: product-passport
description: >-
  Map product features to code owners and verify real behavior. Use for Product Passport, feature maps, cross-layer regressions and release proof.
---

# Product Passport

Make a product understandable to an agent and its behavior independently checkable. **Executable source code is the source of truth.** Tests exercise its behavior; runtime artifacts provide proof. Feature maps and docs are navigational indexes, never independent specifications. If docs and code disagree, investigate whether the code is defective or the index is stale before changing either. Do not equate successful compilation, a screenshot, an HTTP 200, or a self-authored checklist with verified behavior.

## Work with the product's existing architecture

1. Inspect the executable source, tests, build configuration, and actual feature entry points first. Consult repository instructions and feature maps to navigate, but verify every material claim against code and observed behavior. Identify state owners, transport, persistence, runtime processes, and dependencies. Reuse existing product CLI, browser, integration, and artifact tools. Do not introduce a universal runtime or rearrange a codebase into another application's architecture.
2. Identify which user-observable behaviors could change from the implementation and tests. Check affected feature entries under `docs/product-passport/features/` only as pointers; correct stale entries after validating code, or add an entry only when it helps future navigation. Use the [feature contract](references/feature-contract.md). Never change implementation to satisfy a stale document.
3. Choose a proof path proportionate to risk: focused static checks for localized changes, actual task journeys for behavioral changes, and independent/security/host acceptance for high-risk or release-critical changes. See the [verification contract](references/verification-contract.md). Follow stricter product-owned rules.
4. Change the owning layer through the established paved path. Avoid parallel workarounds, duplicated state, illegal cross-process imports, and unrelated refactors. Do not use code comments to justify temporary exceptions or bad boundaries. Preserve licensing notices, external directives, and unavoidable technical annotations.
5. Exercise the real product in an isolated environment with meaningful assertions and negative paths. Inspect outputs, screenshots, transitions, file structure, persisted state, or source evidence as the feature requires. Link each result to an exact source revision and runtime. Distinguish passed, failed, blocked, and not run.
6. Reproduce and correct failures, rerun the affected checks, and record remaining risks. A separate reviewer or independently constructed test is appropriate when the same agent both implemented and verified a high-risk change. Do not manufacture proof or silently convert a waiver into a pass.
7. Update executable regressions and enforcement first when behavior changes; refresh affected feature-map pointers only after checking the code. Use [maintenance](references/maintenance.md) to turn repeated mistakes into a root-cause fix or an enforceable invariant before adding more prose.

## Boundaries with other skills

- Use `visual-loop` for actual rendered UI/slide inspection and option comparisons. Product Passport selects the feature journey and records proof; it does not replace visual judgment.
- Use `plugin-experience-design` for installation, host compatibility, and downloadable plugin acceptance.
- Use `learning-loop` for reusable lessons, and `best-practices` for existing engineering rules. Keep private project evidence out of this public skill and its examples.
- Use independent adversarial review where consequential. Existing product release gates, human authorization, and deployed-revision checks remain authoritative.
- Ordinary copy edits, purely local functions, and generic research do not need a new passport or full end-to-end run.

## Result

Report the affected features, ownership path, exact commands or user actions run, revision/environment, verifiable artifacts, failures, limitations, and next gate. Never write "verified" without task-level evidence. Do not claim an unavailable host was exercised.
