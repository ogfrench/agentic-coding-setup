import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = fs.readFileSync(path.join(ROOT, "setup-user.sh"), "utf8");
const RULE = fs.readFileSync(path.join(ROOT, "user/rules/pr-progress.md"), "utf8");
const OWNED = "<!-- managed: agentic-coding-setup/pr-progress -->";

function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pr-progress-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const src = path.join(dir, "src");
  const config = path.join(dir, "config");
  const bin = path.join(dir, "bin");
  fs.mkdirSync(path.join(src, "user", "rules"), { recursive: true });
  fs.mkdirSync(bin);
  fs.writeFileSync(path.join(src, "setup-user.sh"), SCRIPT);
  fs.writeFileSync(path.join(src, "user", "plugins.txt"), "# mock plugins\n");
  fs.writeFileSync(path.join(src, "user", "rules", "pr-progress.md"), RULE);
  fs.writeFileSync(path.join(bin, "claude"), "#!/bin/sh\nexit 0\n", { mode: 0o755 });
  const dest = path.join(config, "rules", "pr-progress.md");
  const run = () => spawnSync("bash", [path.join(src, "setup-user.sh")], {
    encoding: "utf8",
    env: { ...process.env, CLAUDE_CONFIG_DIR: config, PATH: [bin, process.env.PATH].join(path.delimiter) },
    cwd: dir,
  });
  return { src, config, dest, dir, run };
}

test("installer deploys a user-level rule and updates only its owned copy", { skip: process.platform === "win32" }, (t) => {
  const x = fixture(t);
  const first = x.run();
  assert.equal(first.status, 0, first.stderr);
  assert.equal(fs.readFileSync(x.dest, "utf8"), RULE);
  const nextRule = RULE + "\nAdditional future rule.\n";
  fs.writeFileSync(path.join(x.src, "user", "rules", "pr-progress.md"), nextRule);
  const again = x.run();
  assert.equal(again.status, 0, again.stderr);
  assert.equal(fs.readFileSync(x.dest, "utf8"), nextRule);
});

test("installer refuses to overwrite an unrelated rule", { skip: process.platform === "win32" }, (t) => {
  const x = fixture(t);
  fs.mkdirSync(path.dirname(x.dest), { recursive: true });
  fs.writeFileSync(x.dest, "user-owned rule\n");
  const result = x.run();
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stderr, /not managed/);
  assert.equal(fs.readFileSync(x.dest, "utf8"), "user-owned rule\n");
});

test("installer refuses symlinked rule files and folders", { skip: process.platform === "win32" }, (t) => {
  const x = fixture(t);
  const outside = path.join(x.dir, "outside.md");
  fs.writeFileSync(outside, OWNED + "\nkeep me\n");
  fs.mkdirSync(path.dirname(x.dest), { recursive: true });
  fs.symlinkSync(outside, x.dest);
  const result = x.run();
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stderr, /symlink/);
  assert.equal(fs.readFileSync(outside, "utf8"), OWNED + "\nkeep me\n");
  fs.rmSync(path.dirname(x.dest), { recursive: true, force: true });
  const other = path.join(x.dir, "other-rules");
  fs.mkdirSync(other);
  fs.symlinkSync(other, path.dirname(x.dest));
  const folderResult = x.run();
  assert.equal(folderResult.status, 1, folderResult.stderr);
  assert.match(folderResult.stderr, /symlink/);
  assert.deepEqual(fs.readdirSync(other), []);
});
