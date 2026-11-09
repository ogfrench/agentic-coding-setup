# Portable workflow plugin | adversarial review | 2026-11-09

**Scope:** Draft PR [#47](https://github.com/ogfrench/agentic-coding-setup/pull/47), portable plugin v0.1.1, reviewed at commit `1a4a05a7c9b587c68298c8004922b3cbec762a67`. The assessment concerns what is implemented and observable, not promised future host behavior.

## Verified evidence

| Gate | Status | Evidence |
| --- | --- | --- |
| Canonical repository identity | Passed | `ogfrench/agentic-coding-setup`; inherited rename and security changes from `main` |
| Full Node / public-data / root-plugin checks | Passed | [CI run 42588593580](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42588593580) |
| Explicit strict Claude validation of the portable plugin | Passed | Same CI run; `plugin validate portable/ogfrench-workflow --strict` |
| Linux CLI install, list and uninstall | Passed | Same CI run, isolated `CLAUDE_CONFIG_DIR` |
| Portable package executable/symlink safety checks | Passed | `test/portable-workflow-plugin.test.mjs` on same CI run |
| ChatGPT private package import | Passed | Private v0.1.1 package accepted; root manifest and four skills independently compared against the PR source, exact text equality |
| Live Claude skill task evaluation | **Not run** | Requires an authenticated, supported Claude host |
| With/without skill evaluation in ChatGPT | **Not run** | Package import does not measure behavioral effectiveness |
| Windows/macOS runtime installation and task evaluation | **Not run** | Linux CI does not validate those operating systems |
| Deployment and downstream sync | **Not run** | Explicitly outside this PR |

## Findings and decisions

**R1 | Moderate | Unverified functional benefit.** The evaluation harness has one positive routing and quality case for each of four skills, plus a negative no-skill case. CI only parses fixtures and checks regex matching. Neither with-plugin nor without-plugin model behavior has been measured. **Decision:** Keep the PR draft and package private; run authenticated task-level evaluations before claiming release quality.

**R2 | Low to moderate | Host and scope differences.** The ChatGPT package contains portable skill instructions, not the Claude Code hooks, agents, MCP installation, local auth or project sync. The optional Claude marketplace entry does not enable installation in the personal setup or every downstream project. **Decision:** Keep the host capability matrix explicit and test each supported surface separately.

**R3 | Low | Distribution attack surface is intentionally narrow.** The portable source has two declarative manifests, four `SKILL.md` files, a README and non-executable evaluation files. The regression test fails on unexpected executable files and symlinks; no `hooks` or `mcpServers` are declared in either manifest. However, skill text is not an execution sandbox: it can still influence agents using tools granted by the host. **Decision:** No automatic install or unattended sync. Treat untrusted repository, issue and web contents as data, never trusted instructions.

**R4 | Operational | Existing setups and update precedence.** PR #50 on `main` disabled the shared marketplace's automatic updates and migrated legacy repo-owned settings. The optional companion plugin has no startup hook or forced update, but machine-specific/user-level settings and downstream copies have not been checked. **Decision:** Preserve existing manifests and require separately reviewed sync PRs; check effective settings on actual hosts.

**R5 | Low | Behavioral evals can overfit.** Their fictional prompts contain expected task attributes and evaluate broad correctness conditions. Routing and quality graders can miss subtle regressions. **Decision:** Use repeated runs and unrelated negative tasks, compare to no-plugin baseline, and record failure cases rather than reporting invented quality scores.

**R6 | Low | Local marketplace authentication policy.** The ChatGPT local marketplace entry uses the documented `AVAILABLE` / `ON_INSTALL` policy. It is a discoverability and authentication-timing policy, not evidence of a bundled external app or credentials. **Decision:** Keep the documented policy; report any unexpected host permission prompt during manual installation.

## Merge decision

**Not release-ready.** Static build, package provenance, and Linux CLI installation are verified; authenticated skill execution, comparative quality and cross-OS evidence are not. No material high-severity issue was identified in the examined package surface, but remaining acceptance steps cannot be silently waived.

## Host acceptance protocol

1. On a disposable Claude user configuration, install `ogfrench-workflow@ogfrench` from the correct feature or reviewed release source. Record exact CLI version, OS, install/list/uninstall output and permissions.
2. Execute the four positive cases in `portable/ogfrench-workflow/evals/`, then the negative routing case. Use the documented `claude plugin eval` command on an authenticated host, compare with a no-plugin arm, and record actual task-level results and costs.
3. In ChatGPT, test activation and task quality against a no-plugin baseline. Verify that the skills refuse invented repository access and visual proof.
4. Confirm any supported Windows and macOS environments separately, or clearly restrict declared support.
5. Keep private prompts, credentials and evaluation logs outside this public repository. Update [the working scratchpad](WORK-IN-PROGRESS.md) and PR #47 with actual evidence and a clear release or waiver decision.

Rollback is uninstall of the optional plugin. No downstream state is supposed to change merely by installing this companion.
