# Agentic Workflow 2026.11.4 release candidate

The Claude Code edition is renamed from `claude-workflow` to `agentic-workflow`, the same name as the ChatGPT edition. Current Claude Code validation reserves names that start with `claude-` for Anthropic's own plugins, so a third-party plugin named `claude-workflow` is refused. The CI pin that hid this (`@anthropic-ai/claude-code@2.1.270`) is now `2.1.323`, so validation enforces the rule.

Pending accepted main SHA, exact-head CI, and documented host acceptance; `v2026.11.3` and its `claude-workflow` archive remain unchanged. This file is a release-note source, not evidence of a published tag.

- Claude edition plugin id: `agentic-workflow` (was `claude-workflow`). Release archive: `agentic-workflow-claude-v<version>.zip`.
- Both editions advance to 2026.11.4 together. Skills, agents and the ChatGPT package content are unchanged.
- Migration for an existing Claude Code install: run `claude plugin uninstall claude-workflow@ogfrench`, then `claude plugin install agentic-workflow@ogfrench`. The old name no longer exists in the marketplace.
- No downstream repository sync, plugin installation or account change is implied by merging this change.
