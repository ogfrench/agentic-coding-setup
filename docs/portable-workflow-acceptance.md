# Portable workflow plugin: release acceptance record

This is the host-acceptance record for [merged PR #47](https://github.com/ogfrench/agentic-coding-setup/pull/47). A green static check, an installed plugin, and an effective behavioral skill are **three different claims**. Record only observed outcomes and link the exact source and evidence. Keep credentials, private repository names and raw confidential prompts out of this public file.

## Required evidence

| Gate | Evidence to record | Pass condition |
| --- | --- | --- |
| Identity and provenance | Git commit SHA, both manifest versions, package release ID (if privately imported), comparison result | Manifests agree; source files match the shipped package |
| CI and installation | Full GitHub Actions URL at exact head; host OS and CLI version; isolated install/list/uninstall output | All static checks pass and optional install/uninstall works without changing the base setup |
| Claude task behavior | Four positive eval cases and one negative case; actual invocation trace, quality rubric, with/without results and cost | Intended skills activate, unrelated task does not; no material regression against baseline |
| ChatGPT task behavior | New-chat test with private plugin enabled and a no-plugin baseline; same tasks, tool access and outcome notes | Supported tasks run as documented; unsupported requests do not invent access or fake screenshots |
| Platform scope | Linux, macOS, Windows results, with host and install method recorded | Each platform advertised as supported has evidence; otherwise mark untested and restrict claims |
| Local Codex marketplace installed snapshot | Source checkout and marketplace registration, installed plugin cache/version, fresh-session result after refresh | Actual installed content matches reviewed source; marketplace upgrade alone is not proof |
| Settings and rollback | Effective marketplace/update policy, any permission prompts, uninstall and repeat baseline test | No unexpected auto-update, credential request, or modification to existing setup |
| Final decision | Reviewer, date, exact SHA and CI URL, remaining risks and explicit approval or waiver | No unresolved critical defect; every waived gate is listed and reflected in user-facing support claims |

The existing five evaluation fixtures under `portable/ogfrench-workflow/evals/` are **test definitions**, not scores. Static CI checks their structure and the Linux installation mechanism; it does not run authenticated model tasks. When reporting results, preserve both arms, not only the best outcome. See [OpenAI plugin testing guidance](https://developers.openai.com/plugins/deploy/connect-chatgpt) and [Claude Code evaluation instructions](https://code.claude.com/docs/en/plugin-evals).

## Repeatable acceptance procedure

1. Check out the precise reviewed PR head and run `node --test`. Confirm the exact-head `check` workflow is green and includes the strict portable Claude validator and isolated plugin installation.
2. On an **authenticated test host**, install `ogfrench-workflow@ogfrench` using the [plugin README](../portable/ogfrench-workflow/README.md). Record `claude --version`, OS, configuration scope and installation output.
3. Run the four positive cases and the unrelated negative case with and without the plugin. Record outcome quality, actual skill invocation, tool availability, cost and errors. An evaluation that cannot run is **blocked**, not passed.
4. In ChatGPT, enable the private plugin in a *new chat* and repeat comparable tasks with an unmodified no-plugin baseline. Confirm the installed version, not merely the marketplace source.
5. On a supported Codex/ChatGPT desktop host, add or select the local `ogfrench-local` marketplace, install its plugin, inspect the installed version/skills, then refresh after a reviewed source change. Test in a new conversation and record evidence that the *installed cache* changed. `codex plugin marketplace upgrade` does not alone confirm an installed update.
6. Recheck installed/updated behavior on every platform claimed in the README. If Windows/macOS remain untested, do not claim support there.
7. Uninstall/disable the companion. Check that existing Claude hooks, settings, other plugins and downstream repository copies are unchanged.
8. Write the decision in the section below and update [the working scratchpad](WORK-IN-PROGRESS.md) plus PR #47. Merge or publish only with sufficient actual evidence.

## Record template

Copy this section for each actual host run. Never precheck a result.

```text
Date:
Reviewer:
PR head SHA / package version / plugin release ID:
Host (OS, version, client, CLI version):
Installation path and config scope:
Permissions or connections requested:
Positive cases (case: with-plugin result / no-plugin result / invocation):
Negative case (activation and output with/without):
Evidence location (CI URL; local logs retained privately):
Source-to-package parity:
Install / uninstall / repeat test:
Observed problems and severity:
Supported platforms actually tested:
Decision: PASS | FAIL | BLOCKED | WAIVED
Justification / explicit waiver / follow-up owner:
```

## Current decision: BLOCKED for public release

At creation, the Linux isolated CLI installation, static validations and private package source parity had passed. Authenticated Claude and comparative ChatGPT behavior, Windows/macOS acceptance, and effective real-host settings had **not** been established. That is a verification gap, not evidence of failure. Do not change this decision solely because a later documentation-only CI run passes.
