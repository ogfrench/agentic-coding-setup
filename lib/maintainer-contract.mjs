import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

export const ENTRYPOINTS = ["AGENTS.md", "CLAUDE.md"];
export const START = "<!-- agentic-workflow:maintainer:start -->";
export const END = "<!-- agentic-workflow:maintainer:end -->";

const canonical = (content) => content.replace(/\r\n/g, "\n");
export const contractHash = (content) =>
  createHash("sha256").update(canonical(content)).digest("hex");

export function findContract(content) {
  const starts = [...content.matchAll(/^<!-- agentic-workflow:maintainer:start -->\r?$/gm)];
  const ends = [...content.matchAll(/^<!-- agentic-workflow:maintainer:end -->\r?$/gm)];
  if (!starts.length && !ends.length) return null;
  if (starts.length !== 1 || ends.length !== 1 ||
      starts[0].index + START.length >= ends[0].index) {
    throw new Error("Incomplete or duplicated Agentic Workflow maintainer markers");
  }
  return { start: starts[0].index, end: ends[0].index + END.length };
}

export function readContract(target, rel) {
  const file = path.join(target, rel);
  try {
    const stat = fs.lstatSync(file);
    if (!stat.isFile()) throw new Error(`Expected a regular file: ${rel}`);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
  const content = fs.readFileSync(file, "utf8");
  const range = findContract(content);
  return range ? content.slice(range.start, range.end) : null;
}

export function planMaintainerContract(target, root, priorHash) {
  const source = path.join(root, "project/maintainer-contract.md");
  if (!fs.existsSync(source)) return null;
  if (!fs.lstatSync(source).isFile()) throw new Error("Maintainer contract source must be a regular file");
  const body = fs.readFileSync(source, "utf8").trimEnd();
  if (!body) throw new Error("Maintainer contract source is empty");
  const block = `${START}\n${body}\n${END}`;

  const changes = ENTRYPOINTS.map((rel) => {
    const file = path.join(target, rel);
    let original = "";
    try {
      const stat = fs.lstatSync(file);
      if (!stat.isFile()) throw new Error(`Expected a regular file: ${rel}`);
      original = fs.readFileSync(file, "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    const range = findContract(original);
    if (range && !/^[0-9a-f]{64}$/.test(priorHash ?? "")) {
      throw new Error(`Refusing unowned Agentic Workflow maintainer markers in ${rel}`);
    }
    const newline = original.includes("\r\n") ? "\r\n" : "\n";
    const localized = newline === "\n" ? block : block.replace(/\n/g, "\r\n");
    const separator = !original || /\r?\n\r?\n$/.test(original) ? "" :
      /\r?\n$/.test(original) ? newline : newline + newline;
    const next = range
      ? original.slice(0, range.start) + localized + original.slice(range.end)
      : original + separator + localized + newline;
    return { rel, file, original, next };
  });

  return { changes, paths: ENTRYPOINTS, sha256: contractHash(block) };
}

export function installMaintainerContract(target, root, priorHash) {
  const plan = planMaintainerContract(target, root, priorHash);
  if (!plan) return null;
  for (const { file, original, next } of plan.changes) {
    if (original !== next) fs.writeFileSync(file, next);
  }
  return { paths: plan.paths, sha256: plan.sha256 };
}
