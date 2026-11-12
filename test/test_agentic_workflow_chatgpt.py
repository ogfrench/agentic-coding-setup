"""Contract and regression tests for the full Agentic Workflow ChatGPT package."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path
import re
import runpy
import tempfile
import unittest
import zipfile

ROOT = Path(__file__).resolve().parents[1]
BUILD = runpy.run_path(str(ROOT / "scripts/package_agentic_workflow_chatgpt.py"))
build_files = BUILD["build_files"]
package = BUILD["package"]
verify_archive = BUILD["verify_archive"]
FULL_SKILLS = BUILD["FULL_SKILLS"]
PORTABLE_SKILLS = BUILD["PORTABLE_SKILLS"]
VERSION = BUILD["VERSION"]


class FullChatGPTWorkflowTest(unittest.TestCase):
    def test_full_skill_set_matches_canonical_sources(self) -> None:
        files = build_files()
        skill_names = {
            p.split("/")[1]
            for p in files if re.fullmatch(r"skills/[^/]+/SKILL\.md", p)
        }
        self.assertEqual(skill_names, set(FULL_SKILLS) | set(PORTABLE_SKILLS))
        self.assertEqual(len(skill_names), 18)
        for name in FULL_SKILLS:
            content = files[f"skills/{name}/SKILL.md"].decode("utf-8")
            self.assertIn("## ChatGPT host capability contract", content)
            self.assertIn("no", content.lower())
            self.assertIn("actual", content.lower())
            self.assertIn("name: " + name, content)
        for name in PORTABLE_SKILLS:
            content = files[f"skills/{name}/SKILL.md"].decode("utf-8")
            self.assertNotIn("## ChatGPT host capability contract", content)

    def test_knowledge_practices_are_bundled_and_traced(self) -> None:
        files = build_files()
        practices = [
            p for p in files if p.startswith("skills/best-practices/knowledge/practices/")
        ]
        self.assertGreaterEqual(len(practices), 35)
        self.assertIn("skills/best-practices/knowledge/source-graph.json", files)
        self.assertIn("skills/best-practices/knowledge/source-index.jsonl", files)
        self.assertIn("skills/best-practices/knowledge/source-INDEX.md", files)
        self.assertIn("skills/best-practices/knowledge/README.md", files)
        manifest = json.loads(files["assets/provenance.json"])
        self.assertEqual(manifest["skill_count"], 18)
        self.assertEqual(manifest["practice_count"], len(practices))
        for name, checksum in manifest["sha256"].items():
            self.assertEqual(checksum, hashlib.sha256(files[name]).hexdigest())

    def test_manifest_is_standalone_and_lite_identity_distinct(self) -> None:
        files = build_files()
        manifest = json.loads(files["plugin.json"])
        self.assertEqual(manifest["name"], "agentic-workflow")
        self.assertEqual(manifest["version"], VERSION)
        self.assertEqual(manifest["$schema"], "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json")
        self.assertEqual(manifest["extensions"]["com.openai"]["interface"]["displayName"], "Agentic Workflow")
        self.assertLessEqual(len(manifest["extensions"]["com.openai"]["interface"]["shortDescription"]), 30)
        self.assertNotIn("mcpServers", manifest)
        self.assertNotIn("apps", manifest["extensions"]["com.openai"])
        self.assertNotIn("mcp.json", files)
        self.assertNotIn(".app.json", files)
        self.assertNotIn(".claude-plugin/plugin.json", files)
        lite = json.loads((ROOT / "portable/ogfrench-workflow/plugin.json").read_text("utf-8"))
        self.assertEqual(lite["name"], "chatgpt-workflow-lite")
        self.assertNotEqual(manifest["name"], lite["name"])

    def test_existing_reference_links_are_packaged(self) -> None:
        files = build_files()
        for path, content in files.items():
            if not re.fullmatch(r"skills/[^/]+/SKILL\.md", path):
                continue
            text = content.decode("utf-8")
            for link in re.findall(r"\]\(([^)]+\.md)\)", text):
                if link.startswith(("http://", "https://", "../", "/")):
                    continue
                referenced = str(Path(path).parent / link)
                self.assertIn(referenced, files, f"Broken linked resource: {path} -> {link}")

    def test_deterministic_zip_integrity_and_no_runtime_payload(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            out1 = package(Path(tmp) / "one.zip")
            out2 = package(Path(tmp) / "two.zip")
            self.assertEqual(hashlib.sha256(out1.read_bytes()).digest(),
                             hashlib.sha256(out2.read_bytes()).digest())
            verify_archive(out1)
            with zipfile.ZipFile(out1) as archive:
                self.assertEqual(archive.namelist(), sorted(archive.namelist()))
                self.assertIsNone(archive.testzip())
                self.assertFalse(any(
                    p.startswith(("hooks/", "bin/", ".claude-plugin/", "agents/"))
                    or p in ("mcp.json", ".mcp.json", ".app.json")
                    or p.lower().endswith((".sh", ".py", ".pdf", ".exe", ".db", ".sqlite"))
                    for p in archive.namelist()
                ))
                self.assertGreater(len(archive.namelist()), 70)


if __name__ == "__main__":
    unittest.main()
