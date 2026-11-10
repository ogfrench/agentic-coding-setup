import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const get = (p) => readFileSync(resolve(root, p), "utf8");

test("portable host standards distinguish actual tools from instructions", () => {
  const standard = get("docs/host-capability-standards.md");
  for (const required of [
    "Canonical resources", "Execution", "Verification", "Host-verified",
    "Published tagged artifact", "untrusted data", "unrelated task",
    "already uploaded ChatGPT plugin",
  ]) assert.ok(standard.toLowerCase().includes(required.toLowerCase()), required);
  assert.doesNotMatch(standard, /universal runtime is required|auto-install to downstream/i);
});

test("existing experience skill owns the new host boundary without duplicating its route", () => {
  const skill = get("plugins/agent-workflow/skills/plugin-experience-design/SKILL.md");
  const lite = get("docs/portable-workflow-plugin.md");
  assert.match(skill, /canonical source/i);
  assert.match(skill, /absent tools|unavailable runtime/i);
  assert.match(lite, /selective routing/i);
  assert.match(lite, /host-verified/i);
});

test("Full and Lite source release versions match and legacy identity stays separate", () => {
  const full = JSON.parse(get("plugins/agent-workflow/.claude-plugin/plugin.json"));
  const lite = JSON.parse(get("portable/ogfrench-workflow/plugin.json"));
  const adapter = JSON.parse(get("portable/ogfrench-workflow/.claude-plugin/plugin.json"));
  assert.equal(full.version, "1.12.0");
  assert.equal(full.version, lite.version);
  assert.equal(lite.version, adapter.version);
  assert.equal(full.name, "claude-workflow");
  assert.equal(lite.name, "chatgpt-workflow-lite");
  assert.match(get("docs/releases/2026-11-10-cross-host-standards.md"), /not until exact-source review/i);
});
