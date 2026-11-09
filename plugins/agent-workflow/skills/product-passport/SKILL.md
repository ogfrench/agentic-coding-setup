---
name: product-passport
description: >-
  Map and verify product behavior across feature boundaries. Use when asked for a
  Product Passport, feature map, verification loop, or evidence-backed proof of
  a cross-layer change, regression, or release-critical user journey.
---

# Product Passport

Make a product understandable to an agent and its behavior independently checkable. A feature map tells the agent what exists and where a user reaches it; the product's real tools let the agent exercise it and capture proof. Do not equate successful compilation, a screenshot, an HTTP 200, or a self-authored checklist with verified behavior.

## Work with the product's existing architecture

1. Read the repository's instructions, architecture, tests, feature map if present, and release boundaries. Find the actual feature entry points, state owners, transport, persistence, runtime processes, and dependencies. Reuse existing product CLI, browser, integration, and artifact tools. Do not introduce a universal runtime or rearrange a codebase into another application's architecture.
2. Identify which user-observable behaviors could change. Read the affected feature entries under `docs/product-passport/features/` when they exist; otherwise create only the entries needed for the current work. Use the [feature contract](references/feature-contract.md). The source remains authoritative; the map is a maintained navigation and verification guide, not a second implementation.
3. Choose a proof path proportionate to risk: focused static checks for localized changes, actual task journeys for behavioral changes, and independent/security/host acceptance for high-risk or release-critical changes. See the [verification contract](references/verification-contract.md). Follow stricter product-owned rules.
4. Change the owning layer through the established paved path. Avoid parallel workarounds, duplicated state, illegal cross-process imports, and unrelated refactors. Do not use code comments to justify temporary exceptions or bad boundaries. Preserve licensing notices, external directives, and unavoidable technical annotations.
5. Exercise the real product in an isolated environment with meaningful assertions and negative paths. Inspect outputs, screenshots, transitions, file structure, persisted state, or source evidence as the feature requires. Link each result to an exact source revision and runtime. Distinguish passed, failed, blocked, and not run.
6. Reproduce and correct failures, rerun the affected checks, and record remaining risks. A separate reviewer or independently constructed test is appropriate when the same agent both implemented and verified a high-risk change. Do not manufacture proof or silently convert a waiver into a pass.
7. Update feature entries and existing regressions when behavior changes. Use [maintenance](references/maintenance.md) to turn repeated mistakes into a root-cause fix or an enforceable invariant before adding more prose.

## Boundaries with other skills

- Use `visual-loop` for actual rendered UI/slide inspection and option comparisons. Product Passport selects the feature journey and records proof; it does not replace visual judgment.
- Use `plugin-experience-design` for installation, host compatibility, and downloadable plugin acceptance.
- Use `learning-loop` for reusable lessons, and `best-practices` for existing engineering rules. Keep private project evidence out of this public skill and its examples.
- Use independent adversarial review where consequential. Existing product release gates, human authorization, and deployed-revision checks remain authoritative.
- Ordinary copy edits, purely local functions, and generic research do not need a new passport or full end-to-end run.

## Result

Report the affected features, ownership path, exact commands or user actions run, revision/environment, verifiable artifacts, failures, limitations, and next gate. Never write "verified" without task-level evidence. Do not claim an unavailable host was exercised.
