# Workflow naming and release contract | 2026-11-10

## Product identity

Agentic has two host-specific packages built from this one repository:

| User-facing package | Source directory (retained) | Identity | Version |
| --- | --- | --- | --- |
| Claude Workflow | `plugins/agent-workflow/` | `claude-workflow` | `1.11.0` |
| ChatGPT Workflow Lite | `portable/ogfrench-workflow/` | `chatgpt-workflow-lite` | `1.11.0` |

The source directories retain their existing names to avoid broad filesystem, generated-knowledge and downstream sync migrations. **The manifests and marketplace entries are the installed package identities**. A future physical directory move would need separate migration and regression evidence.

Version parity is deliberate even though the packages have different capabilities. The portable and Claude manifests must match the full Claude package's version; CI enforces this through `test/portable-workflow-plugin.test.mjs`. Do not infer parity of host features or installation.

## Safe transition

- Full Claude Code plugin is renamed at the marketplace identity level. Existing `agent-workflow@ogfrench` installations are *not* silently uninstalled. Existing direct-copy installation via `setup-user.sh` and project sync is unchanged. Check actual managed plugin enablement and host installs before deprecating the old name.
- Portable Claude/Codex marketplace entry becomes `chatgpt-workflow-lite`. The source directory remains `portable/ogfrench-workflow/`; update the marketplace and **installed cache** explicitly to use new identity.
- The old private personal ChatGPT `ogfrench-workflow` v0.1.1 entry cannot be renamed in place through a Plugin Creator update, which preserves identity. A **new private plugin** from a verified `chatgpt-workflow-lite` v1.11.0 archive is necessary. Keep the old plugin intact until a real-host task comparison, installed release check and rollback succeed.
- Shared naming/version enforcement **does not install or synchronize plugins automatically** to Claude Code, ChatGPT, Codex or other projects. The existing `autoUpdate: false` policy and human-reviewed update path remain in force.

## Release gate

1. Exact-head full CI, strict Claude marketplace and local package validation, privacy scan, portable Linux clean install/list/uninstall, source version parity.
2. Build private plugin from that exact merged source SHA, verify all four skills against the package, record hash and current private release. Do not copy private account IDs into this public repository.
3. Actual host tasks and negative routing case, Windows/macOS coverage or honest support restriction, documented rollback.
4. Only then claim installed-host readiness. No default downstream migration and no release tag from a source-only merge.

Previous design decision: [PR #47](https://github.com/ogfrench/agentic-coding-setup/pull/47), original optional four-skill cross-host companion. Current user-approved names: `claude-workflow` and `chatgpt-workflow-lite` under Agentic.
