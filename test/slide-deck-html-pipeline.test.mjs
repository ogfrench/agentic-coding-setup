import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const base = "plugins/agent-workflow/skills/slide-deck-html-pipeline/";

test("PPT HTML pipeline preserves specialist authority and evidence gates", () => {
  const skill = read(base + "SKILL.md");
  assert.match(skill, /^---\nname: slide-deck-html-pipeline\n/);
  for (const term of ["canonical PPT", "both", "previous accepted final", "real browser", "specialist", "workers"]) {
    assert.ok(skill.toLowerCase().includes(term.toLowerCase()), term);
  }
  assert.match(read(base + "references/project-contract.md"), /Exception record/);
  assert.match(read(base + "references/acceptance.md"), /PPT backup/);
});

test("pipeline routing evaluation includes trigger, edge case and non-trigger", () => {
  const root = "plugins/agent-workflow/evals/";
  for (const name of ["ppt-html-source-change", "ppt-html-approved-exception"]) {
    assert.match(read(root + name + "/graders/quality.md"), /PASS[\s\S]*FAIL/);
    assert.match(read(root + name + "/graders/skill-used.md"), /slide-deck-html-pipeline/);
  }
  assert.match(read(root + "ppt-html-negative/graders/no-pipeline.md"), /min: 0\nmax: 0/);
});
