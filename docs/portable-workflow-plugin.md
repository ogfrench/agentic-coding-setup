# Portable workflow plugin: host and release contract

**Package source directory:** `portable/ogfrench-workflow/` (retained as an internal path for compatibility). **New plugin identity:** `chatgpt-workflow-lite`, **version 1.11.0**, paired with full `claude-workflow` 1.11.0. Original [PR #47](https://github.com/ogfrench/agentic-coding-setup/pull/47) merged; the rename is a new source candidate, not proof of installed host acceptance.

The root `plugin.json` defines the portable Agent Plugins identity and OpenAI metadata. Package naming and version parity with the full Claude variant are asserted in `test/portable-workflow-plugin.test.mjs`; one product does not mean identical host tools. `.claude-plugin/plugin.json` defines the Claude Code identity. Both must use the same name and version. This is an optional **skills-only** companion, not a replacement for full `claude-workflow`, `frog-writing`, `presentation-craft`, `setup-user.sh`, or `sync-to-repos.sh`.

## What actually works

| Surface | Verified | Not yet demonstrated |
| --- | --- | --- |
| Claude Code, Linux CI | Strict plugin validation and isolated marketplace add, install, list, uninstall | Authenticated model task and quality comparison |
| ChatGPT private personal plugin | legacy `ogfrench-workflow` v0.1.1 import and exact text parity for manifest and four skills; not yet checked for renamed v1.11.0 | Controlled with/without task outcome and installation for other accounts |
| ChatGPT desktop / Codex local marketplace | Marketplace file shape and path tested | Real desktop install, cached-copy refresh and live invocation |
| Windows and macOS | No real host evidence | Install, invoke, upgrade and uninstall |
| GitHub, local files, browser, MCP | Uses only access independently supplied by the host | No new access is granted by this plugin |

**Access boundary:** a skill is an instruction, not a sandbox or tool connection. Repositories, issue content, tool outputs and web pages are untrusted data. The plugin contains no executable hooks, local agents, MCP server, third-party dependencies or bundled credentials. Tests check for undeclared executables and symlinks; they cannot prevent a host-authorized model from taking actions through unrelated tools.

## Installation and update sources

Use the [plugin README](../portable/ogfrench-workflow/README.md) as the **one user-facing source of install, update and removal commands**.

- **Claude Code:** install a reviewed checkout from the `ogfrench` marketplace. Updating the marketplace catalog and updating the installed plugin are separate actions. Central policy is `autoUpdate: false` and existing user or managed settings may override the effective configuration.
- **ChatGPT uploaded plugin:** an independently versioned **private** personal release. Its owner updates it through Plugin Creator; a GitHub commit or marketplace refresh does not alter that uploaded release.
- **ChatGPT desktop / Codex local marketplace:** `.agents/plugins/marketplace.json` makes the plugin discoverable from a checkout. The installed copy is cached. Updating source files, doing a Codex marketplace upgrade or refreshing the directory does not by itself demonstrate updated installed behavior; reinstall/refresh via supported UI, then verify with a fresh task.
- **Rollback:** disable/uninstall only the optional companion. Keep the existing `.claude/claude-code-setup.json` provenance file, the `chore/claude-code-setup` downstream branch naming, hooks and project settings unchanged.

**Version provenance:** for every new privately uploaded release, compare the released root manifest and all four `SKILL.md` files against a specific reviewed GitHub commit. Record the version, release ID, source SHA and outcome in the PR without exposing private account data.

## Overlap with the existing setup

The four portable skills deliberately cover some themes already addressed by specialized Claude Code skills: `implementation-proof` versus `visual-loop`, `adversarial-review` versus review/best-practices, and `release-handover` versus operational handover conventions. This is a portability trade-off, not evidence of better task outcomes. Do not auto-install both for every user or downstream repo until skill-routing and with/without evaluations show a benefit.

## Test and merge gates

CI runs the Node fixture/security tests, public-data scanner, root/local/portable Claude validation, isolated Linux add/install/list/uninstall and apply dry-run. Those tests **do not run a Claude model**.

The [five evaluation fixtures](../portable/ogfrench-workflow/evals/README.md) exercise each skill and an unrelated negative routing case. Record authenticated runs on supported hosts in a copy of the [acceptance template](portable-workflow-acceptance.md), including exact SHA/version, host/OS, model and CLI version, installed package and permissions, task prompts, with/without comparison, observed skill activation, false positives, cost, missing data and uninstall/rollback.

Release requires: exact-head green CI, supported-host task evidence, no unaccepted high-severity risk, a reproducible rollback, and a documented decision on Windows/macOS coverage. If scope is intentionally narrower, record a named and justified support waiver in the acceptance record and PR.

**Current decision: SOURCE CANDIDATE ONLY.** The original v0.1.1 source merge and static installation tests are historical evidence. The rename/version alignment needs exact-head CI before merge; authenticated Claude/ChatGPT behavior and Windows/macOS acceptance remain unverified. Do not publish or downstream-sync a private installed release on static checks alone.

## Troubleshooting

- **Claude cannot find it:** verify the checkout/ref, marketplace source and `claude plugin list`; inspect scopes and effective settings using `/status`. Avoid replacing an existing marketplace registration without review.
- **ChatGPT cannot find the private release:** check the correct account/workspace, whether access was granted and whether it is installed. A personal plugin is not a public directory entry.
- **Local desktop shows an old behavior:** local marketplace files are not the installed files. Refresh/reinstall the cached plugin via supported UI and retry in a fresh session.
- **A skill invokes missing tools:** plugin instructions do not grant tools; check provider app connections, workspace policy and repository permissions independently.
- **A rollback appears to affect original setup:** stop and inspect the actual installation scope. This companion must not remove existing plugins, hooks, credentials or downstream manifests.

## Maintainer references

- [Working scratchpad](WORK-IN-PROGRESS.md): completed versus pending evidence
- [Adversarial review](portable-workflow-adversarial-review-2026-11-09.md): assessed risks and reasoning
- [Acceptance template](portable-workflow-acceptance.md): test protocol and pass criteria
- [Technical handover](PORTABLE-WORKFLOW-HANDOVER-2026-11-09.md): work history, repository state and next agent actions

Official platform references: [Claude plugin CLI](https://code.claude.com/docs/en/plugins/cli-reference), [Claude settings precedence](https://code.claude.com/docs/en/settings), [OpenAI plugin packaging and local marketplaces](https://developers.openai.com/plugins/build/plugins), [ChatGPT plugin installation](https://help.openai.com/en/articles/20001256-plugins-in-chatgpt).
