# Working scratchpad | agentic-coding-setup | 2026-11-09

This is the durable handover for the current cross-platform workflow plugin work. Update **done**, **pending**, and **blocked** after each consequential action. Do not infer a passed host test from CI or a package upload. This note is part of draft PR #47, not a claim that it shipped.

## Done and independently checkable

- [x] GitHub repository renamed to `ogfrench/agentic-coding-setup`. Canonical GitHub repository is public, on `main`.
- [x] Rename migration PR #49 merged: installation URLs, central marketplace source, sync job guard, learning source and tests now reference canonical name. Preserve historical source names.
- [x] Security hardening PR #46 merged: copies reject malicious managed-item paths and symlinks.
- [x] Superseded rename PR #48 closed without merge. The existing migration on `main` already covers its functionality.
- [x] Approved reviewed-update policy implemented and merged in PR #50, commit `f9768f5cf976d155ed341c278d19a3917f5ef081`. The shared `ogfrench` marketplace disables `autoUpdate` and the copier migrates only the managed legacy entry. [Full CI pass](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42586502314).
- [x] Draft PR #47 contains the optional portable workflow plugin, four skills, both platform manifests, explicit Claude validation in CI, and documentation aligned with the rename and security changes. Version in source: `0.1.1`.
- [x] Private ChatGPT plugin created and updated to `0.1.1`; importer accepted the package. Private plugin file inventory verified: root v0.1.1 manifest, four skill files, README and generated Codex metadata, with canonical repo URL. This proves package acceptance, **not** task success in all ChatGPT environments.
- [x] Preserved `.claude/claude-code-setup.json` and `chore/claude-code-setup` downstream PR branch identity for backwards compatibility.

- [x] **Integrated PR #47 with secured `main` without dropping branch history or reverting security changes.** Merge commit `420af45b0b65cc7ebd617192b3d30e90db3de7af` includes `main` `f9768f5cf976d155ed341c278d19a3917f5ef081`; compare result: ahead with zero commits behind.
- [x] Verified explicit portable Claude validation on integration commit: [check run 42587490803](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42587490803) completed successfully. Also passed Node tests, public-tree/commit checks, root and local Claude plugin validation, and empty-repo apply dry run.
- [x] **Claude CLI install/uninstall smoke on isolated Linux CI config:** [run 42587762393](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42587762393), commit `5f08b4c1a35dac04e4b35ff33f6ebb3c4441aa93`: marketplace added locally, portable plugin installed, listed, and uninstalled with no permanent host settings. **This is not authenticated Claude skill invocation**.

- [x] Added four positive and one negative behavioral evaluation fixture under `portable/ogfrench-workflow/evals/`; grader regexes compile and match canonical names. [CI run 42588276794](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42588276794) passed. This is structural validation, not model scoring.
- [x] Added safety regression tests for undeclared executables, symlinks, manifest hooks/MCP declarations and isolated install CI. [CI run 42588593580](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42588593580) passed on commit `1a4a05a7c9b587c68298c8004922b3cbec762a67`.
- [x] Verified private ChatGPT v0.1.1 release manifest and the four skill files match the PR source byte for byte, through the plugin owner file API and GitHub reads. Package remains private; no public release.
- [x] Completed source-grounded [portable plugin review](portable-workflow-adversarial-review-2026-11-09.md). No high-severity finding in the package surface; authenticated behavior remains untested.

- [x] User-facing [portable plugin README](../portable/ogfrench-workflow/README.md) now has distinct, actionable Claude Code, private ChatGPT and local desktop/Codex installation paths, plus uninstall and limits. [Host contract](portable-workflow-plugin.md) now documents version/source update boundaries, plugin overlap, troubleshooting, rollback and acceptance evidence. No runtime code changed.

- [x] Reconciled installation documentation with current OpenAI plugin guidance. Local marketplace installations use a cache, so checkout changes need an explicit refresh/reinstall and a new-chat check; private uploaded releases have an independent update path. Added [release acceptance record](portable-workflow-acceptance.md) with host-by-host evidence, test outcomes, rollback and explicit PASS/FAIL/BLOCKED/WAIVED decisions. Consolidated repeated host documentation. No code or release behavior changed.

