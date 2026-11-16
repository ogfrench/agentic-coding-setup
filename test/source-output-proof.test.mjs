import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const root = new URL("../", import.meta.url);
const skill = (name) => readFileSync(new URL(`plugins/agent-workflow/skills/${name}/SKILL.md`, root), "utf8");

test("source-derived outputs have traceability, parity and preservation", () => {
  const delivery = skill("delivery-loop");
  const strategy = skill("test-strategy");
  const continuity = skill("session-continuity");
  assert.match(delivery, /authoritative input, transformation code and output/);
  assert.match(delivery, /last accepted artifact/);
  assert.match(strategy, /both\s+directions/);
  assert.match(strategy, /unsupported or stale output/);
  assert.match(strategy, /real consumer behavior/);
  assert.match(continuity, /Derived artifacts/);
  assert.match(continuity, /last accepted version/);
});

test("delegation and learning promotion remain source-grounded", () => {
  const delegation = skill("model-delegation");
  const learning = skill("learning-loop");
  assert.match(delegation, /main\s+agent runs shared generation and acceptance checks/);
  assert.match(delegation, /source\s+omissions or conflicts/);
  assert.match(learning, /Abstract before promoting/);
  assert.match(learning, /Extend an existing\s+owning skill/);
});

test("no domain-specific presentation pipeline was added", () => {
  assert.equal(existsSync(new URL("plugins/agent-workflow/skills/slide-deck-html-pipeline/SKILL.md", root)), false);
});
