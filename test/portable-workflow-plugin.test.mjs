import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..", "portable/ogfrench-workflow");
const read = (path) => readFileSync(resolve(root, path), "utf8");

test("portable and Claude manifests have one stable identity", () => {
  const portable = JSON.parse(read("plugin.json"));
  const claude = JSON.parse(read(".claude-plugin/plugin.json"));
  assert.equal(portable.name, "chatgpt-workflow-lite");
  assert.equal(claude.name, portable.name);
  assert.equal(claude.version, portable.version);
  assert.match(portable.$schema, /agent-plugins\.org/);
  assert.ok(portable.description && claude.description);
  assert.equal(portable.repository, "https://github.com/ogfrench/agentic-coding-setup");
  assert.equal(portable.mcpServers, undefined);
  assert.equal(portable.hooks, undefined);
  assert.equal(claude.mcpServers, undefined);
  assert.equal(claude.hooks, undefined);
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
  const item = marketplace.plugins.find((p) => p.name === "chatgpt-workflow-lite");
  assert.equal(item.source.path, "./portable/ogfrench-workflow");
  assert.equal(item.policy.installation, "AVAILABLE");
  assert.equal(item.source.source, "local");
});

test("the documented Claude install and invocation use the packaged identity", () => {
  const { name } = JSON.parse(read(".claude-plugin/plugin.json"));
  const instructions = read("README.md");
  const acceptance = readFileSync(resolve(root, "../../docs/portable-workflow-acceptance.md"), "utf8");
  assert.ok(instructions.includes(`claude plugin install ${name}@ogfrench --scope user`));
  assert.ok(instructions.includes(`/${name}:adversarial-review`));
  assert.ok(acceptance.includes(`install \`${name}@ogfrench\``));
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
      const grader = read(`evals/${name}/graders/skill-used.md`);
      assert.ok(grader.includes(routes.get(name)));
      const pattern = grader.match(/^input_match: '(.*)'$/m)?.[1];
      assert.ok(pattern);
      assert.match(`{"skill":"chatgpt-workflow-lite:${routes.get(name)}"}`, new RegExp(pattern));
    } else {
      assert.match(read(`evals/${name}/graders/no-skill.md`), /min: 0\nmax: 0/);
    }
  }
});

test("portable plugin has no undeclared executable files or symlinked content", () => {
  function walk(dir, prefix = "") {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      assert.equal(entry.isSymbolicLink(), false, `${rel} must not be a symlink`);
      if (entry.isDirectory()) return walk(resolve(dir, entry.name), rel);
      assert.ok(entry.isFile(), `${rel} must be a regular file`);
      return [rel];
    });
  }
  const files = walk(root);
  const allowed = /^(?:plugin\.json|README\.md|\.claude-plugin\/plugin\.json|skills\/[a-z-]+\/SKILL\.md|evals\/README\.md|evals\/[a-z-]+\/(?:prompt\.md|graders\/(?:quality|skill-used|no-skill)\.md))$/;
  for (const file of files) assert.match(file, allowed, `unexpected packaged content: ${file}`);
  assert.ok(files.includes("plugin.json") && files.includes(".claude-plugin/plugin.json"));
});

test("CI verifies the portable plugin, isolated install and removal", () => {
  const workflow = readFileSync(resolve(root, "../../.github/workflows/check.yml"), "utf8");
  assert.ok(workflow.includes("plugin validate portable/ogfrench-workflow --strict"));
  assert.ok(workflow.includes('CLAUDE_CONFIG_DIR="$(mktemp -d)"'));
  assert.ok(workflow.includes("plugin install chatgpt-workflow-lite@ogfrench --scope user"));
  assert.ok(workflow.includes("plugin uninstall chatgpt-workflow-lite@ogfrench --scope user"));
});


test("full Claude and ChatGPT share CalVer, legacy Lite remains independent", () => {
  const claude = JSON.parse(readFileSync(resolve(root, "../../plugins/agent-workflow/.claude-plugin/plugin.json"), "utf8"));
  const chatgpt = JSON.parse(readFileSync(resolve(root, "../../portable/agentic-workflow/plugin.json"), "utf8"));
  const lite = JSON.parse(read("plugin.json"));
  const marketplace = JSON.parse(readFileSync(resolve(root, "../../.claude-plugin/marketplace.json"), "utf8"));
  assert.equal(claude.name, "claude-workflow");
  assert.equal(chatgpt.name, "agentic-workflow");
  assert.equal(lite.name, "chatgpt-workflow-lite");
  assert.match(claude.version, /^20\d{2}\.(?:0?[1-9]|1[0-2])\.[1-9]\d*$/);
  assert.equal(claude.version, chatgpt.version);
  assert.notEqual(claude.version, lite.version);
  assert.deepEqual(marketplace.plugins.filter((p) => ["claude-workflow", "chatgpt-workflow-lite"].includes(p.name)).map((p) => p.name).sort(), ["chatgpt-workflow-lite", "claude-workflow"].sort());
});
