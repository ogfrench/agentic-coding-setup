# Working scratchpad | Agentic Coding #66 | 2026-11-10

Track source changes and verified evidence separately. This is a candidate, not a delivered plugin.

## Scope
- Base: `f1ecc1b59596e164f8810bdf19caf32b7f076327`.
- Candidate paired packages: **claude-workflow 1.12.0** and **chatgpt-workflow-lite 1.12.0**.
- Added `docs/host-capability-standards.md` and release decision record; extended existing plugin-experience skill, acceptance documentation, and source/host tests.
- No new installer, MCP, framework, private domain assets, downstream sync or automatic plugin upgrade.

## CI timeline and root cause
- Run https://github.com/ogfrench/agentic-coding-setup/actions/runs/42870092655 failed 2 tests (skill exceeded 1500-token budget; exact text assertion).
- Fix commit `57a25544c0d6a9fba27b76e9509f958ad1ff9376`; rerun https://github.com/ogfrench/agentic-coding-setup/actions/runs/42870250154 failed only the token budget (~1588/1500). Remaining 62 tests passed.
- Need to reduce `plugins/agent-workflow/skills/plugin-experience-design/SKILL.md` beneath budget without weakening the capability standard, which can live in a linked reference. Rerun exact-head CI.
- No authenticated ChatGPT/Claude task evaluation or installed-cache update performed.

## Adversarial checks
- Plugin skill routing must stay selective, including unrelated-task and missing-repository negative tests.
- Generic standards must not be duplicated across products or leak client information into the public shared repo.
- Host installing, reading a manifest, tool permission and actual artifact verification are separate claims.
- Both manifest versions must match; legacy private installed plugin must stay untouched.
- Check generated knowledge graph and public scanner for drift.

## Release blockers
Exact-head static CI and documented authentic host acceptance/waivers. No GitHub release/tag or private plugin upload and no automatic downstream synchronization.

## Adversarial disposition update | greenfield

Owner confirmed **no existing users**. Do not impose old-user migrations, backward-compatible installed identities, or preservation of legacy plugin behavior as requirements. Keep only product correctness, package identity consistency where currently configured, protected-data boundaries, and current host/CI/release verification. The separately installed private ChatGPT plugin does not auto-update from GitHub; this is a distribution fact, not a backward-compatibility gate. Candidate packages `1.12.0` are source changes until actually installed/released.

## Adversarial review: routing and installation (2026-11-10)

**Verdict: source candidate acceptable, host-release claim not established.** Exact-head check `1dce66f83aae707f1887c5ff26665f10eadede96` completed successfully: https://github.com/ogfrench/agentic-coding-setup/actions/runs/42870712262. Earlier budget and exact-text test failures were fixed; the existing `plugin-experience-design` skill remains below its configured context budget.

**High residual risk: new tests assert text and version parity, not real agent behavior.** `test/host-capability-standards.test.mjs` can establish basic source/manifest consistency, but cannot prove that the intended ChatGPT/Claude host selectively invokes skills, abstains when source access is missing, or refreshes installed plugin caches. Run the established positive, negative and unrelated-task fixtures with/without plugin in the actual intended hosts; record source SHA, package identity, installed version and tool traces.

**Greenfield interpretation:** No legacy-user migration or backward-compatible private-plugin rename is required. However, source package `chatgpt-workflow-lite 1.12.0` does not automatically become an installed ChatGPT plugin; distinct publication/installation must occur before claiming availability. The existing legacy personal plugin may remain untouched without being a launch blocker.

**Release gate:** Pair manifest versions `1.12.0` are in reviewed source; no release artifact, installed-host proof or downstream sync was created by this review. Preserve no-private-assets rule, keep product-specific skills outside the generic bundle, and require explicit accepted release SHA/host evidence or documented bounded launch waiver.
