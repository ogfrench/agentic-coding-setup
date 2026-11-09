# ogfrench Workflow

A small cross-host companion to the existing `agentic-coding-setup` system.

It supplies four portable skills: setup-audit, adversarial-review, implementation-proof, and release-handover. It does **not** replace the three existing Claude Code plugins (`agent-workflow`, `frog-writing`, `presentation-craft`) or the repository's setup/sync scripts.

## Supported shape

- **Claude Code**: native plugin via `.claude-plugin/plugin.json`, with namespaced skills. No hooks or agents are bundled here.
- **ChatGPT / Codex**: portable skills-only plugin via the root `plugin.json`; it uses whatever source and tool access the current session actually has.
- **Both**: read-only instructions by default. Local setup, credentials, third-party plugins, hooks, MCP connections, and repo sync are *not* installed automatically.

Install only if you want this complementary set of review workflows. Do not infer that installing it also configures your machine or all your repositories. Keep existing first-party plugins as canonical for their more detailed Claude-specific workflows.

No credential, client or private-repository data belongs in this public package. No automatic marketplace updates, third-party installation or unattended repository writes are required.
