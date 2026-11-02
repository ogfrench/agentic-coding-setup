import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";
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

test("setup-user migrates user scope with a fake CLI, without fetching old modes", () => {
  if (process.platform === "win32") return;
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "safe-modes-"));
  try {
    const source = path.join(temp, "source");
    const bin = path.join(temp, "bin");
    fs.mkdirSync(source);
    fs.mkdirSync(bin);
    fs.cpSync(path.join(ROOT, "user"), path.join(source, "user"), { recursive: true });
    fs.copyFileSync(path.join(ROOT, "setup-user.sh"), path.join(source, "setup-user.sh"));
    const fake = [
      "#!/usr/bin/env bash",
      'printf "%s\\n" "$*" >> "$FAKE_LOG"',
      'if [[ "$1 $2" == "plugin list" ]]; then',
      '  printf "%s\\n" "caveman@ogfrench" "ponytail@ogfrench" "21st@ogfrench"',
      "fi",
    ].join("\n") + "\n";
    fs.writeFileSync(path.join(bin, "claude"), fake, { mode: 0o755 });
    const log = path.join(temp, "calls.log");
    const config = path.join(temp, "claude");
    const run = spawnSync("bash", [path.join(source, "setup-user.sh")], {
      encoding: "utf8",
      timeout: 10000,
      env: { ...process.env, PATH: bin + path.delimiter + process.env.PATH, HOME: temp,
        CLAUDE_CONFIG_DIR: config, FAKE_LOG: log },
    });
    assert.equal(run.status, 0, run.stderr || run.error?.message);
    const calls = fs.readFileSync(log, "utf8");
    for (const name of ["caveman", "ponytail"]) {
      assert.match(calls, new RegExp("plugin uninstall " + name + "@ogfrench --scope user"));
      assert.ok(!calls.includes("plugin install " + name + "@ogfrench"));
      assert.ok(fs.existsSync(path.join(config, "skills", name, "SKILL.md")));
    }
    assert.match(calls, /plugin install 21st@ogfrench --scope user/);
    assert.ok(calls.indexOf("plugin uninstall caveman@ogfrench") < calls.indexOf("plugin marketplace add"));
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
});
