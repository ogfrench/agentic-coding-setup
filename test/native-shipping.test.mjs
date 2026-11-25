import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { apply } from "../lib/apply.mjs";

const root = new URL("../", import.meta.url);
const read = (p) => fs.readFileSync(new URL(p, root), "utf8");

test("shipping guidance is packaged through the canonical delivery skill", () => {
  const skill = read("plugins/agent-workflow/skills/delivery-loop/SKILL.md");
  assert.match(skill, /references\/native-shipping\.md/);
  assert.ok(skill.indexOf('references/native-shipping.md') < skill.indexOf('5. **Reconcile and review.**'), 'native delivery precedes final review');
  const contract = read("plugins/agent-workflow/skills/delivery-loop/references/native-shipping.md");
  for (const phrase of ["observed capability", "one tracker", "two repair/review rounds", "read-only", "explicit human authorization"]) {
    assert.ok(contract.toLowerCase().includes(phrase.toLowerCase()), phrase);
  }
});

test("sync preserves project-owned reviewer and approval files and does not activate policy", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ship-sync-"));
  try {
    apply(dir);
    const approval = path.join(dir, ".claude/approvals.yml");
    const review = path.join(dir, "REVIEW.md");
    assert.equal(fs.existsSync(approval), false);
    assert.equal(fs.existsSync(review), false);
    fs.writeFileSync(approval, "version: 1\nmode: observe\nrules: []\n");
    fs.writeFileSync(review, "project-owned reviewer rules\n");
    const before = [fs.readFileSync(approval), fs.readFileSync(review)];
    apply(dir);
    assert.deepEqual([fs.readFileSync(approval), fs.readFileSync(review)], before);
    assert.equal(fs.existsSync(new URL(".claude/approvals.yml", root)), false);
    assert.match(read("docs/examples/claude-approvals.observe.yml"), /^version: 1\nmode: observe\n/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
