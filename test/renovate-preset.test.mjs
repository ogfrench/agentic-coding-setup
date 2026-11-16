import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const preset = JSON.parse(readFileSync(new URL("../renovate/node-pin.json", import.meta.url), "utf8"));

test("the Node pin preset moves .nvmrc and netlify.toml as one grouped change", () => {
  assert.equal(preset.nvm.enabled, true);
  const rule = preset.packageRules.find((r) => r.matchDepNames?.includes("node"));
  assert.ok(rule, "a rule names the node dependency");
  assert.equal(rule.groupName, "node pin");
  assert.equal(rule.automerge, false, "a Node bump is never merged unseen");
});

test("the netlify.toml manager captures the pinned version and nothing else", () => {
  const manager = preset.customManagers[0];
  assert.equal(manager.datasourceTemplate, "node-version");
  const re = new RegExp(manager.matchStrings[0]);
  assert.equal(re.exec('[build.environment]\n  NODE_VERSION = "24.22.3"\n')?.groups.currentValue, "24.22.3");
  assert.equal(re.exec('NODE_VERSION="22"')?.groups.currentValue, "22");
  assert.equal(re.exec('NPM_VERSION = "11.19.1"'), null);
  const file = new RegExp(manager.managerFilePatterns[0].slice(1, -1));
  assert.ok(file.test("netlify.toml") && file.test("apps/web/netlify.toml") && !file.test("netlify.toml.bak"));
});
