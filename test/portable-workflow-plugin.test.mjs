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
