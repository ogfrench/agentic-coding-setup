# Portable workflow plugin: host contract and release gate

The source plugin lives at `portable/ogfrench-workflow/`. Its root `plugin.json` is the OpenAI Agent Plugins manifest; `.claude-plugin/plugin.json` is the Claude Code manifest. Both describe version 0.1.1 of the same four-skill *companion*. The existing Claude plugins, scripts, personal skills, settings and local setup stay unchanged.

## Why a companion rather than a wholesale port?

The existing `agent-workflow`, `frog-writing` and `presentation-craft` plugins are already native Claude packages. Copying them wholesale under a new name would duplicate skill routing, increase maintenance cost and make upgrades ambiguous. This small plugin extracts the cross-host decision and verification workflows without pretending all runtime behavior is portable. The existing source of truth remains this repository. Detailed Claude Code skills should still be maintained in their original directories.

## Capability matrix

| Capability | Claude Code | ChatGPT / Codex |
| --- | --- | --- |
| Four review and setup-audit skills | Packaged, host acceptance pending | Packaged, host acceptance pending |
| Read GitHub files, PRs, CI | Only with available/authenticated tools | Only with available/authenticated GitHub app/tools |
| Inspect local code and render UI | Only when a filesystem/browser is available | Only in supported desktop/Work/Codex environments |
| Original 3 first-party plugins and third-party plugins | Existing setup remains separate | Not provided |
| Claude hooks, SessionStart, agents and commands | Existing setup remains separate | Not portable |
| Repo sync, personal secrets, MCP server installation | Not performed by this plugin | Not performed by this plugin |

## Install and test

For a Claude Code local test, register the repository marketplace and install `ogfrench-workflow@ogfrench` from the matching branch or release. The root marketplace lists it as an optional plugin. Do **not** add it to the existing `setup-user.sh` copy loop: this companion is intentionally outside `plugins/*`.

For a ChatGPT or Codex local test, use `.agents/plugins/marketplace.json` with the repository checkout and restart the supported desktop app. Alternatively, archive the `portable/ogfrench-workflow` directory by itself and import it with Plugin Creator as a private skills-only plugin. The archive must have one plugin root. An uploaded private package is not a public release.

Host tests should attempt: (1) a source-grounded PR risk assessment, (2) a real UI implementation review that refuses fake screenshots, (3) a release handover with live links and explicit unverified steps, and (4) an audit that recognizes missing local tool permissions. Run the same tasks without the plugin and compare result quality, triggering and false activations.

## Before release

1. Run repository `node --test` and verify the manifest/test assertions.
2. Test clean-install and uninstall on Claude Code and ChatGPT; verify both host surfaces separately.
3. Review every permission, source, data path and external dependency. The package must remain skills-only with no startup hook, installer, token or bundled data.
4. Capture live installation and task evidence. Publish only when those checks pass. Do not auto-merge PRs or bypass `agent-workflow` 1.9.0 and sync security reviews.

Rollback: uninstall the companion plugin in the relevant host. No existing setup files or downstream repositories should have been modified by the plugin itself.

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
