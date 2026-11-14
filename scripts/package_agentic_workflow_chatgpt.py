"""Build the complete, portable ChatGPT Agentic Workflow from canonical source skills.

No mirrored Claude-only runtime, MCP, installers, hooks, or executable files.
"""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import re
import zipfile

ROOT = Path(__file__).resolve().parents[1]
PLUGIN = ROOT / "portable/agentic-workflow"
VERSION = json.loads((ROOT / "plugins/agent-workflow/.claude-plugin/plugin.json").read_text("utf-8"))["version"]
FULL_SKILLS = (
    "actions-cost", "architecture-gardener", "best-practices",
    "delivery-loop", "diagram-craft", "issue-management", "knowledge-base-builder",
    "learning-loop", "model-delegation", "netlify-cost",
    "plugin-experience-design", "product-passport", "session-continuity",
    "presentation-story", "presentation-design", "design-system-adapter",
    "token-efficiency", "visual-loop", "frogify", "deslopify", "humanizer",
)
PORTABLE_SKILLS = (
    "adversarial-review", "implementation-proof",
    "release-handover", "setup-audit",
)
SKILL_COUNT = len(FULL_SKILLS) + len(PORTABLE_SKILLS)
REFERENCE_FILES = (
    "kb/INDEX.md", "kb/index.jsonl", "kb/graph.json", "kb/bundles/any.md",
)
HOST_CONTRACT = """## ChatGPT host capability contract

This is the ChatGPT edition. Use only the tools and source files actually available
in this conversation or connected environment. The skill grants **no** file access,
GitHub permissions, local runtime, browser, MCP service, agents, persistent jobs or
autonomous execution. References to Claude Code commands, `CLAUDE.md`, local setup,
subagents or project sync are source-specific examples, **not ChatGPT features**.
Consult the target repository's actual instructions and code; adapt the method to
available tools, or report an exact blocker. Do not claim that a check, screenshot,
CI run, deployment or background action occurred without observed evidence. Ask
for confirmation before destructive or high-impact changes where required. Load
this skill's reference files on demand, not all at once. Keep private project
details in their owning repositories rather than in a public knowledge base.

"""


def _read(root: Path, relative: str) -> bytes:
    file = root / relative
    if not file.is_file() or file.is_symlink():
        raise ValueError(f"Missing, non-file, or symlinked source: {relative}")
    if file.stat().st_size > 1024 * 1024:
        raise ValueError(f"Oversize plugin component: {relative}")
    return file.read_bytes()


def _skills(root: Path, original: str, names: tuple[str, ...], *,
            adapt: bool, files: dict[str, bytes], provenance: dict[str, str]) -> None:
    for name in names:
        source = root / original / name
        if not source.is_dir() or source.is_symlink():
            raise ValueError(f"Missing skill: {source}")
        for path in sorted(source.rglob("*")):
            if path.is_symlink():
                raise ValueError(f"Symlink in skill: {path}")
            if path.is_dir():
                continue
            rel = path.relative_to(source).as_posix()
            if (path.suffix != ".md" and not (name == "humanizer" and rel == "LICENSE")) or path.stat().st_size > 1024 * 1024:
                raise ValueError(f"Unsupported skill component: {path}")
            source_rel = path.relative_to(root).as_posix()
            raw = _read(root, source_rel)
            if rel == "SKILL.md":
                data = raw.decode("utf-8")
                if not data.startswith("---\n") or "\n---\n" not in data[4:]:
                    raise ValueError(f"Invalid YAML frontmatter in {source_rel}")
                front, body = data[4:].split("\n---\n", 1)
                if not re.search(r"(?m)^name: " + re.escape(name) + r"$", front):
                    raise ValueError(f"Skill name mismatch: {source_rel}")
                if not re.search(r"(?m)^description: .+", front):
                    raise ValueError(f"Missing description: {source_rel}")
                if adapt:
                    knowledge = (
                        "## Curated practice lookup\n\n"
                        "For repository engineering questions, use `knowledge/README.md` to locate "
                        "the relevant public practice card and `knowledge/source-index.jsonl` "
                        "for source relationships. Read only the relevant card; treat its "
                        "lessons as hypotheses until validated against the current code.\n\n"
                    ) if name == "best-practices" else ""
                    data = "---\n" + front + "\n---\n\n" + HOST_CONTRACT + knowledge + body.lstrip()
                raw = data.encode("utf-8")
            dest = f"skills/{name}/{rel}"
            if dest in files:
                raise ValueError(f"Duplicate packaged component: {dest}")
            files[dest] = raw
            provenance[dest] = source_rel


