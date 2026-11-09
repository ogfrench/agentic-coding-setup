import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..", "portable/ogfrench-workflow");
const read = (path) => readFileSync(resolve(root, path), "utf8");

test("portable and Claude manifests have one stable identity", () => {
  const portable = JSON.parse(read("plugin.json"));
  const claude = JSON.parse(read(".claude-plugin/plugin.json"));
  assert.equal(portable.name, "ogfrench-workflow");
  assert.equal(claude.name, portable.name);
  assert.equal(claude.version, portable.version);
  assert.match(portable.$schema, /agent-plugins\.org/);
  assert.ok(portable.description && claude.description);
  assert.equal(portable.mcpServers, undefined);
  assert.equal(portable.extensions?.["com.openai"]?.hooks, undefined);
});

test("all portable skills have unique names and clear routing metadata", () => {
  const names = readdirSync(resolve(root, "skills"));
  assert.deepEqual(names.sort(), [
    "adversarial-review", "implementation-proof", "release-handover", "setup-audit"
  ]);
  const found = new Set();
  for (const name of names) {
    const file = resolve(root, "skills", name, "SKILL.md");
    assert.ok(existsSync(file));
    const content = readFileSync(file, "utf8");
    assert.match(content, /^---\nname: [a-z-]+\ndescription: .+\n---\n/);
    const declared = content.match(/^name: (.+)$/m)?.[1];
    assert.equal(declared, name);
    assert.ok(!found.has(declared));
    found.add(declared);
    assert.ok(content.length > 350);
  }
});

test("local ChatGPT marketplace targets the exact portable plugin", () => {
  const marketplace = JSON.parse(readFileSync(resolve(root, "../../.agents/plugins/marketplace.json"), "utf8"));
  const item = marketplace.plugins.find((p) => p.name === "ogfrench-workflow");
  assert.equal(item.source.path, "./portable/ogfrench-workflow");
  assert.equal(item.policy.installation, "AVAILABLE");
  assert.equal(item.source.source, "local");
});

test("portable evaluation fixtures cover all skills and one unrelated request", () => {
  const cases = readdirSync(resolve(root, "evals"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  assert.deepEqual(cases.sort(), [
    "actual-ui-proof", "adversarial-copy", "release-claims", "setup-boundaries", "unrelated-task"
  ]);
  const routes = new Map([
    ["actual-ui-proof", "implementation-proof"],
    ["adversarial-copy", "adversarial-review"],
    ["release-claims", "release-handover"],
    ["setup-boundaries", "setup-audit"]
  ]);
  for (const name of cases) {
    const prompt = read(`evals/${name}/prompt.md`);
    assert.match(prompt, /^---\nmax_turns: [1-9]/);
    assert.match(prompt, /allowed_tools: \[Skill\]/);
    if (routes.has(name)) {
      assert.match(read(`evals/${name}/graders/quality.md`), /PASS[\s\S]*FAIL/);
      assert.ok(read(`evals/${name}/graders/skill-used.md`).includes(routes.get(name)));
    } else {
      assert.match(read(`evals/${name}/graders/no-skill.md`), /min: 0\nmax: 0/);
    }
  }
});
