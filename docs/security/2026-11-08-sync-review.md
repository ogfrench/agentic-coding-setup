# Shared Claude Code setup security review | 2026-11-08

**Status:** proposed hardening for a second agent to review. This repository is the upstream source of skills, hooks and MCP configuration synced into downstream repositories. A trusted upstream change can affect multiple repositories and Claude sessions; do not merge automatically.

## Attack and trust boundaries

- `lib/apply.mjs` copies skills, agents, commands and knowledge to target repositories, can delete previously managed paths and merges `.claude/settings.json` and `.mcp.json`.
- `sync-to-repos.sh` and `.github/workflows/sync.yml` run with GitHub App authorization, can push to downstream repos, and can optionally merge sync PRs when explicitly requested.
- Source skills, third-party plugin marketplaces, hooks and `CLAUDE.md` are **instructions to an AI agent**, not executable sandbox isolation. They may induce file, network or shell operations with whatever permissions the host grants.
- Sensitive downstream repo names are kept out of public scheduled workflow logs through quiet mode; a repo can contain confidential information even if the central source repo is public.

## Findings

| ID | Priority | Evidence | Action |
| --- | --- | --- | --- |
| CCS-S1 | **High / destructive paths** | `apply.mjs` accepted `.claude/skills/.` in an untrusted copied-path manifest; recursive deletion of that path would resolve to the entire skill folder, not a single managed item. `sync-status.mjs` already rejected this form, but apply did not. | **Fixed:** reject both `.` and `..` as leaf names. Regression preserves an unrelated local skill when a forged manifest contains the dot entry. |
| CCS-S2 | **High / filesystem redirection** | `apply.mjs` could read/write `.claude/settings.json` or `.mcp.json` through existing symlinks, and could copy source symlinks into downstream projects; the wrapper checked some parents but direct callers did not. | **Fixed:** reject symlinked managed parents, manifest, configuration files and nested source content before mutating a target. Tests cover external settings symlink and nested source symlink. |
| CCS-S3 | **Operational / trust propagation** | Shared skills and project hooks propagate into target repositories. A malicious or mistaken instruction can be repeated across repos even when it is not malicious JavaScript. | Enforce independent review of prompt/skill changes, command hooks, and new marketplace/MCP servers. Keep high-risk side effects explicit and avoid silent changes to target-owned files. |
| CCS-S4 | **CI / token boundary** | The sync workflow receives an installation token, while logs may be public. The merge input can cause downstream sync PRs to merge without a separate manual reviewer. | Confirm App scopes, redaction, `SYNC_QUIET=1`, default draft behavior, and manual approval for merge. This PR does not expand GitHub App permissions. |
| CCS-S5 | **External update** | `project/settings.json` registers a marketplace with `autoUpdate: true`. Downstream plugin updates are a separate trust boundary from committed skill copies. | Reviewer must decide whether managed fleet policy accepts auto-update or requires pinning and change approval. Do not confuse this with code synced by a reviewed PR. |

## Required second-agent acceptance

- [ ] Inspect complete diff of `lib/apply.mjs` and security tests. Validate non-symlink ordinary copies, owner-owned folders, deep-merge semantics, retiring managed paths and repeat-apply idempotence.
- [ ] Run `node --test test/apply.test.mjs` and full `.github/workflows/check.yml` on final SHA, on Unix and ideally Windows. Windows-specific symlink behavior must be examined separately.
- [ ] Try malicious manifest entries (`.`, `..`, traversal and absolute paths), dangling and nested source symlinks, target-owned configuration symlinks, and malicious filenames without escaping the temporary fixture.
- [ ] Review hooks and MCP server configuration under `project/`, all active external plugin approvals and current agent-workflow 1.9.0 security assumptions.
- [ ] Verify `sync-to-repos.sh` never prints downstream private repo names or authentication tokens in public logs and that no unexpected merge happens on a scheduled run.
- [ ] Merge only after review and green checks, then propagate via separate draft downstream sync PRs with their own CI and second review. No Dependabot changes.
- [ ] Run the live with/without skill evaluation tracked by issue #29 before claiming behavioral quality improved.

**Residual risk:** this safeguards the copier, but it cannot sandbox Claude, downloaded plugins, or untrusted repository content. Review actions and host permissions independently.
