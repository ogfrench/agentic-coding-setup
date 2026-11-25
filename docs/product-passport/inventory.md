# Repository inventory | FPE Agentic Workflow

This is the source-backed inventory for [`ogfrench/fpe-agentic-workflow`](https://github.com/ogfrench/fpe-agentic-workflow). It covers **what is checked into this repository**, not what is installed in any particular Claude, ChatGPT, Codex or Copilot account. The product is the **`agentic-workflow`** plugin on its supported hosts; the FPE logo and plugin ID are not the repository name.

**Inventory basis:** tracked paths and manifests on the [repository-rename PR](https://github.com/ogfrench/fpe-agentic-workflow/pull/115), with version and count checked against actual source files. CI confirms syntax, packaging, static contracts and isolated CLI smoke tests when green, not authenticated end-user behavior.

## Editions and marketplace identities

| Surface | Source | Actual identity and contents | Installation boundary |
| --- | --- | --- | --- |
| Claude Code edition | [`plugins/agent-workflow/`](../../plugins/agent-workflow/) | `agentic-workflow` **v2026.12.5**, 24 canonical skills, one optional `cheap-reviewer` agent and the [FPE mark](../../plugins/agent-workflow/assets/fpe-mark-white-on-black.svg) | `ogfrench` Claude marketplace or reviewed ZIP; explicitly installed |
| ChatGPT edition | [`portable/agentic-workflow/`](../../portable/agentic-workflow/), [builder](../../scripts/package_agentic_workflow_chatgpt.py) | `agentic-workflow` **v2026.12.5**, 24 shared skills + 4 portable additions = **28** | Generated, deterministic skills-only ZIP; separately installed private ChatGPT plugin |
| Legacy portable Lite | [`portable/ogfrench-workflow/`](../../portable/ogfrench-workflow/) | `chatgpt-workflow-lite` **v1.12.0**, 4 review/setup skills | Legacy source and local marketplace entry; not the canonical full edition |
| Claude marketplace | [`.claude-plugin/marketplace.json`](../../.claude-plugin/marketplace.json) | `agentic-workflow` (local canonical plugin source); `21st` (pinned third-party Git subdirectory) | Marketplace declaration, not proof an account installed either plugin |
| Local marketplace | [`.agents/plugins/marketplace.json`](../../.agents/plugins/marketplace.json) | `ogfrench-local` exposes the Lite package | Local optional integration, not the primary ChatGPT plugin |

The two full editions share a source version but **do not have identical host capabilities**. The ChatGPT ZIP contains Markdown guidance, linked references, curated public practices, an icon and provenance metadata. It does **not** ship Claude-specific hooks, subagents, installer scripts, an MCP service, credentials or autonomous execution. The Claude installation and per-project sync are separate actions.

## Canonical skills (24)

These exact skill directories are distributed as canonical Claude Code skills and adapted into the full ChatGPT ZIP. Their actual `SKILL.md` and referenced files define behavior.

| Skill | Ownership and task |
| --- | --- |
| [`actions-cost`](../../plugins/agent-workflow/skills/actions-cost/SKILL.md) | Audit and reduce GitHub Actions spending without weakening checks |
| [`architecture-gardener`](../../plugins/agent-workflow/skills/architecture-gardener/SKILL.md) | Find architectural drift and root causes of recurring defects |
| [`best-practices`](../../plugins/agent-workflow/skills/best-practices/SKILL.md) | Retrieve verified engineering practices selectively |
| [`delivery-loop`](../../plugins/agent-workflow/skills/delivery-loop/SKILL.md) | Frame, propose, evaluate, implement, test and hand over authorized changes |
| [`design-system-adapter`](../../plugins/agent-workflow/skills/design-system-adapter/SKILL.md) | Apply an existing visual system to deliverables |
| [`deslopify`](../../plugins/agent-workflow/skills/deslopify/SKILL.md) | Audit and revise repetitive or unsupported AI-sounding copy |
| [`diagram-craft`](../../plugins/agent-workflow/skills/diagram-craft/SKILL.md) | Create editable, source-grounded Mermaid and other diagrams |
| [`frogify`](../../plugins/agent-workflow/skills/frogify/SKILL.md) | Rewrite copy in the explicitly requested frog editorial voice |
| [`humanizer`](../../plugins/agent-workflow/skills/humanizer/SKILL.md) | Edit text to avoid mechanical AI-writing patterns |
| [`issue-management`](../../plugins/agent-workflow/skills/issue-management/SKILL.md) | Triage and scope issues with clear ownership and acceptance |
| [`knowledge-base-builder`](../../plugins/agent-workflow/skills/knowledge-base-builder/SKILL.md) | Design or audit source-grounded retrieval and agent knowledge bases |
| [`learning-loop`](../../plugins/agent-workflow/skills/learning-loop/SKILL.md) | Capture lessons, curate practices and selectively promote guidance |
| [`model-delegation`](../../plugins/agent-workflow/skills/model-delegation/SKILL.md) | Choose when skills, tools, subagents or reviewers are worthwhile |
| [`netlify-cost`](../../plugins/agent-workflow/skills/netlify-cost/SKILL.md) | Evaluate Netlify costs against the applicable account plan |
| [`plugin-experience-design`](../../plugins/agent-workflow/skills/plugin-experience-design/SKILL.md) | Plan and verify cross-host plugin packaging and onboarding |
| [`presentation-design`](../../plugins/agent-workflow/skills/presentation-design/SKILL.md) | Produce or revise finished slides and presentation visuals |
| [`presentation-story`](../../plugins/agent-workflow/skills/presentation-story/SKILL.md) | Develop evidence-backed presentation narrative and structure |
| [`product-passport`](../../plugins/agent-workflow/skills/product-passport/SKILL.md) | Map product capabilities to implementation and real verification |
| [`release-readiness`](../../plugins/agent-workflow/skills/release-readiness/SKILL.md) | Assess final-commit release gates and remaining risk |
| [`security-review`](../../plugins/agent-workflow/skills/security-review/SKILL.md) | Review access boundaries, secrets, filesystem and untrusted inputs |
| [`session-continuity`](../../plugins/agent-workflow/skills/session-continuity/SKILL.md) | Preserve PR evidence, decisions and handover across sessions |
| [`test-strategy`](../../plugins/agent-workflow/skills/test-strategy/SKILL.md) | Select proportionate unit, integration, E2E and host checks |
| [`token-efficiency`](../../plugins/agent-workflow/skills/token-efficiency/SKILL.md) | Reduce successful-task cost and unnecessary context |
| [`visual-loop`](../../plugins/agent-workflow/skills/visual-loop/SKILL.md) | Inspect actual rendered interfaces and visual behavior |

## ChatGPT-only additions (4)

These four are bundled into the **full ChatGPT edition** from the older portable source; they are not part of the Claude plugin's 24-skill canonical directory.

| Skill | Ownership and task |
| --- | --- |
| [`adversarial-review`](../../portable/ogfrench-workflow/skills/adversarial-review/SKILL.md) | Challenge design and PR decisions using code and operational evidence |
| [`implementation-proof`](../../portable/ogfrench-workflow/skills/implementation-proof/SKILL.md) | Verify real UI implementations with builds and screenshots |
| [`release-handover`](../../portable/ogfrench-workflow/skills/release-handover/SKILL.md) | Record exact merge, CI, rollout and rollback evidence |
| [`setup-audit`](../../portable/ogfrench-workflow/skills/setup-audit/SKILL.md) | Inspect plugin, skill, hook, sync and cross-host setup drift |

## Configured Claude Code plugins (12)

These are the exact entries in [`user/plugins.txt`](../../user/plugins.txt), consumed by [`setup-user.sh`](../../setup-user.sh). **Configured to be installed** is different from **installed and verified on the user's host**. The separately published `agentic-workflow` canonical plugin is **not** an entry in this list; its skills are copied at user scope by the setup script and are available as a marketplace plugin.

| Configured plugin | Origin |
| --- | --- |
| `21st@ogfrench` | `ogfrench` marketplace (pinned external 21st.dev plugin) |
| `superpowers@claude-plugins-official` | Claude official plugin marketplace |
| `frontend-design@claude-plugins-official` | Claude official plugin marketplace |
| `code-review@claude-plugins-official` | Claude official plugin marketplace |
| `code-simplifier@claude-plugins-official` | Claude official plugin marketplace |
| `context7@claude-plugins-official` | Claude official plugin marketplace |
| `github@claude-plugins-official` | Claude official plugin marketplace |
| `playwright@claude-plugins-official` | Claude official plugin marketplace |
| `claude-md-management@claude-plugins-official` | Claude official plugin marketplace |
| `typescript-lsp@claude-plugins-official` | Claude official plugin marketplace |
| `serena@claude-plugins-official` | Claude official plugin marketplace |
| `commit-commands@claude-plugins-official` | Claude official plugin marketplace |

The [marketplace manifest](../../.claude-plugin/marketplace.json) pins the third-party `21st` plugin to its upstream Git SHA. Other official-marketplace versions and their live installation status are host-managed; this repository does not claim to pin or independently verify them.

## Other agent, instructions and configuration

| Item | Actual source | Scope and behavior |
| --- | --- | --- |
| Claude subagent (1) | [`cheap-reviewer.md`](../../plugins/agent-workflow/agents/cheap-reviewer.md) | Optional review delegation for hosts that support Claude subagents |
| Personal response modes (2) | [`caveman`](../../user/skills/caveman/SKILL.md), [`ponytail`](../../user/skills/ponytail/SKILL.md) | Personal Markdown skills installed by `setup-user.sh`; not automatic project plugins |
| Personal rule | [`user/rules/pr-progress.md`](../../user/rules/pr-progress.md) | User-scope progress guidance, guarded against overwriting unrelated rules |
| Maintainer contract | [`project/maintainer-contract.md`](../../project/maintainer-contract.md) | Bounded, managed additions to selected downstream `AGENTS.md` / `CLAUDE.md` |
| Project settings | [`project/settings.json`](../../project/settings.json) | Registers the canonical `ogfrench` marketplace and a `SessionStart` hook reading project `must.md`; no automatic third-party activation |
| Project MCP | [`project/mcp.json`](../../project/mcp.json) | `mcpServers` is **empty**, so this repo declares no project MCP server |
| Retired settings | [`project/retired.json`](../../project/retired.json) | Removes named obsolete managed `enabledPlugins` keys during sync |
| Git safety hook | [`.githooks/pre-push`](../../.githooks/pre-push) | Local public-data guard when explicitly enabled; not a GitHub App or scheduled task |
| Root guidance | [`AGENTS.md`](../../AGENTS.md), [`CLAUDE.md`](../../CLAUDE.md) | Source-project instructions; targeted downstream settings require explicit sync |

## Knowledge, evaluations and tests

The repository contains **53 curated practice cards** in [`kb/practices/`](../../kb/practices/), **40 tool-reference cards** in [`kb/tools/`](../../kb/tools/), **86 dated learning records** in [`learnings/`](../../learnings/), **60 behavioral evaluation prompts** under [`plugins/agent-workflow/evals/`](../../plugins/agent-workflow/evals/) and **23 test source files** under [`test/`](../../test/). Counts describe tracked sources, not runtime evaluation scores.

The knowledge flow is **dated learning → reviewed practice → generated KB index/bundles → on-demand skill or project context**. `kb/tools/` is an index of *documented tools, plugins and skills*, **not an installed-tools manifest**. Its 40 entries are:

`21st`, `actions-cost`, `architecture-gardener`, `best-practices`, `cheap-reviewer`, `chrome-devtools-mcp`, `claude-md-management`, `code-review`, `code-simplifier`, `commit-commands`, `context7`, `delivery-loop`, `design-system-adapter`, `deslopify`, `diagram-craft`, `frogify`, `frontend-design`, `github`, `humanizer`, `issue-management`, `knowledge-base-builder`, `learning-loop`, `model-delegation`, `netlify-cost`, `playwright`, `plugin-experience-design`, `presentation-craft`, `presentation-design`, `presentation-story`, `product-passport`, `release-readiness`, `security-review`, `serena`, `session-continuity`, `superpowers`, `test-strategy`, `token-efficiency`, `typescript-lsp`, `visual-loop`, `visual-restraint`.

Generated KB outputs are [`kb/INDEX.md`](../../kb/INDEX.md), [`kb/index.jsonl`](../../kb/index.jsonl), [`kb/graph.json`](../../kb/graph.json) and [`kb/bundles/`](../../kb/bundles/). `scripts/build-kb.mjs` owns regeneration. The ChatGPT builder packages public curated practices; downstream sync filters knowledge by each repository's declared stack. This repository does not contain or distribute private project corpora.

## Scripts and libraries

**Root entry points:** [`setup-user.sh`](../../setup-user.sh) installs user-scoped Claude capabilities; [`sync-to-repos.sh`](../../sync-to-repos.sh) opens or updates reviewable downstream sync PRs; [`scripts/check-sync.mjs`](../../scripts/check-sync.mjs) performs read-only drift checks.

Other tracked scripts (8 total):

- [`scripts/build-kb.mjs`](../../scripts/build-kb.mjs)
- [`scripts/check-added-comments.mjs`](../../scripts/check-added-comments.mjs)
- [`scripts/check-product-passport.mjs`](../../scripts/check-product-passport.mjs)
- [`scripts/check-public.mjs`](../../scripts/check-public.mjs)
- [`scripts/check-sync.mjs`](../../scripts/check-sync.mjs)
- [`scripts/kb-audit.mjs`](../../scripts/kb-audit.mjs)
- [`scripts/kb-new.mjs`](../../scripts/kb-new.mjs)
- [`scripts/package_agentic_workflow_chatgpt.py`](../../scripts/package_agentic_workflow_chatgpt.py)

Supporting implementation modules (6):

- [`lib/apply.mjs`](../../lib/apply.mjs)
- [`lib/frontmatter.mjs`](../../lib/frontmatter.mjs)
- [`lib/kb.mjs`](../../lib/kb.mjs)
- [`lib/maintain.mjs`](../../lib/maintain.mjs)
- [`lib/maintainer-contract.mjs`](../../lib/maintainer-contract.mjs)
- [`lib/sync-status.mjs`](../../lib/sync-status.mjs)

The [Product Passport index](index.json) is navigation metadata; [`scripts/check-product-passport.mjs`](../../scripts/check-product-passport.mjs) verifies referenced paths and tests exist. This is **not proof** of real host behavior.

## CI, bot and release boundaries

| GitHub workflow | Entry condition | What it actually does |
| --- | --- | --- |
| [`check.yml`](../../.github/workflows/check.yml) | Pull requests and `main` | Node/Python tests, Product Passport navigation, public-tree checks, skill packaging, Claude manifest validation, isolated install/uninstall, and local downstream dry-run |
| [`sync.yml`](../../.github/workflows/sync.yml) | Scheduled Sundays 05:00 UTC or manual dispatch on `main` | Uses GitHub App credentials to create or refresh **draft** per-repository sync PRs; scheduled runs do not merge |
| [`release.yml`](../../.github/workflows/release.yml) | Explicit manual dispatch with accepted `main` SHA and confirmation | Checks versions and hashes, packages two ZIPs and publishes a versioned GitHub release |

The sync bot is a **GitHub App** (configured as `fpe-agentic-workflow-sync`), not a separate hosted service included in this repository. [`sync.yml`](../../.github/workflows/sync.yml) uses `vars.SYNC_APP_ID`, `secrets.SYNC_APP_PRIVATE_KEY` and `secrets.SYNC_REPOS` in the `sync` environment. The visible Git author comes from the App's actual slug. Its installation permissions and environment protection settings must be verified in GitHub; the workflow file alone cannot prove them.

Source changes, passing CI, installed Claude/ChatGPT plugins, merged downstream PRs, published GitHub releases and real user acceptance are **different states**. A documentation merge does not publish packages or update installed plugins. No new plugin version or release is needed merely to publish this inventory.

## Documentation boundaries

The [root README](../../README.md) is the short product overview and installer entry; this Product Passport owns the source inventory, ownership map and user journeys. The [maintainer guide](../maintainers-guide.md) owns detailed installation/synchronization operations. The [ChatGPT host guide](../agentic-workflow-chatgpt.md) owns ChatGPT packaging and installation. The [DUNE handbook](../dune.md) owns engineering methodology. Existing dated [release notes](../releases/) describe their own historical snapshots; they are not today's feature inventory.

**Source wins:** If a file, count, version or installed capability differs from this inventory, inspect the owning code and host before modifying the documentation. These lists are checked against tracked source where tests exist, but installed-host behavior must still be verified separately.
