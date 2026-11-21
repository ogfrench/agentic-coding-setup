import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("CalVer release publishes both validated plugin editions", () => {
  const claude = JSON.parse(read("plugins/agent-workflow/.claude-plugin/plugin.json"));
  const chatgpt = JSON.parse(read("portable/agentic-workflow/plugin.json"));
  assert.equal(claude.version, "2026.12.1");
  assert.equal(chatgpt.version, claude.version);
  assert.ok(claude.description.length > 0 && claude.description.length <= 500, "Claude upload description must be at most 500 characters");
  const wf = read(".github/workflows/release.yml");
  for (const phrase of ["workflow_dispatch:", "ACCEPTED_SHA", "GITHUB_SHA", "refs/heads/main", "gh release create", "SHA256SUMS.txt"])
    assert.ok(wf.includes(phrase), phrase);
  assert.doesNotMatch(wf, /presentation-craft/);
  assert.ok(wf.includes(".claude-plugin/plugin.json"), "Claude ZIP must contain root manifest");
  assert.ok(wf.includes("zipfile"), "release must verify the built archive");
  assert.ok(read(`docs/releases/${claude.version}.md`).includes(claude.version), "Release notes must identify the candidate version");
  assert.ok(wf.includes('--notes-file "$RUNNER_TEMP/release-notes.md"'), "Published notes must describe the exact candidate and acceptance status");
  assert.ok(wf.includes('dist/agentic-workflow-claude-v*.zip'), "Release must attach the Claude edition");
  assert.ok(wf.includes('dist/agentic-workflow-chatgpt-v*.zip'), "Release must attach the ChatGPT edition");
  assert.ok(wf.includes('sha256sum agentic-workflow-chatgpt-v*.zip >> SHA256SUMS.txt'), "ChatGPT archive must be in published checksums");
  assert.ok(wf.includes('verify_archive(path)'), "Validate ChatGPT archive against source");
  assert.doesNotMatch(wf, /acceptance_waiver|ACCEPTANCE_WAIVER/, "Do not require boilerplate host-acceptance waivers");
  assert.doesNotMatch(wf, /Keep ChatGPT package private for explicitly reviewed installation/, "Release must not hide distributable ZIP in a temporary artifact");
});

test("CI candidate labels do not drift from the versioned archives", () => {
  const wf = read(".github/workflows/check.yml");
  assert.match(wf, /name: agentic-workflow-claude-candidate\b/);
  assert.match(wf, /name: agentic-workflow-chatgpt-candidate\b/);
  assert.ok(wf.includes('f"agentic-workflow-claude-v{version}.zip"'));
  assert.doesNotMatch(wf, /name: agentic-workflow-claude-v\d{4}\.\d{1,2}\.\d+-candidate/);
});

test("ChatGPT portable installation guides match the canonical package", () => {
  const version = JSON.parse(read("portable/agentic-workflow/plugin.json")).version;
  const readme = read("portable/agentic-workflow/README.md");
  const guide = read("docs/agentic-workflow-chatgpt.md");
  assert.ok(readme.includes(`Full portable edition, v${version}`));
  assert.ok(readme.includes("24 source-owned"));
  assert.ok(readme.includes("all 28 skills"));
  assert.ok(guide.includes('`agentic-workflow` v' + version + ' is the'));
  assert.ok(guide.includes("**28 skills**"));
  assert.ok(guide.includes("inventory (28 skills)"));
  assert.ok(guide.includes(`dist/agentic-workflow-chatgpt-v${version}.zip`));
  assert.ok(guide.includes("release-readiness"));
});

test("maintainer guide matches the distributed skill inventories and marketplace version", () => {
  const guide = read("docs/maintainers-guide.md");
  const marketplace = read(".claude-plugin/marketplace.json");
  const version = JSON.parse(read("plugins/agent-workflow/.claude-plugin/plugin.json")).version;
  assert.ok(guide.includes("Full 24-skill engineering"));
  assert.ok(guide.includes("Full 28-skill ChatGPT"));
  assert.ok(guide.includes("Full 28-skill"));
  assert.ok(marketplace.includes(`Agentic Workflow v${version}: 24 Claude skills`));
});

test("no plugin name is reserved for Anthropic's own plugins", () => {
  const reserved = /^(claude|anthropic|anthropics|cc-plugin)(-|$)|^claude-mods$/;
  const marketplace = JSON.parse(read(".claude-plugin/marketplace.json"));
  const manifests = [
    "plugins/agent-workflow/.claude-plugin/plugin.json",
    "portable/ogfrench-workflow/.claude-plugin/plugin.json"
  ].map((path) => JSON.parse(read(path)).name);
  for (const name of [...marketplace.plugins.map((p) => p.name), ...manifests])
    assert.doesNotMatch(name, reserved, `${name} is reserved by Claude Code and is refused on upload`);
});

test("writing is provided by Agentic Workflow without legacy marketplace plugins", () => {
  const market = JSON.parse(read(".claude-plugin/marketplace.json"));
  assert.ok(market.plugins.some((p) => p.name === "agentic-workflow"));
  assert.ok(!market.plugins.some((p) => ["frog-writing", "chatgpt-workflow-lite"].includes(p.name)));
  for (const name of ["frogify", "deslopify", "humanizer"])
    assert.ok(read(`plugins/agent-workflow/skills/${name}/SKILL.md`).startsWith(`---\nname: ${name}\n`));
  assert.match(read("plugins/agent-workflow/skills/humanizer/LICENSE"), /MIT License/);
});

test("release-readiness requires asset-to-publisher closure, not just green CI", () => {
  const skill = read("plugins/agent-workflow/skills/release-readiness/SKILL.md");
  for (const phrase of ["Release-asset closure (mandatory)", "delivery inventory",
                        "notes-only release", "fail if required files or checksums",
                        "stale version/commit, bad checksum",
                        "download and", "incomplete", "privacy scope"])
    assert.ok(skill.includes(phrase), `Missing release guard: ${phrase}`);
  assert.match(skill, /upload-artifact.*not.*GitHub Release asset/);
  assert.match(skill, /publication does not update accounts/);
});