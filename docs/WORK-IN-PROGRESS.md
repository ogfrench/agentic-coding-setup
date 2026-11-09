# Working scratchpad | agentic-coding-setup | 2026-11-09

This is the durable handover for the current cross-platform workflow plugin work. Update **done**, **pending**, and **blocked** after each consequential action. Do not infer a passed host test from CI or a package upload. This note is part of draft PR #47, not a claim that it shipped.

## Done and independently checkable

- [x] GitHub repository renamed to `ogfrench/agentic-coding-setup`. Canonical GitHub repository is public, on `main`.
- [x] Rename migration PR #49 merged: installation URLs, central marketplace source, sync job guard, learning source and tests now reference canonical name. Preserve historical source names.
- [x] Security hardening PR #46 merged: copies reject malicious managed-item paths and symlinks.
- [x] Superseded rename PR #48 closed without merge. The existing migration on `main` already covers its functionality.
- [x] Approved reviewed-update policy implemented and merged in PR #50, commit `f9768f5cf976d155ed341c278d19a3917f5ef081`. The shared `ogfrench` marketplace disables `autoUpdate` and the copier migrates only the managed legacy entry. [Full CI pass](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42586502314).
- [x] Draft PR #47 contains the optional portable workflow plugin, four skills, both platform manifests, explicit Claude validation in CI, and documentation aligned with the rename and security changes. Version in source: `0.1.1`.
- [x] Private ChatGPT plugin created and updated to `0.1.1`; importer accepted the package. Local ZIP inspected: exactly one v0.1.1 manifest, four skills, one README, and canonical repo URL. This proves package acceptance, **not** task success in all ChatGPT environments.
- [x] Preserved `.claude/claude-code-setup.json` and `chore/claude-code-setup` downstream PR branch identity for backwards compatibility.

## Pending or blocked

- [x] **Integrated PR #47 with secured `main` without dropping branch history or reverting security changes.** Merge commit `420af45b0b65cc7ebd617192b3d30e90db3de7af` includes `main` `f9768f5cf976d155ed341c278d19a3917f5ef081`; compare result: ahead with zero commits behind.
- [x] Verified explicit portable Claude validation on integration commit: [check run 42587490803](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42587490803) completed successfully. Also passed Node tests, public-tree/commit checks, root and local Claude plugin validation, and empty-repo apply dry run.
- [x] **Claude CLI install/uninstall smoke on isolated Linux CI config:** [run 42587762393](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42587762393), commit `5f08b4c1a35dac04e4b35ff33f6ebb3c4441aa93`: marketplace added locally, portable plugin installed, listed, and uninstalled with no permanent host settings. **This is not authenticated Claude skill invocation**.
- [ ] Authenticated Claude skill invocation and uninstall in supported real desktop/cloud host, plus Windows/macOS coverage. Do not treat CLI installation as behavioral proof.
- [ ] Compare ChatGPT and Claude task outcomes with and without the plugin, including false skill activation and missing tool boundaries.
- [ ] Validate installed package behavior on Windows and macOS, or explicitly document and accept platform limitations.
- [ ] Check higher-precedence local/managed settings and actual installed `autoUpdate` behavior. Existing downstream copies change only on separately reviewed sync.
- [ ] Review any downstream GitHub Actions `uses:` paths that reference the pre-rename repository; GitHub does not automatically redirect those references.
- [ ] Merge #47 only after host acceptance. Do not merge unrelated Dependabot #44 automatically.
- [ ] Run downstream synchronization only through separate reviewed PRs, no unattended auto-merge.

## Next steps

1. Independently review the current PR #47 exact diff for duplicate skill routing, privacy, permissions, and source provenance.
2. Run a representative authenticated Claude skill task with and without the plugin on a real supported host. Installation and uninstallation already passed isolated Linux CI.
3. Run ChatGPT routing and task-quality checks against a no-plugin baseline; the private package import alone is not proof of quality.
4. Record host outcomes and rollback evidence in PR #47, then decide on merge and release separately.

## Scope guard

This optional companion does **not** install Claude hooks, agents, commands, personal settings, MCP servers, external marketplace dependencies, credentials or downstream repo sync. Keep `agent-workflow`, `presentation-craft` and `frog-writing` canonical. The repository rename and reviewed-update security fixes on `main` must survive every integration.

## Change log

- 2026-11-09: Scratchpad created after repo rename, merged security/update changes and portable v0.1.1 private import.
- 2026-11-09: Integrated secured `main` into PR #47 using merge commit `420af45b...`; [CI run 42587490803](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42587490803) fully green including the explicit portable Claude plugin validator. Private v0.1.1 ZIP inspected; Linux CLI install/uninstall smoke passed on CI; authenticated behavioral host acceptance remains pending.

- 2026-11-09: Added isolated CLI install/list/uninstall test in check.yml. [CI run 42587762393](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42587762393) green. No authenticated behavior tested.
