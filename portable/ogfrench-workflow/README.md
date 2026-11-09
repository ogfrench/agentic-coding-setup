# ogfrench Workflow

An optional four-skill companion to [agentic-coding-setup](https://github.com/ogfrench/agentic-coding-setup). **v0.1.1, draft PR #47, not publicly released.**

| Skill | Purpose |
| --- | --- |
| `setup-audit` | Audit a development agent setup and its actual capabilities |
| `adversarial-review` | Review code, security and product decisions using evidence |
| `implementation-proof` | Verify the real UI implementation and rendered results, not generated pictures |
| `release-handover` | Separate verified changes from outstanding release risks and actions |

These are instructions executed within the current host's permissions. **They do not grant GitHub, browser, filesystem or MCP access.** The original Claude plugins, personal settings, hooks and repo sync stay separate.

## Claude Code: test this branch

Isolated **Linux** CI has installed, listed and uninstalled the plugin successfully; authenticated skill execution, macOS and Windows remain unverified.

```sh
git clone https://github.com/ogfrench/agentic-coding-setup.git
cd agentic-coding-setup
git switch feat/cross-platform-workflow-plugin-2026-11-09
claude plugin validate portable/ogfrench-workflow --strict
claude plugin marketplace add ./
claude plugin install ogfrench-workflow@ogfrench --scope user
claude plugin list
```

In Claude Code, invoke `/ogfrench-workflow:adversarial-review` on a real project the host can inspect. Record the result and compare against a no-plugin task before claiming useful behavior.

After a **reviewed** update to the source, update the marketplace and installed plugin separately:

```sh
claude plugin marketplace update ogfrench
claude plugin update ogfrench-workflow@ogfrench --scope user
```

For a local checkout, confirm the registered marketplace source and selected branch/commit before updating. A marketplace update alone does not prove the installed plugin changed. The project's approved policy remains `autoUpdate: false`.

To uninstall only this companion at user scope:

```sh
claude plugin uninstall ogfrench-workflow@ogfrench --scope user
```

For an isolated test, set `CLAUDE_CONFIG_DIR` to a disposable directory **before** installing. Do not overwrite an existing marketplace with the same name to force installation.

## ChatGPT: private plugin

A personal, private `ogfrench-workflow` v0.1.1 plugin has been imported and its packaged source verified. It is **not publicly discoverable**, not automatically installed by cloning GitHub, and does not bundle app connections.

If the plugin has been shared with your account, open **Plugins** in ChatGPT, find it under **Personal** or **Installed**, review it and install if prompted. In a supported chat, mention the plugin with `@` or request one of the workflows. GitHub access still requires separate authorization. Availability depends on plan, workspace and surface.

The **private uploaded plugin** is updated through Plugin Creator. Editing a GitHub file does not update that release. Verify the released manifest and four skills against the exact reviewed source commit before claiming parity.

## ChatGPT desktop / Codex: local marketplace

The repository contains `.agents/plugins/marketplace.json`, a separate **local** marketplace named `ogfrench-local`, pointing to `./portable/ogfrench-workflow`.

Open this branch in a supported ChatGPT desktop or Codex workspace, restart the desktop app, select the `ogfrench-local` source in the Plugins Directory and install `ogfrench-workflow`. Test it in a new conversation. This local source is not the same as the uploaded personal ChatGPT plugin.

Codex can inspect and refresh tracked marketplaces:

```sh
codex plugin marketplace list
codex plugin marketplace upgrade ogfrench-local
```

**Important:** local plugins are loaded from an installed **cache**, not directly from the source files. Changing the Git checkout or refreshing its marketplace does **not** prove the installed plugin refreshed. After reviewing an update, refresh/reinstall through the desktop plugin UI, restart when necessary and verify a new task. Do not edit the cache manually.

## Evidence and rollback

**Passed:** static tests, privacy checks, strict Claude manifest validation, isolated Linux installation/list/uninstallation and exact private ChatGPT v0.1.1 source parity.

**Not passed or not run:** authenticated Claude tasks, measured quality versus no plugin, false-positive skill activation, Windows/macOS acceptance and effective managed-settings precedence.

**Rollback:** disable or uninstall only this optional plugin. Keep `.claude/claude-code-setup.json`, original plugins, project hooks, MCP config and downstream sync intact.

See the [technical contract](../../docs/portable-workflow-plugin.md), [acceptance record](../../docs/portable-workflow-acceptance.md), [scratchpad](../../docs/WORK-IN-PROGRESS.md), and [handover](../../docs/PORTABLE-WORKFLOW-HANDOVER-2026-11-09.md).

Official references: [Claude plugin CLI](https://code.claude.com/docs/en/plugins/cli-reference), [OpenAI marketplace and local cache](https://developers.openai.com/plugins/build/plugins), [ChatGPT plugins](https://help.openai.com/en/articles/20001256-plugins-in-chatgpt).
