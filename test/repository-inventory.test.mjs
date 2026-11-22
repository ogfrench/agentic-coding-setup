import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const read = (relative) => readFileSync(new URL("../" + relative, import.meta.url), "utf8");
const dirNames = (relative) => readdirSync(new URL("../" + relative, import.meta.url), { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .filter((item) => {
    try { return readFileSync(new URL("../" + relative + "/" + item.name + "/SKILL.md", import.meta.url), "utf8").length > 0; }
    catch { return false; }
  })
  .map((item) => item.name).sort();
const listed = (section) => [...section.matchAll(/^\| \[`([^`]+)`\]\([^)]+\) \|/gm)].map((m) => m[1]).sort();

test("Product Passport skills inventory matches actual source", () => {
  const doc = read("docs/product-passport/inventory.md");
  const canonical = doc.split("## Canonical skills (24)")[1]?.split("## ChatGPT-only additions")[0] ?? "";
  const additions = doc.split("## ChatGPT-only additions (4)")[1]?.split("## Configured Claude Code plugins")[0] ?? "";
  assert.deepEqual(listed(canonical), dirNames("plugins/agent-workflow/skills"));
  assert.deepEqual(listed(additions), dirNames("portable/ogfrench-workflow/skills"));
});

test("Product Passport configured plugin inventory matches setup file", () => {
  const doc = read("docs/product-passport/inventory.md");
  const section = doc.split("## Configured Claude Code plugins (12)")[1]?.split("## Other agent, instructions and configuration")[0] ?? "";
  const displayed = [...section.matchAll(/^\| `([^`]+)` \|/gm)].map((m) => m[1]).sort();
  const configured = read("user/plugins.txt").split(/\r?\n/)
    .map((line) => line.trim()).filter((line) => line && !line.startsWith("#")).sort();
  assert.deepEqual(displayed, configured);
});

test("Product Passport inventories the current repository and plugins without implying host installation", () => {
  const doc = read("docs/product-passport/inventory.md");
  const claude = JSON.parse(read("plugins/agent-workflow/.claude-plugin/plugin.json"));
  const chatgpt = JSON.parse(read("portable/agentic-workflow/plugin.json"));
  assert.equal(claude.name, "agentic-workflow");
  assert.equal(chatgpt.name, "agentic-workflow");
  assert.equal(claude.version, chatgpt.version);
  assert.ok(doc.includes("v" + claude.version));
  assert.ok(doc.includes("installed and verified on the user's host"));
  assert.ok(doc.includes("mcpServers"));
  assert.ok(doc.includes("53 curated practice cards"));
  assert.ok(doc.includes("40 tool-reference cards"));
  assert.ok(doc.includes("57 behavioral evaluation prompts"));
});

test("Product Passport knowledge and source counts track the checkout", () => {
  const doc = read("docs/product-passport/inventory.md");
  const names = (relative) => readdirSync(new URL("../" + relative, import.meta.url));
  const cards = (relative) => names(relative).filter((x) => x.endsWith(".md")).length;
  const learnings = names("learnings/").filter((x) => /^\\d{4}-\\d{2}-\\d{2}-.+\\.md$/.test(x)).length;
  const evals = names("plugins/agent-workflow/evals/").filter((x) =>
    existsSync(new URL("../plugins/agent-workflow/evals/" + x + "/prompt.md", import.meta.url))).length;
  const tests = names("test/").filter((x) => /\\.(mjs|py)$/.test(x)).length;
  assert.ok(doc.includes("**" + cards("kb/practices/") + " curated practice cards**"));
  assert.ok(doc.includes("**" + cards("kb/tools/") + " tool-reference cards**"));
  assert.ok(doc.includes("**" + learnings + " dated learning records**"));
  assert.ok(doc.includes("**" + evals + " behavioral evaluation prompts**"));
  assert.ok(doc.includes("**" + tests + " test source files**"));
});
