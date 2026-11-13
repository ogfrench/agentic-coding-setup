import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const skill = (path) => read("plugins/agent-workflow/skills/" + path);

test("presentation authoring honors specialist products and their exports", () => {
  const instructions = skill("presentation-design/SKILL.md");
  assert.match(instructions, /## Specialist authoring precedence/);
  assert.match(instructions, /explicitly names a presentation product/);
  assert.match(instructions, /frogViz/);
  assert.match(instructions, /must not silently replace the specialist pipeline/);
  assert.match(instructions, /Verify the HTML and each exported format separately/);
});
test("design adaptation does not substitute specialist provenance", () => {
  const instructions = skill("design-system-adapter/SKILL.md");
  assert.match(instructions, /adapting its color tokens/);
  assert.match(instructions, /not equivalent to using that engine/);
  assert.match(instructions, /disclose the limitation/);
});
test("no duplicate presentation plugin and no lost visual review", () => {
  const market = JSON.parse(read(".claude-plugin/marketplace.json"));
  assert.ok(!market.plugins.some(p => p.name === "presentation-craft"));
  assert.match(skill("presentation-story/SKILL.md"), /evidence/);
  assert.match(skill("visual-loop/SKILL.md"), /## Visual restraint and editorial quality/);
  assert.match(skill("visual-loop/references/visual-restraint.md"), /Twenty common visual cues/);
  const code = read("scripts/package_agentic_workflow_chatgpt.py");
  for (const name of ["presentation-story", "presentation-design", "design-system-adapter"])
    assert.ok(code.includes('"' + name + '"'));
});
