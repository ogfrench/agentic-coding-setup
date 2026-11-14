# Product Passport | agentic-coding-setup

This repository is the source and distribution layer for a Claude Code development setup. It is not a universal orchestrator or a hosted service. Product maps are navigation aids; implementation and observed behavior take precedence.

**Map evidence:** source paths `setup-user.sh`, `sync-to-repos.sh`, `lib/apply.mjs`, `scripts/check-sync.mjs` were inspected on 2026-11-09. Referenced plugin and knowledge paths were located from the source README and manifests. No commands or real AI-host journeys were run as part of creating this map.

The source-linked [capability index](index.json) is checked by `node scripts/check-product-passport.mjs`. This verifies path and test references only; it cannot establish actual user behavior. The [DUNE engineering contract](../dune.md) describes paved paths and evidence reconciliation without replacing source or this map.

## Product surfaces and journeys

| User journey | Entry point and owning implementation | Intended outcome | Verification route |
| --- | --- | --- | --- |
| Install personal skills, agents and pinned plugins | `setup-user.sh`, `user/plugins.txt`, `.claude-plugin/marketplace.json` | User-scope install on a laptop or cloud environment | Isolated install and plugin list; **not run for this map** |
| Sync shared capabilities into a project | `sync-to-repos.sh`, `lib/apply.mjs`, `project/settings.json` | Reviewable downstream PR with managed skills, settings and filtered knowledge | `DRY_RUN=1 bash sync-to-repos.sh` against a disposable project; **not run for this map** |
| Inspect copy drift | `scripts/check-sync.mjs`, `lib/sync-status.mjs` | Detect out-of-date or modified managed copies | `node scripts/check-sync.mjs <project-dir> --json`; **not run for this map** |
| Capture and promote practices | `learnings/`, `kb/practices/`, `scripts/build-kb.mjs`, `plugins/agent-workflow/skills/learning-loop/` | Move evidence into on-demand reusable guidance | `node --test`; **not run for this map** |
| Map features and verify products | `plugins/agent-workflow/skills/product-passport/` | Source-grounded feature ownership, journeys, verification and map upkeep | Test a substantive task in a real target repository; **not run** |
| Audit structural causes and ownership drift | `plugins/agent-workflow/skills/architecture-gardener/` | Read-only structural findings and scoped repairs | Inspect source and negative paths; no host evaluation claimed |
| Execute authorized multi-step repository work | `plugins/agent-workflow/skills/delivery-loop/` | Code-first implementation, CI recovery and final-head verification | Plugin source CI; authenticated behavior not yet verified |
| Preserve PR evidence and handovers | `plugins/agent-workflow/skills/session-continuity/`, `user/rules/pr-progress.md` | Durable checklists and context recovery | Source CI; real host routing not yet verified |
| Visual QA and other working practices | `plugins/agent-workflow/skills/` | Select specialized workflows only when task-relevant | Task-level evaluation; **not run** |
| Cross-host review companion | `portable/ogfrench-workflow/` | Optional skill-only review workflows | Per-host acceptance; see source release record |

## System and ownership map

```text
User / cloud setup -- setup-user.sh --> user skills, agents, installed marketplace plugins
Central source ----- sync-to-repos.sh --> project PR --> .claude/skills + agents + commands
                                                  \--> .claude/knowledge + settings + provenance
Source learnings --> curated kb/practices --> generated skill topics and per-stack bundles
Changed product --> Product Passport --> product-owned capability map + tests + real execution evidence
```

- **Canonical central source:** `plugins/`, `kb/practices/`, `project/`, and install/sync scripts.
- **Managed copies:** `.claude/claude-code-setup.json` in each downstream project records provenance. Sync deliberately preserves project-owned settings and skills.
- **Boundaries:** local/cloud Claude Code host grants tool access; a skill does not grant GitHub, filesystem, browser or external app permissions. The portable companion is optional and separately installed.
- **Privacy:** central repository is public. Private product names, feature maps, paths, documents and proof must stay in their owning repository.
- **Deployment:** source merges, user installation, host acceptance and downstream synchronization are separate states.

