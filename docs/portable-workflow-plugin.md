# Portable workflow plugin: host contract and release gate

The source plugin lives at `portable/ogfrench-workflow/`. Its root `plugin.json` is the OpenAI Agent Plugins manifest; `.claude-plugin/plugin.json` is the Claude Code manifest. Both describe version 0.1.1 of the same four-skill *companion*. The existing Claude plugins, scripts, personal skills, settings and local setup stay unchanged.

## Why a companion rather than a wholesale port?

The existing `agent-workflow`, `frog-writing` and `presentation-craft` plugins are already native Claude packages. Copying them wholesale under a new name would duplicate skill routing, increase maintenance cost and make upgrades ambiguous. This small plugin extracts the cross-host decision and verification workflows without pretending all runtime behavior is portable. The existing source of truth remains this repository. Detailed Claude Code skills should still be maintained in their original directories.

## Capability matrix

| Capability | Claude Code | ChatGPT / Codex |
| --- | --- | --- |
| Four review and setup-audit skills | Strict manifest validation and isolated Linux install/list/uninstall passed; live task activation pending | Private v0.1.1 import and source parity passed; controlled task evaluation pending |
| Read GitHub files, PRs, CI | Only with available/authenticated tools | Only with available/authenticated GitHub app/tools |
| Inspect local code and render UI | Only when a filesystem/browser is available | Only in supported desktop/Work/Codex environments |
| Original 3 first-party plugins and third-party plugins | Existing setup remains separate | Not provided |
| Claude hooks, SessionStart, agents and commands | Existing setup remains separate | Not portable |
| Repo sync, personal secrets, MCP server installation | Not performed by this plugin | Not performed by this plugin |

## Documentation map

- [Plugin README](../portable/ogfrench-workflow/README.md): choose one installation route and follow its uninstall instructions.
- [Release acceptance](portable-workflow-acceptance.md): exact test procedure, evidence template and go/no-go decision criteria.
- [Behavioral evaluation fixtures](../portable/ogfrench-workflow/evals/README.md): repeatable, paid/authenticated task evaluations, **not** automatically-run CI.
- [Working scratchpad](WORK-IN-PROGRESS.md): completed work, pending host checks and continuation details.
- [Adversarial review](portable-workflow-adversarial-review-2026-11-09.md): current threat boundaries, findings and residual risk.

## Installation surfaces and update boundaries

Use the [plugin's README](../portable/ogfrench-workflow/README.md) as the end-user entry point. The two installation routes are different:

- **Claude Code:** use a local checkout of the feature branch, add its marketplace and install `ogfrench-workflow@ogfrench`. The isolated Linux CI install/list/uninstall passed. It is an *optional* plugin, not part of `setup-user.sh`, and a GitHub PR does not install it on existing machines.
- **ChatGPT:** the creator has a private uploaded plugin v0.1.1. People without access cannot discover or install it merely from the GitHub URL. A plugin owner can update it through Plugin Creator, or an eligible workspace administrator can import an archive under workspace policy. Plugin installation does not grant separate app or repository access.
- **ChatGPT desktop/Work/Codex local marketplace:** the repo's `.agents/plugins/marketplace.json` is a developer preview source read from a checkout in a supported environment. It is not a replacement for the privately uploaded plugin or automatic global installation.

**Versioning:** local marketplace installations use an installed cache snapshot; refresh or reinstall and start a new chat after source changes. The private ChatGPT release is updated separately through Plugin Creator and must be verified against the same reviewed commit. Keep the root portable `plugin.json` and `.claude-plugin/plugin.json` versions aligned. When updating the private ChatGPT release, verify its manifest and four skill files against the exact GitHub commit, record the new plugin release/version in the PR, and re-run the same tests. Do not claim that a GitHub merge, local marketplace edit, or updated ZIP changes an already installed private release automatically.

**Skill overlap:** `adversarial-review` intersects with the existing agent-workflow's `best-practices` and code review patterns; `implementation-proof` intersects with `visual-loop`; the new release skill overlaps operational handover guidance. This is intentional portability, **not** evidence of improved routing. Test false positive activations and compare output quality with the existing plugins before installing both by default.

## Installation state and provenance

The local ChatGPT/Codex marketplace makes the plugin discoverable in supported environments, but the installed copy is cached and is not automatically refreshed by a Git checkout. After updating the repository, refresh/reinstall the local plugin, restart the desktop app if needed, and start a new chat. The uploaded private ChatGPT release uses an independent plugin identity and release history. Record the installed source, release and version in [the acceptance record](portable-workflow-acceptance.md), not just the GitHub commit. Source: [OpenAI plugin packaging](https://developers.openai.com/plugins/build/plugins).

## Troubleshooting and rollback

If Claude Code cannot locate the companion, verify the checkout is on the correct branch, `claude plugin list` shows the namespaced plugin, and the `ogfrench` marketplace points to that checkout. Review effective user, project and managed settings; settings precedence and project trust can affect marketplace discovery. Do not overwrite a user's marketplace configuration to force a match. For a broken or unexpected installation, uninstall `ogfrench-workflow@ogfrench` at the same scope.

If ChatGPT cannot find it, verify the correct account/workspace, access to the *private* plugin, and whether it is installed. For a local marketplace, verify the repo workspace path and restart the supported desktop app. Neither a local marketplace file nor a successful archive import proves it is installed on every ChatGPT surface. Disable or uninstall the companion through Plugins where available, and use the existing Claude setup unchanged.

A rollback never means deleting `.claude/claude-code-setup.json` or rewriting downstream repositories. Removing this optional plugin should leave hooks, project settings, MCP configuration and existing plugin installations untouched.

## Evidence required for final release

Use the [release acceptance record](portable-workflow-acceptance.md) for exact-head provenance, each host result, with/without behavior, platform support, and rollback. Keep private logs outside the public repository. A validated fixture, a successful import and a live test are separate statuses.

## Behavioral verification

The portable package includes five evaluation cases under `portable/ogfrench-workflow/evals/`: one per skill plus one unrelated task that should not trigger any of them. The cases have explicit skill-routing and task-quality graders. They are not automatically executed in CI because they require authenticated model usage and create cost.

The Linux CI clean-config smoke test adds the local marketplace, installs `ogfrench-workflow@ogfrench`, verifies it appears in the plugin list, and uninstalls it. This establishes installation mechanics, not successful real task invocation or Windows/macOS compatibility.

On an authorized Claude Code host with a checkout of the feature branch:

```sh
claude plugin marketplace add ./
claude plugin install ogfrench-workflow@ogfrench --scope user
claude plugin list
claude plugin eval portable/ogfrench-workflow --runs 3 --no-publish --max-cost-usd 30
claude plugin uninstall ogfrench-workflow@ogfrench --scope user
```

Use a disposable `CLAUDE_CONFIG_DIR` when checking a clean install. Record the CLI version, environment, model, actual invocation, with/without outcomes and any false skill activation. Do not claim task quality or release readiness until those results exist.
