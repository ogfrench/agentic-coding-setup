# Portable workflow plugin: technical handover

**Date:** 2026-11-09  
**Repository:** [agentic-coding-setup](https://github.com/ogfrench/agentic-coding-setup)  
**Active work:** [draft PR #47](https://github.com/ogfrench/agentic-coding-setup/pull/47), `feat/cross-platform-workflow-plugin-2026-11-09`  
**Package version:** `ogfrench-workflow` 0.1.1  
**Release decision:** **HOLD**, not merged or publicly published.

This document is for the next independent engineering agent. For changing done/pending status over time use the [working scratchpad](WORK-IN-PROGRESS.md); for exact acceptance data use the [release acceptance record](portable-workflow-acceptance.md). Do not use this handover as evidence that any unrun host evaluation passed.

## Architectural decisions

The existing repository remains the source of truth. Claude-specific setup and its existing plugins (`agent-workflow`, `presentation-craft`, `frog-writing`) are *not* replaced. `portable/ogfrench-workflow/` is an **opt-in companion** containing four cross-host skills:

| Skill | Purpose |
| --- | --- |
| `setup-audit` | Check what a particular AI host can actually load and execute |
| `adversarial-review` | Critically review implementation/release risks using evidence |
| `implementation-proof` | Demand rendered evidence from real code rather than fabricated UI proof |
| `release-handover` | Produce a reproducible status, release gate and rollback handover |

The portable `plugin.json` declares identity, version and optional OpenAI display metadata. Its `.claude-plugin/plugin.json` declares the same identity for Claude Code. The Claude marketplace exposes this optional package; the local OpenAI marketplace under `.agents/plugins/marketplace.json` exposes the same directory to supported desktop/Codex clients. Neither marketplace silently installs it.

No MCP server, runtime hook, credential, local filesystem permission, agent launcher, third-party dependency, or downstream synchronization is part of this companion. Tool access is supplied independently by the active host.

## Existing repository dependencies

- [PR #46](https://github.com/ogfrench/agentic-coding-setup/pull/46), security hardening: merged to `main`.
- [PR #49](https://github.com/ogfrench/agentic-coding-setup/pull/49), repository rename and canonical setup/sync sources: merged to `main`.
- [PR #50](https://github.com/ogfrench/agentic-coding-setup/pull/50), disable shared marketplace automatic updates and migrate matching legacy project settings: merged to `main`.
- [PR #48](https://github.com/ogfrench/agentic-coding-setup/pull/48): duplicate rename work, closed without merge.
- [PR #47](https://github.com/ogfrench/agentic-coding-setup/pull/47): this feature, draft.
- Unrelated open PRs, including dependency updates and new workflows, must be reviewed independently. Do not merge or sync them as part of this release.

The established downstream manifest `.claude/claude-code-setup.json` and branch `chore/claude-code-setup` stay unchanged to preserve provenance and avoid duplicate downstream PRs.

## What was actually verified

- Source/manifest parity: both portable and Claude Code manifest versions are 0.1.1. A private ChatGPT package was accepted, and its released root manifest plus four skills were independently compared with the PR source.
- Automated tests: Node tests, public-repository content check, root/local/portable Claude plugin validation, and `lib/apply.mjs` dry-run. [CI run #158](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42590675662) succeeded on commit `8534f88e2572201be2a737ce0206a988b6755b88`. Later heads must be checked separately.
- Isolated Linux CLI smoke: the marketplace is registered, the plugin installs, is listed, and can be uninstalled under a temporary Claude configuration. This confirms package mechanics, **not model skill execution**.
- Five outcome/routing eval definitions exist under `portable/ogfrench-workflow/evals/`. Their static structure is tested; no authenticated two-arm behavioral results have been recorded.
- A source-grounded [adversarial review](portable-workflow-adversarial-review-2026-11-09.md) assessed the narrow packaging and skill-instruction trust boundaries.

## What remains unverified

- Authenticated Claude task invocation and four positive/one negative evaluations compared with no plugin.
- ChatGPT task outcomes, missing-tool behavior and false activations compared with no plugin.
- Windows/macOS host install, task execution, update and removal, unless the final support claim is explicitly narrowed.
- Real-host effective update settings and project/managed policy precedence.
- Any downstream synchronization. This work has made **no** downstream rollout.
- Final packaging/release approval, public distribution, and post-release rollback on actual hosts.

These are open gates, not failures. A green CI job cannot discharge them. Record **BLOCKED** when access is unavailable instead of inferring a pass.

## Where to change the implementation

| Source | Purpose |
| --- | --- |
| `portable/ogfrench-workflow/skills/*/SKILL.md` | Portable skill behavior and routing |
| `portable/ogfrench-workflow/plugin.json` | Root Agent Plugins identity and metadata |
| `portable/ogfrench-workflow/.claude-plugin/plugin.json` | Native Claude Code identity and version |
| `.claude-plugin/marketplace.json` | Optional Claude marketplace entry |
| `.agents/plugins/marketplace.json` | Local OpenAI/Codex marketplace entry |
| `test/portable-workflow-plugin.test.mjs` | Static package, safety and eval-fixture tests |
| `.github/workflows/check.yml` | Strict validation, isolated install/uninstall, existing repo CI |
| `portable/ogfrench-workflow/evals/` | Four positive tasks and one negative routing case |
| `portable/ogfrench-workflow/README.md` | User-facing install, update, uninstall and limitations |
| `docs/portable-workflow-plugin.md` | Technical host and release contract |

The local marketplace installs a **cached plugin copy**, not a live view of a repository folder. Refresh/reinstall locally and test in a new session after source changes. The separate private uploaded ChatGPT release must be updated through Plugin Creator and compared against a reviewed Git commit. Do not conflate these update paths.

## Resume steps

1. Fetch the **current** PR head and `main` before modifying anything. Read [scratchpad](WORK-IN-PROGRESS.md), [host contract](portable-workflow-plugin.md) and [acceptance gates](portable-workflow-acceptance.md). Do not rely solely on the historical SHAs listed above.
2. Check the exact diff against `main`, verify that existing sync security and reviewed-update policy survive, and review any concurrent branch changes.
3. Confirm `node --test` and GitHub Actions are green on the current exact head.
4. On an authorized Claude Code host, install using the [plugin README](../portable/ogfrench-workflow/README.md), run the positive and negative evals, capture with/without results and uninstall. Preserve real logs privately.
5. Run equivalent ChatGPT private-plugin routing and quality tests in new conversations, including cases where GitHub/files/browser are unavailable.
6. Run or explicitly waive Windows/macOS tests, without claiming cross-OS compatibility unsupported by evidence.
7. Fill a copy of the [acceptance record](portable-workflow-acceptance.md) with actual outcomes, residual risks, decision and evidence. Update PR #47 and the working scratchpad. Release only if gates pass or a support limitation is explicitly accepted.

## Rollback and release safety

Uninstall or disable the **optional companion** using the corresponding host surface. Do not modify unrelated Claude plugins, credentials, MCP config, `.claude/claude-code-setup.json`, or downstream sync branches. A rollback of this companion does not roll back repository rename/security changes on `main`.

**No merges, public publish, unattended sync, or user-machine installation were authorized merely by preparing these docs.**
