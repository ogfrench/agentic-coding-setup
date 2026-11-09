# Working scratchpad | agentic-coding-setup | 2026-11-09

This is the durable handover for the current cross-platform workflow plugin work. Update **done**, **pending**, and **blocked** after each consequential action. Do not infer a passed host test from CI or a package upload. This note is part of draft PR #47, not a claim that it shipped.

## Done and independently checkable

- [x] GitHub repository renamed to `ogfrench/agentic-coding-setup`. Canonical GitHub repository is public, on `main`.
- [x] Rename migration PR #49 merged: installation URLs, central marketplace source, sync job guard, learning source and tests now reference canonical name. Preserve historical source names.
- [x] Security hardening PR #46 merged: copies reject malicious managed-item paths and symlinks.
- [x] Superseded rename PR #48 closed without merge. The existing migration on `main` already covers its functionality.
- [x] Approved reviewed-update policy implemented and merged in PR #50, commit `f9768f5cf976d155ed341c278d19a3917f5ef081`. The shared `ogfrench` marketplace disables `autoUpdate` and the copier migrates only the managed legacy entry. [Full CI pass](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42586502314).
- [x] Draft PR #47 contains the optional portable workflow plugin, four skills, both platform manifests, explicit Claude validation in CI, and documentation aligned with the rename and security changes. Version in source: `0.1.1`.
- [x] Private ChatGPT plugin created and updated to `0.1.1`; importer accepted the package. This proves package acceptance, **not** task success in all ChatGPT environments.
- [x] Preserved `.claude/claude-code-setup.json` and `chore/claude-code-setup` downstream PR branch identity for backwards compatibility.

## Pending or blocked

- [ ] **Integrate PR #47 with latest `main` without losing PR history or reverting security changes.** Branch currently diverged; GitHub reports not mergeable. Re-run exact-head CI after integration.
- [ ] Verify the new explicit portable Claude validation step in CI on the integrated commit.
- [ ] Clean-host Claude Code marketplace install, skill invocation, and uninstall test. Do not call this host-verified from static validation alone.
- [ ] Compare ChatGPT and Claude task outcomes with and without the plugin, including false skill activation and missing tool boundaries.
- [ ] Check higher-precedence local/managed settings and actual installed `autoUpdate` behavior. Existing downstream copies change only on separately reviewed sync.
- [ ] Review any downstream GitHub Actions `uses:` paths that reference the pre-rename repository; GitHub does not automatically redirect those references.
- [ ] Merge #47 only after host acceptance. Do not merge unrelated Dependabot #44 automatically.
- [ ] Run downstream synchronization only through separate reviewed PRs, no unattended auto-merge.

## Next steps

1. Integrate PR #47 against the current protected `main` and verify GitHub checks on the final SHA.
2. Review the exact diff for duplicated Claude skills, permission or network changes, privacy and source provenance.
3. Run independent Claude host acceptance and ChatGPT baseline tests.
4. Record host outcomes and rollback evidence in PR #47, then decide on merge and release separately.

## Scope guard

This optional companion does **not** install Claude hooks, agents, commands, personal settings, MCP servers, external marketplace dependencies, credentials or downstream repo sync. Keep `agent-workflow`, `presentation-craft` and `frog-writing` canonical. The repository rename and reviewed-update security fixes on `main` must survive every integration.

## Change log

- 2026-11-09: Scratchpad created after repo rename, merged security/update changes and portable v0.1.1 private import. Branch integration and host checks remain open.
