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
  const start = content.indexOf(START);
  const end = content.indexOf(END);
  if (start === -1 && end === -1) return null;
  if (start < 0 || end < start + START.length ||
      content.indexOf(START, start + START.length) !== -1 ||
      content.indexOf(END, end + END.length) !== -1) {
    throw new Error("Incomplete or duplicated Agentic Workflow maintainer markers");
  }
  return { start, end: end + END.length };
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

export function installMaintainerContract(target, root) {
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
    const newline = original.includes("\r\n") ? "\r\n" : "\n";
    const localized = newline === "\n" ? block : block.replace(/\n/g, "\r\n");
    const separator = !original || /\r?\n\r?\n$/.test(original) ? "" :
      /\r?\n$/.test(original) ? newline : newline + newline;
    const next = range
      ? original.slice(0, range.start) + localized + original.slice(range.end)
      : original + separator + localized + newline;
    return { rel, file, original, next };
  });

  for (const { file, original, next } of changes) {
    if (original !== next) fs.writeFileSync(file, next);
  }
  return { paths: ENTRYPOINTS, sha256: contractHash(block) };
}
