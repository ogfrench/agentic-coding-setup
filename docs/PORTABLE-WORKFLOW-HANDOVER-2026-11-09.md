# Handover | ogfrench Workflow cross-platform companion | 2026-11-09

## Decision and state

**Point-in-time source handover. Broad host release remains HOLD.** The repository rename and shared setup security changes are on protected `main`. The optional cross-platform companion remains in **[draft PR #47](https://github.com/ogfrench/agentic-coding-setup/pull/47)**, version **0.1.1**. Static package checks, Linux CLI installation/removal, and private ChatGPT package import have succeeded. Authenticated task-level effectiveness, desktop refresh, Windows and macOS acceptance have **not** been established.

**Status update:** PR #47 later merged as an optional source preview (`22e7ebd1b0121ad567b0bfa45d82618210e8ae2e`). See [the release inventory](releases/2026-11-09.md) for current source state. The historical host gaps below remain open. This document is not a release certificate. Recheck the exact PR head and its latest GitHub Actions run before treating any CI claim as current.

## Repository and change inventory

- Canonical source: [`ogfrench/agentic-coding-setup`](https://github.com/ogfrench/agentic-coding-setup), default `main`, public.
- Feature branch: `feat/cross-platform-workflow-plugin-2026-11-09`; associated [PR #47](https://github.com/ogfrench/agentic-coding-setup/pull/47), **draft / unmerged**.
- Plugin identity: `ogfrench-workflow` v0.1.1. The root portable manifest is `portable/ogfrench-workflow/plugin.json`. Claude Code reads `portable/ogfrench-workflow/.claude-plugin/plugin.json`. The personal ChatGPT plugin was privately imported, not published in the public directory.
- Four skills: `setup-audit`, `adversarial-review`, `implementation-proof`, `release-handover`; read their individual `SKILL.md` files under `portable/ogfrench-workflow/skills/`.
- Marketplace sources: `.claude-plugin/marketplace.json` exposes an **optional** Claude plugin; `.agents/plugins/marketplace.json` exposes a repo-local ChatGPT/Codex plugin named `ogfrench-local`.
- Tests: `test/portable-workflow-plugin.test.mjs` checks manifests, skills, eval fixtures, packaging boundaries, and declared CI gates. `.github/workflows/check.yml` validates the Claude manifest and performs an isolated Linux plugin install/list/uninstall smoke test.
- Behavioral eval definitions: four positive task cases and one unrelated negative routing case under `portable/ogfrench-workflow/evals/`. The fixture tests do **not** run the model.

## Prior related work, not to undo

- [PR #46](https://github.com/ogfrench/agentic-coding-setup/pull/46) merged filesystem-copy hardening against malicious manifests and symlinks.
- [PR #49](https://github.com/ogfrench/agentic-coding-setup/pull/49) merged the canonical rename migration from `claude-code-setup` to `agentic-coding-setup`.
- [PR #50](https://github.com/ogfrench/agentic-coding-setup/pull/50) merged the approved reviewed-update policy, setting the shared `ogfrench` marketplace `autoUpdate` to `false` and migrating managed legacy settings on subsequent reviewed sync.
- Duplicate rename PR #48 was closed without merge. Preserve `.claude/claude-code-setup.json` as the downstream provenance format and `chore/claude-code-setup` as the established sync branch name.
- Existing Claude plugins `agent-workflow`, `frog-writing`, and `presentation-craft` remain canonical. No forced installation or downstream synchronization is part of PR #47.

## Evidence, with boundaries

| Claim | Status | Evidence |
| --- | --- | --- |
| Repository `main` contains the rename and hardening changes | Verified | Merged PRs #46, #49 and #50 |
| Static Node, privacy and manifest checks | Passed on prior exact heads | [GitHub check #153](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42589674937); verify the current head again |
| Optional Claude plugin can install, list and uninstall in isolated Linux CLI | Verified | [CI #140](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42587762393) and subsequent green checks |
| Personal ChatGPT package v0.1.1 imports and four skills match GitHub source | Verified | Private plugin owner/source inspection; does not imply all ChatGPT hosts installed it |
| Authenticated Claude task invocation and measured benefit versus no plugin | Not run | Needs real model/host execution |
| ChatGPT routing, quality and negative-case comparison | Not run | Needs controlled with/without-plugin test |
| Codex local marketplace cache update and new-chat behavior | Not run | Source registration and installed-copy refresh must be tested separately |
| Windows and macOS | Not run | No host acceptance evidence |
| Public distribution / downstream sync / release tag | Not done | No authorization to claim released |

Do not substitute static CI for behavioral testing. Do not publish raw private prompts, credentials, private repo names or device paths in this public repository.

## Review findings and remaining risk

The portable companion declares neither startup hooks nor bundled MCP connections. Regression tests reject unexpected executable files and symlinks. The security review is at [`docs/portable-workflow-adversarial-review-2026-11-09.md`](portable-workflow-adversarial-review-2026-11-09.md). Residual risks are **prompt-driven tool misuse** under host-granted permissions, duplicate routing versus existing Claude skills, untested cache refresh/version behavior, settings precedence on individual machines, and unsupported claims about Windows/macOS. There is no measured behavioral win yet.

The ChatGPT personal upload, Claude marketplace install and Codex local marketplace are separate distribution paths. Updating one does not automatically update the others. An installed local Codex plugin is a cached copy, not a live reference to the checkout. The owner-uploaded ChatGPT release must be updated through Plugin Creator and verified independently.

## Next agent: execution order

1. Fetch the live PR #47 head and review its entire diff against `main`, especially `README.md`, both marketplaces, both plugin manifests, tests and the shared update policy. Read [the scratchpad](WORK-IN-PROGRESS.md) and [acceptance record](portable-workflow-acceptance.md). Do not work from the historical SHA in this handover if the branch moved.
2. Confirm the **exact-head CI** is fully green. Review every step, including public-data checks, strict Claude plugin validation, isolated install/list/uninstall and apply dry-run. Fix failures on PR #47 only.
3. On an authenticated Claude Code host, record OS, CLI/model versions and plugin scope; install from the reviewed feature/ref, run the four positive and one negative evals *with and without* the plugin, then uninstall. Record actual skill invocations, quality, false activations and model cost. Keep sensitive logs private.
4. In a new ChatGPT chat, test the privately imported plugin and a no-plugin baseline on the same tasks. Verify it does not invent GitHub access or implementation screenshots. Record actual feature availability and permissions.
5. On a supported local Codex/ChatGPT desktop host, register the local marketplace with `codex plugin marketplace add ./` from the checkout (or select the automatic repo source), install using the desktop plugin browser, refresh after a reviewed change and verify the installed cached copy. Repeat on claimed operating systems or restrict support claims.
6. Verify higher-precedence local/managed settings and that `autoUpdate` is effectively disabled for the managed marketplace. Inspect downstream GitHub Actions for any `uses:` reference to the old repository name; GitHub Actions reusable workflow/action references may not follow the normal web redirect.
7. Fill the [acceptance record](portable-workflow-acceptance.md) with PASS, FAIL, BLOCKED or explicit WAIVED outcomes and links to sanitized evidence; update the scratchpad and PR body. Only then decide whether to mark PR #47 ready, merge, tag or distribute a reviewed package.

## Rollback and release boundaries

For the optional companion, roll back with the relevant host's **disable/uninstall** control. Do not delete the shared `.claude/claude-code-setup.json`, overwrite machine settings, remove existing Claude plugins or run downstream sync to undo an optional install. For Codex cached installs, verify the host is using the intended version after a refresh or uninstall; do not manually edit its cache. For ChatGPT, a private plugin can be updated/disabled independently of this repository.

There is no default rollout path: merging PR #47 would publish source to the GitHub repository but does **not** distribute the ChatGPT uploaded package, install Claude Code on existing machines, or update downstream repositories. Do not use `MERGE=1 bash sync-to-repos.sh` without a separately reviewed downstream release decision. Dependabot PR #44 and other feature work are out of scope.

## Links for resumption

- [Draft PR #47](https://github.com/ogfrench/agentic-coding-setup/pull/47)
- [Portable plugin README](../portable/ogfrench-workflow/README.md)
- [Host contract](portable-workflow-plugin.md)
- [Acceptance evidence template](portable-workflow-acceptance.md)
- [Security review](portable-workflow-adversarial-review-2026-11-09.md)
- [Done/pending scratchpad](WORK-IN-PROGRESS.md)
- [Official Claude plugin installation](https://code.claude.com/docs/en/plugins/install)
- [Official OpenAI marketplace and cache behavior](https://developers.openai.com/plugins/build/plugins)
