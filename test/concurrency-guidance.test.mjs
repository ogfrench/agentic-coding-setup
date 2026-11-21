import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");

test("parallel work is classified by contracts and integrated behavior", () => {
  const skill = read("plugins/agent-workflow/skills/model-delegation/SKILL.md");
  const guide = read("plugins/agent-workflow/skills/model-delegation/references/conflict-aware-parallelism.md");
  const delivery = read("plugins/agent-workflow/skills/delivery-loop/SKILL.md");
  assert.match(skill, /conflict-aware-parallelism\.md/);
  for (const term of ["Independent", "Contract-dependent", "Conflicting", "combined revision", "different files"])
    assert.ok(guide.toLowerCase().includes(term.toLowerCase()), term);
  assert.match(delivery, /Verify shared contracts and behavior after integrating/);
});

test("multi-user tests cover state owners, atomic claims and authorization", () => {
  const skill = read("plugins/agent-workflow/skills/test-strategy/SKILL.md");
  const ref = read("plugins/agent-workflow/skills/test-strategy/references/multi-user-correctness.md");
  const map = read("plugins/agent-workflow/skills/product-passport/references/plugin-product-map.md");
  assert.match(skill, /references\/multi-user-correctness\.md/);
  for (const term of ["transaction", "conditional update", "retry", "reconnect", "tenant", "race", "idempotency"])
    assert.ok(ref.toLowerCase().includes(term.toLowerCase()), term);
  assert.match(ref, /Do not assume every multi-account application needs CRDTs/);
  assert.match(map, /Shared-state, live collaboration/);
});
