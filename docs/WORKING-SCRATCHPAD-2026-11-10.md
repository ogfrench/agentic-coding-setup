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
