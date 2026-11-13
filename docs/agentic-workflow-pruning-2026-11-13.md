# Pruning review: Agentic Workflow 2026-11-13

This is a source and static-evaluation audit, **not** an authenticated model-performance benchmark.

## Safe cleanup in this PR

- Remove accidentally committed Python bytecode, ignore recurring `__pycache__` and `*.pyc` files, and prevent them from entering a public pull request again.
- Repair inaccurate release and skill-count text. Do not rewrite historical immutable release notes.
- Centralize the DUNE contract in `docs/dune.md`. Keep individual skills concise and responsible only for their specialist procedures.
- Do not introduce a separate DUNE agent, skill, router, MCP runtime or per-repo documentation copy.

## Skill boundaries retained

- Product Passport: feature navigation, source-to-user-journey mapping and evidence reconciliation.
- Architecture Gardener: ownership/dependency drift, constraints, root-cause structural repairs.
- Delivery Loop: execute bounded implementation and verify it.
- Session Continuity: durable plan, PR checklist, exact-head evidence and handover.
- Learning Loop: convert verified recurring failures into tests, practices and skills.

**Candidates for future comparative evaluation, not immediate deletion:** Visual Loop versus ChatGPT Implementation Proof; Plugin Experience Design versus Setup Audit; Actions Cost versus Netlify Cost; Presentation Story versus Presentation Design versus Design System Adapter. Their topics overlap, but responsibilities and host constraints differ.

## Removal gate

Run representative positive, negative, ambiguous, missing-host and multi-skill tasks on the same host/model with and without the proposed skill. Compare correct completion, false invocations, tool permissions, verification, latency and cost. Existing fixture-validation tests **do not run a model**. Record actual evidence, then remove only if simplifying does not regress important tasks.

The deprecated Lite edition remains separate for existing installations. Do not silently uninstall it or merge its versioning with full Agentic Workflow.