## Maintained product-map contract

When code or task journeys change, read affected implementation and tests first, then update this map in the same PR. For each downstream product, maintain `docs/product-passport/README.md` (or its established canonical equivalent) and optional `features/<stable-id>.md` entries. A repository-level Claude rule must require map impact assessment even when Product Passport is not selected. Detailed format: [feature contract](../../plugins/agent-workflow/skills/product-passport/references/feature-contract.md).

A change with no capability or ownership impact does not need artificial Markdown churn; explicitly report `map unchanged`. If a capability is only described by documentation, label it `documentation-derived, not source-verified`. Record real tests and user journeys separately with revision and environment, never infer passes from paths.

## State and next verification

- **Source navigation:** inspected the above implementation paths, without execution.
- **Task-level behavior:** not run in this map creation.
- **Host installations and downstream synchronization:** not verified in this map creation.
- **Further evidence:** [source release record](../releases/2026-11-09.md), [Product Passport scratchpad](SCRATCHPAD.md), and individual CI runs.

---

## Risk-based engineering workflows across managed repositories (reviewed 14 November 2026)

The managed skill source includes `plugins/agent-workflow/skills/test-strategy/SKILL.md`, `product-passport/SKILL.md`, `delivery-loop/SKILL.md`, `session-continuity/SKILL.md` and `actions-cost/SKILL.md`. These capabilities are complementary; avoid expanding every agent prompt into the entire library.

| Changed boundary | Minimum useful proof | Different evidence required for acceptance |
| --- | --- | --- |
| Pure logic or knowledge content | Targeted existing tests; inspect a meaningful failing case when the rule changes | Public/redistributable material review if output is published |
| Project-owned feature | Product Passport → source owner → focused negative regression | Real browser/API/DB/host journey if the change crosses those boundaries |
| Shared managed skill/rule | `node --test` and the source's native sync, path and packaging checks | Disposable downstream project sync, conflict/ownership preservation and drift evidence |
| Claude/ChatGPT portable plugin packaging | Exact manifests, versions, archive inventory and integrity checks | Install, activate and exercise in the named *real* host; publication alone is not proof |
| GitHub Actions triggers, permissions or release gates | Workflow event/branch/path matrix, required status and branch-protection review | Exact-head status plus observed release/deploy only when explicitly authorized |

### Reliable delivery contract

1. Before editing, inspect the implementation, dependencies and tests, classify the trust boundary, and choose the **cheapest reliable test that actually fails on the old defect**. Add broader tests only to catch another failure class. E2E is for cross-process behavior, auth/ownership, stateful writes, real browser or plugin host behavior, not every documentation adjustment.
2. For managed repository sync, always distinguish **central source → packaged/distributed plugin → installed local host → downstream project copy**. A green `check-product-passport.mjs` proves path references exist, not that a user journey works. In downstream repos, do not change managed `.claude/` copies by hand when the central sync owns them.
3. Keep session continuity in PR progress and the repository scratchpad. Preserve baseline/head SHA, before/after behavior, checks actually executed, negative case, remaining blockers, and final merge/release decision. Never infer acceptance from previous-head CI.
4. Optimize Actions using measured run history and existing branch protection. Preserve post-merge publish, security, backup and manual deployment workflows; avoid duplicating E2E or running full browser/host validation for cheap local edits.
5. For each changed product, reconcile its owned passport, or explicitly say `map unchanged` with a reason. Mark **implemented / tested / verified / merged / deployed / released** separately, including `passed / failed / blocked / not_run` for individual checks.

**Current audit:** inspected central skill, validator, repo/test paths, CI and release configuration; no skill host activation, downstream sync, tests, deployment or release was executed in this session. This public repo must not contain private product evidence.
