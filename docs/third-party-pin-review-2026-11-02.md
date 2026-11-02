# Third-party plugin pin review, 2026-11-02

**Decision: retain all three existing pins. Do not auto-update or install upstream HEAD.** This is a source and manifest review, **not** an end-to-end compatibility certification. The follow-up runtime checks in issue #30 remain required before upgrading.

## Scope and inspected evidence

| Plugin | Installed SHA | Candidate compared | Review |
| --- | --- | --- | --- |
| [Caveman](https://github.com/JuliusBrussee/caveman) | `25d22f864ad68cc447a4cb93aefde918aa4aec9f` | `9b68f7ed12b05e7efaff18e65c5a3fc2849fd0a4` (2026-10-25) | Retain |
| [Ponytail](https://github.com/DietrichGebert/ponytail) | `687c1b339872289d70f65c5eaabce850b1663867` | `09c434ab73ca43761c5d8b0c5d341926c2fba710` (2026-10-18) | Retain |
| [21st](https://github.com/21st-dev/claude-code-plugin) | `f76b07aec6e65a582abe4b20bf3ec7b0fa64968a` | Same as upstream main on 2026-11-02 | Retain |

Checked the exact pinned and comparison commit plugin manifests, the GitHub compare file lists/selected patches, representative hook/config sources and repository license metadata. The Caveman comparison is **1,685 commits ahead** and GitHub returned only the first **300 changed files**; it is not a complete source-code audit. The Ponytail comparison is **301 commits ahead**. Both upstream main branches have moved since the comparison endpoints: candidates are *review markers*, not approved upgrade SHAs.

- [Caveman comparison](https://github.com/JuliusBrussee/caveman/compare/25d22f864ad68cc447a4cb93aefde918aa4aec9f...9b68f7ed12b05e7efaff18e65c5a3fc2849fd0a4)
- [Ponytail comparison](https://github.com/DietrichGebert/ponytail/compare/687c1b339872289d70f65c5eaabce850b1663867...09c434ab73ca43761c5d8b0c5d341926c2fba710)

## Material changes and risk

**Caveman:** The newer `.claude-plugin/plugin.json` adds `SubagentStart` and `SessionEnd` command hooks, changes startup/prompt hook commands, and increases some timeouts from 5 to 30 seconds. Upstream also replaces installer components and substantially expands its CLI, engine and browser automation surface. The newer source is Apache-2.0, with separate notices covering historic MIT material, versus the older license arrangement. Treat executable shell hooks and install/update scripts as a **new trust review**. Do not claim the older and newer operational surfaces are equivalent.

**Ponytail:** The newer manifest changes version 4.6.0 to 5.3.2 and loads two hook definitions, including a TSX module. New user configuration records local per-task cost and token metrics by default, with an **optional** remote webhook URL, bearer token and task-name sending settings. Representative lifecycle code reads/writes local configuration and can spawn a background session import when requested. Even if a webhook is off by default, do not upgrade without confirming data handling and explicit user settings. The newer band requires newer Claude Code versions according to upstream documentation.

**21st:** The pinned commit equals upstream main at review time. No upgrade decision or new capabilities are justified by this check.

## Verification boundary and next gate

The checked plugin manifests are valid JSON and their pinned references resolve. This is **not** evidence that a Claude Code runtime accepts all hook definitions or that hooks behave safely. No third-party hook or installer was executed, no private workspace was exposed, no authenticated Claude Code evaluation was run, and no installed pins or project settings were changed.

Before revisiting an upgrade:

1. Compare each candidate to the **current** upstream commit, reviewing all executable hook/installer files, invoked dependencies, settings mutations and network sinks. Review license and provenance per distribution component.
2. Run `claude plugin validate` against both the old and proposed exact SHA in separate disposable directories using the supported Claude Code version; inspect validation failures and all hooks before permitting execution.
3. In a disposable user/config directory with no client data or credentials, exercise install, session start, user prompt, subagent and uninstall flows. Confirm which files are modified, no unexpected external requests, disabled/default modes, and clean rollback.
4. Make any upgrade in its own PR with exact commit pins and measured results. Avoid updating all plugins simultaneously. Do not silently enable new telemetry or installer permissions.

Owner: issue [#30](https://github.com/ogfrench/claude-code-setup/issues/30). This review documents why **keeping the current pins is the safe decision**, rather than declaring compatibility work complete.
