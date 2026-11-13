import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const skill = (path) => readFileSync(new URL("../plugins/presentation-craft/skills/" + path, import.meta.url), "utf8");

test("brand-neutral slide authoring defers to a named specialist's actual pipeline", () => {
  const instructions = skill("presentation-design/SKILL.md");
  assert.match(instructions, /## Specialist authoring precedence/);
  assert.match(instructions, /explicitly names a presentation product/);
  assert.match(instructions, /frogViz/);
  assert.match(instructions, /must not silently replace the specialist pipeline/);
  assert.match(instructions, /Verify the HTML and each exported format separately/);
});

test("design system adaptation cannot be used as fake provenance", () => {
  const instructions = skill("design-system-adapter/SKILL.md");
  assert.match(instructions, /adapting its color tokens/);
  assert.match(instructions, /not equivalent to using that engine/);
  assert.match(instructions, /disclose the limitation/);
});
