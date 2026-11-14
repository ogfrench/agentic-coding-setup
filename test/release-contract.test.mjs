import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("CalVer release publishes only the integrated Claude workflow", () => {
  const claude = JSON.parse(read("plugins/agent-workflow/.claude-plugin/plugin.json"));
  const chatgpt = JSON.parse(read("portable/agentic-workflow/plugin.json"));
  assert.equal(claude.version, "2026.11.8");
  assert.equal(chatgpt.version, claude.version);
  assert.ok(claude.description.length > 0 && claude.description.length <= 500, "Claude upload description must be at most 500 characters");
  const wf = read(".github/workflows/release.yml");
  for (const phrase of ["workflow_dispatch:", "ACCEPTED_SHA", "GITHUB_SHA", "refs/heads/main", "gh release create", "SHA256SUMS.txt"])
    assert.ok(wf.includes(phrase), phrase);
  assert.doesNotMatch(wf, /presentation-craft/);
  assert.ok(wf.includes(".claude-plugin/plugin.json"), "Claude ZIP must contain root manifest");
  assert.ok(wf.includes("zipfile"), "release must verify the built archive");
  assert.ok(read("docs/releases/2026-11-14-assured-delivery.md").includes(claude.version), "Release notes must identify the candidate version");
  assert.ok(wf.includes("--notes-file docs/releases/2026-11-14-assured-delivery.md"), "Published notes must describe the accepted candidate, not an earlier version");
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
