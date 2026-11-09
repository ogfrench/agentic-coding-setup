---
name: setup-audit
description: Audit an AI coding workflow, its repository instructions, plugins, skills, hooks and update behavior. Use when checking setup drift, migration, safety or cross-host readiness.
---

# Audit the actual setup

Read the current repository configuration and any explicitly connected source before recommending changes. The live repository is authoritative; do not substitute remembered layouts or assume a listed plugin is installed.

Identify what is truly shared versus host-specific: skills and reference material are often portable; Claude Code settings, hooks, commands, agents, installed MCP servers and local authentication are not automatically available in ChatGPT.

For ogfrench/claude-code-setup, review the source-of-truth README, plugin manifests, setup-user.sh, project/settings.json, project/mcp.json, sync scripts and applicable PRs. Check version and source pins, cross-repository drift, local overrides, unexpected permissions, unreviewed update behavior and whether the setup leaks client or private repository details.

Distinguish read-only audit from authorized modifications. Never run an installer from an unreviewed URL or silently change local permissions, plugins, settings, repositories or credential scopes. If local filesystem access is unavailable, say which checks could not run instead of claiming the machine is configured.

Recommend the smallest fix, identify affected users/repos and provide a verification and rollback path. For a migration, preserve existing user-owned settings and avoid skill duplication between user-scope copies and namespaced plugin installations.