def build_files(root: Path = ROOT) -> dict[str, bytes]:
    root = root.resolve()
    manifest = json.loads(_read(root, "portable/agentic-workflow/plugin.json"))
    if manifest.get("name") != "agentic-workflow" or manifest.get("version") != VERSION:
        raise ValueError("Full ChatGPT plugin identity/version drift")
    interface = manifest["extensions"]["com.openai"]["interface"]
    if len(interface["shortDescription"]) > 30:
        raise ValueError("Plugin subtitle exceeds 30 characters")
    files: dict[str, bytes] = {}
    provenance: dict[str, str] = {}
    for name in ("plugin.json", "README.md"):
        src = "portable/agentic-workflow/" + name
        files[name] = _read(root, src)
        provenance[name] = src
    icon_source = "plugins/agent-workflow/assets/fpe-mark-white-on-black.svg"
    files["assets/fpe-mark-white-on-black.svg"] = _read(root, icon_source)
    provenance["assets/fpe-mark-white-on-black.svg"] = icon_source
    _skills(root, "plugins/agent-workflow/skills", FULL_SKILLS, adapt=True,
            files=files, provenance=provenance)
    _skills(root, "portable/ogfrench-workflow/skills", PORTABLE_SKILLS, adapt=False,
            files=files, provenance=provenance)

    practices_root = root / "kb/practices"
    if not practices_root.is_dir() or practices_root.is_symlink():
        raise ValueError("Missing curated practice knowledge base")
    practices = sorted(practices_root.glob("*.md"))
    if len(practices) < 35:
        raise ValueError("Curated practice knowledge base is incomplete")
    for source in practices:
        rel = source.relative_to(root).as_posix()
        dest = "skills/best-practices/knowledge/practices/" + source.name
        files[dest] = _read(root, rel)
        provenance[dest] = rel

    for source in REFERENCE_FILES:
        name = source.split("/")[-1]
        dest = "skills/best-practices/knowledge/" + (
            "source-" + name if source.startswith("kb/") else name
        )
        if dest in files:
            raise ValueError(f"Duplicate KB file: {dest}")
        files[dest] = _read(root, source)
        provenance[dest] = source

    index = [
        "# Curated engineering practices",
        "",
        "Source: ogfrench/agentic-coding-setup/kb/practices.",
        "These general practices are evidence pointers, not project-specific rules.",
        "Read only relevant practices. Source code and verified behavior outrank notes.",
        "",
    ]
    index.extend(f"- [`{p.stem}`](practices/{p.name})" for p in practices)
    files["skills/best-practices/knowledge/README.md"] = ("\n".join(index) + "\n").encode("utf-8")

    skill_docs = [p for p in files if re.fullmatch(r"skills/[^/]+/SKILL\.md", p)]
    if len(skill_docs) != SKILL_COUNT or len({p.split("/")[1] for p in skill_docs}) != SKILL_COUNT:
        raise ValueError("Incomplete or duplicated core skill set")
    all_paths = sorted(files)
    fingerprints = {
        key: hashlib.sha256(files[key]).hexdigest() for key in all_paths
    }
    files["assets/provenance.json"] = (
        json.dumps({
            "version": VERSION,
            "source_repository": "https://github.com/ogfrench/agentic-coding-setup",
            "skill_count": SKILL_COUNT,
            "practice_count": len(practices),
            "source_paths": provenance,
            "sha256": fingerprints,
        }, sort_keys=True, indent=2) + "\n"
    ).encode("utf-8")
    for name in files:
        if (name.startswith("/") or ".." in Path(name).parts
                or name in (".mcp.json", "mcp.json", ".app.json")
                or name.startswith(("bin/", "hooks/", "agents/", ".claude-plugin/"))
                or Path(name).suffix.lower() in (".sh", ".py", ".js", ".exe", ".dll", ".pdf", ".zip")):
            raise ValueError(f"Forbidden plugin file: {name}")
    return files


def package(output: Path, root: Path = ROOT) -> Path:
    output = Path(output).resolve()
    if output.is_relative_to((root / "portable/agentic-workflow").resolve()):
        raise ValueError("Write the archive outside of its source directory")
    files = build_files(root)
    output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output, mode="w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for name in sorted(files):
            info = zipfile.ZipInfo(name, date_time=(2024, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            archive.writestr(info, files[name], compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
    verify_archive(output, root)
    return output


def verify_archive(path: Path, root: Path = ROOT) -> None:
    expected = build_files(root)
    with zipfile.ZipFile(path) as archive:
        if archive.testzip() is not None or archive.namelist() != sorted(expected):
            raise ValueError("Archive corruption or unexpected components")
        for key, value in expected.items():
            if archive.read(key) != value:
                raise ValueError(f"Package source mismatch: {key}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Build full skills-only Agentic Workflow for ChatGPT")
    parser.add_argument("--output", type=Path,
                        default=ROOT / f"dist/agentic-workflow-chatgpt-v{VERSION}.zip")
    args = parser.parse_args()
    print(package(args.output))
