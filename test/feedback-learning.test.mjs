import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("feedback-driven learning is linked from the canonical skill and guarded", () => {
  const skill = read("plugins/agent-workflow/skills/learning-loop/SKILL.md");
  const reference = read("plugins/agent-workflow/skills/learning-loop/references/feedback-driven-improvement.md");
  assert.ok(skill.includes("references/feedback-driven-improvement.md"));
  for (const principle of [
    "Principles over rules", "Make feedback easy", "Benchmark real tasks",
    "Measure what matters", "Close the improvement loop"
  ]) assert.ok(reference.includes(principle), principle);
  for (const protection of ["untrusted data", "unchanged baseline", "human owner",
                            "no default scheduled improver", "false positives"])
    assert.ok(reference.includes(protection), protection);
});

test("feedback improvement evaluation cases cover positive, negative and ambiguous inputs", () => {
  for (const kind of ["positive", "negative", "ambiguous"]) {
    const root = `plugins/agent-workflow/evals/learning-feedback-${kind}`;
    const prompt = read(`${root}/prompt.md`);
    const grader = read(`${root}/graders/quality.md`);
    assert.match(prompt, /^---\nmax_turns: 8\nallowed_tools: \[Skill\]\n---\n/);
    assert.match(grader, /^---\ntype: llm\n---\n/);
    assert.ok(grader.includes("PASS if") && grader.includes("FAIL if"));
  }
});
