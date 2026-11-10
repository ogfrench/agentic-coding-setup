# Cross-host standards source release | 2026-11-10

**Merged source:** `claude-workflow 1.12.0` and `chatgpt-workflow-lite 1.12.0`, same source repo, different host capabilities. [PR #66](https://github.com/ogfrench/agentic-coding-setup/pull/66) was merged as `7f15f1fbdfcfb0d88b23315251c71e0bdd361f88`.

Changes: a generic cross-host capability/evidence standard; strengthened existing plugin-experience and portable routing boundaries; tests of source/version consistency. No new framework, bundled product assets, shared MCP server, automatic host installation or downstream sync.

## Release status

- **Documented / implemented:** `main` contains the standards, skill guidance, tests and manifest changes at 1.12.0.
- **Automated-tested:** passed [PR CI 42873903159](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42873903159) and [merged-main CI 42877971998](https://github.com/ogfrench/agentic-coding-setup/actions/runs/42877971998). This is source/packaging evidence, not authenticated installed-host proof.
- **Host-verified:** pending authenticated Claude, ChatGPT and local marketplace tests; no with/without routing score claimed.
- **Released:** not until exact-source review, CI, host acceptance/explicit waiver and separate authorized distribution.
- **Private installed ChatGPT plugin:** still independently versioned; GitHub version parity does not upgrade the installed `ogfrench-workflow` legacy instance.

## Checks and rollback

Run `node --test`, `node scripts/build-kb.mjs --check`, the public-content scanner, strict Claude plugin validation and isolated install/remove gates. The existing portable five-case evaluation remains the live-host acceptance definition; add a no-repository source task to the recorded negative/missing-access probes without pretending simulated text proves it. Leave downstream manifests, auto-update settings and installed caches untouched. Roll back to the last approved manifest/package and rerun the negative routing case if a new skill is overbroad.
