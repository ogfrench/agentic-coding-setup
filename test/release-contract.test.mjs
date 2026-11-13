import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("CalVer release publishes only the integrated Claude workflow", () => {
  const claude = JSON.parse(read("plugins/agent-workflow/.claude-plugin/plugin.json"));
  const chatgpt = JSON.parse(read("portable/agentic-workflow/plugin.json"));
  assert.equal(claude.version, "2026.11.4");
  assert.equal(chatgpt.version, claude.version);
  assert.ok(claude.description.length > 0 && claude.description.length <= 500, "Claude upload description must be at most 500 characters");
  const wf = read(".github/workflows/release.yml");
  for (const phrase of ["workflow_dispatch:", "ACCEPTED_SHA", "GITHUB_SHA", "refs/heads/main", "gh release create", "SHA256SUMS.txt"])
    assert.ok(wf.includes(phrase), phrase);
  assert.doesNotMatch(wf, /presentation-craft/);
  assert.ok(wf.includes(".claude-plugin/plugin.json"), "Claude ZIP must contain root manifest");
  assert.ok(wf.includes("zipfile"), "release must verify the built archive");
  assert.ok(read("docs/releases/2026-11-13-agentic-workflow-rename.md").includes("2026.11.4"));
});

test("no plugin name is reserved for Anthropic's own plugins", () => {
  const reserved = /^(claude|anthropic|anthropics|cc-plugin)(-|$)|^claude-mods$/;
  const marketplace = JSON.parse(read(".claude-plugin/marketplace.json"));
  const manifests = [
    "plugins/agent-workflow/.claude-plugin/plugin.json",
    "plugins/frog-writing/.claude-plugin/plugin.json",
    "portable/ogfrench-workflow/.claude-plugin/plugin.json"
  ].map((path) => JSON.parse(read(path)).name);
  for (const name of [...marketplace.plugins.map((p) => p.name), ...manifests])
    assert.doesNotMatch(name, reserved, `${name} is reserved by Claude Code and is refused on upload`);
});
