# Product Passport | agentic-coding-setup

This repository is the source and distribution layer for a Claude Code development setup. It is not a universal orchestrator or a hosted service. Product maps are navigation aids; implementation and observed behavior take precedence.

**Map evidence:** source paths `setup-user.sh`, `sync-to-repos.sh`, `lib/apply.mjs`, `scripts/check-sync.mjs` were inspected on 2026-11-09. Referenced plugin and knowledge paths were located from the source README and manifests. No commands or real AI-host journeys were run as part of creating this map.

## Product surfaces and journeys

| User journey | Entry point and owning implementation | Intended outcome | Verification route |
| --- | --- | --- | --- |
| Install personal skills, agents and pinned plugins | `setup-user.sh`, `user/plugins.txt`, `.claude-plugin/marketplace.json` | User-scope install on a laptop or cloud environment | Isolated install and plugin list; **not run for this map** |
| Sync shared capabilities into a project | `sync-to-repos.sh`, `lib/apply.mjs`, `project/settings.json` | Reviewable downstream PR with managed skills, settings and filtered knowledge | `DRY_RUN=1 bash sync-to-repos.sh` against a disposable project; **not run for this map** |
| Inspect copy drift | `scripts/check-sync.mjs`, `lib/sync-status.mjs` | Detect out-of-date or modified managed copies | `node scripts/check-sync.mjs <project-dir> --json`; **not run for this map** |
| Capture and promote practices | `learnings/`, `kb/practices/`, `scripts/build-kb.mjs`, `plugins/agent-workflow/skills/learning-loop/` | Move evidence into on-demand reusable guidance | `node --test`; **not run for this map** |
| Map features and verify products | `plugins/agent-workflow/skills/product-passport/` | Source-grounded feature ownership, journeys, verification and map upkeep | Test a substantive task in a real target repository; **not run** |
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
