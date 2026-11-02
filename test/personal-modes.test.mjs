import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "../lib/kb.mjs";

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

test("retired plugins are absent, but the 21st pin is unchanged", () => {
  const marketplace = JSON.parse(read(".claude-plugin/marketplace.json"));
  const plugins = read("user/plugins.txt");
  for (const name of ["caveman", "ponytail"]) {
    assert.ok(!marketplace.plugins.some((p) => p.name === name));
    assert.ok(!plugins.includes(name + "@ogfrench"));
  }
  assert.equal(marketplace.plugins.find((p) => p.name === "21st").source.sha, "f76b07aec6e65a582abe4b20bf3ec7b0fa64968a");
  assert.match(plugins, /^21st@ogfrench$/m);
});

test("new personal modes are user-only Markdown skills with manual activation", () => {
  for (const name of ["caveman", "ponytail"]) {
    const dir = path.join(ROOT, "user/skills", name);
    assert.deepEqual(fs.readdirSync(dir), ["SKILL.md"]);
    const skill = fs.readFileSync(path.join(dir, "SKILL.md"), "utf8");
    assert.match(skill, new RegExp("^name: " + name + "$", "m"));
    assert.match(skill, /^disable-model-invocation: true$/m);
    assert.ok(skill.startsWith("---\n"));
    assert.ok(skill.length < 4000);
  }
  const setup = read("setup-user.sh");
  assert.ok(setup.includes('claude plugin uninstall "$p" --scope user'));
  assert.ok(setup.includes('"$SRC"/user/skills/*/'));
  const project = JSON.parse(read("project/settings.json"));
  for (const name of ["caveman", "ponytail"]) {
    assert.ok(!Object.keys(project.enabledPlugins).some((p) => p.startsWith(name + "@")));
  }
});