- [x] Completed developer handover at [PORTABLE-WORKFLOW-HANDOVER-2026-11-09.md](PORTABLE-WORKFLOW-HANDOVER-2026-11-09.md) with repo inventory, evidence boundaries, host execution order and rollback.
- [x] Added optional Codex marketplace registration command and made cached installed-copy refresh a separate acceptance gate. This is documentation, **not** an executed Codex host test.

## Pending or blocked

- [ ] Authenticated Claude skill invocation and uninstall in supported real desktop/cloud host, plus Windows/macOS coverage. Do not treat CLI installation as behavioral proof.
- [ ] Compare ChatGPT and Claude task outcomes with and without the plugin, including false skill activation and missing tool boundaries.
- [ ] Validate installed package behavior on Windows and macOS, or explicitly document and accept platform limitations.
- [ ] Check higher-precedence local/managed settings and actual installed `autoUpdate` behavior. Existing downstream copies change only on separately reviewed sync.
- [ ] Review any downstream GitHub Actions `uses:` paths that reference the pre-rename repository; GitHub does not automatically redirect those references.
- [ ] Merge #47 only after host acceptance. Do not merge unrelated Dependabot #44 automatically.
- [ ] Run downstream synchronization only through separate reviewed PRs, no unattended auto-merge.

## Next steps

1. Run the authenticated Claude skill evaluations on an authorized host, with and without the plugin, and capture actual scores and environment details. Linux CI has already validated installation/removal.
2. Run ChatGPT task-level routing and no-plugin baseline evaluations; package import and source parity alone do not measure benefit.
3. Validate Windows/macOS compatibility or explicitly accept limited support. Confirm local/managed marketplace settings precedence before any downstream sync.
4. Confirm the final PR head is green, update release evidence, then separately decide whether to merge and distribute the optional companion.

## Scope guard

This optional companion does **not** install Claude hooks, agents, commands, personal settings, MCP servers, external marketplace dependencies, credentials or downstream repo sync. Keep `agent-workflow`, `presentation-craft` and `frog-writing` canonical. The repository rename and reviewed-update security fixes on `main` must survive every integration.

## Change log

- 2026-11-09: Scratchpad created after repo rename, merged security/update changes and portable v0.1.1 private import.
- 2026-11-09: Integrated secured `main` into PR #47 using merge commit `420af45b...`; [CI run 42587490803](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42587490803) fully green including the explicit portable Claude plugin validator. Private v0.1.1 ZIP inspected; Linux CLI install/uninstall smoke passed on CI; authenticated behavioral host acceptance remains pending.

- 2026-11-09: Added isolated CLI install/list/uninstall test in check.yml. [CI run 42587762393](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42587762393) green. No authenticated behavior tested.

- 2026-11-09: Added four positive and one negative evaluation case, fixed regex matching, and verified [CI 42588276794](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42588276794).
- 2026-11-09: Added executable/symlink/manifest security checks. [CI 42588593580](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42588593580) passed. Private ChatGPT v0.1.1 source parity independently checked. Added [adversarial review](portable-workflow-adversarial-review-2026-11-09.md); behavioral host tests still pending.

- 2026-11-09: Documentation release-readiness audit identified unclear first-install instructions, private plugin versus local marketplace ambiguity and missing upgrade/troubleshooting details. Updated portable README and host contract. Documentation change and scratchpad recheck [CI run 42589583291](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42589583291) passed on commit `fe46fffd576ca403355c86bab878df15c9a6794d`.

- 2026-11-09: Documentation improvement pass: separated local marketplace cache refresh from private uploaded plugin updates, added [release acceptance template](portable-workflow-acceptance.md), removed duplicated installation guidance and linked docs from the root and plugin READMEs. [CI run 42590483034](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42590483034) passed on documentation commit `71001da3e1ac369ce13c0e1cde747d99e49c2116`. Live model behavior remains untested.
