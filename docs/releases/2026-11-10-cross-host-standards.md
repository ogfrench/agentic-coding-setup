# Cross-host standards source release | 2026-11-10

**Source candidates:** `claude-workflow 1.12.0` and `chatgpt-workflow-lite 1.12.0`, same source repo, different host capabilities.

Changes: a generic cross-host capability/evidence standard; strengthened existing plugin-experience and portable routing boundaries; tests of source/version consistency. No new framework, bundled product assets, shared MCP server, automatic host installation or downstream sync.

## Release status

- **Documented / implemented:** GitHub PR branch contains the standard, skill guidance and manifest changes.
- **Automated-tested:** pending exact-head CI. An assertion in source is not evidence it ran.
- **Host-verified:** pending authenticated Claude, ChatGPT and local marketplace tests; no with/without routing score claimed.
- **Released:** not until exact-source review, CI, host acceptance/explicit waiver and separate authorized distribution.
- **Private installed ChatGPT plugin:** still independently versioned; GitHub version parity does not upgrade the installed `ogfrench-workflow` legacy instance.

## Checks and rollback

Run `node --test`, `node scripts/build-kb.mjs --check`, the public-content scanner, strict Claude plugin validation and isolated install/remove gates. The existing portable five-case evaluation remains the live-host acceptance definition; add a no-repository source task to the recorded negative/missing-access probes without pretending simulated text proves it. Leave downstream manifests, auto-update settings and installed caches untouched. Roll back to the last approved manifest/package and rerun the negative routing case if a new skill is overbroad.
