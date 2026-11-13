import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL("../" + file, import.meta.url), "utf8");

test("workflow releases match full edition and independently bumped specialist", () => {
  const claude = JSON.parse(read("plugins/agent-workflow/.claude-plugin/plugin.json"));
  const chatgpt = JSON.parse(read("portable/agentic-workflow/plugin.json"));
  const specialist = JSON.parse(read("plugins/presentation-craft/.claude-plugin/plugin.json"));
  assert.equal(claude.version, "2026.11.2");
  assert.equal(chatgpt.version, claude.version);
  assert.equal(specialist.version, "0.3.1");
  const workflow = read(".github/workflows/release.yml");
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /ACCEPTED_SHA/);
  assert.match(workflow, /GITHUB_SHA/);
  assert.match(workflow, /refs\/heads\/main/);
  assert.match(workflow, /gh release create/);
  assert.match(workflow, /SHA256SUMS.txt/);
  assert.doesNotMatch(workflow, /gh release create[^\n]*chatgpt/);
});
