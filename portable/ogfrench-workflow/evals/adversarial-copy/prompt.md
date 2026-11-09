---
max_turns: 7
allowed_tools: [Skill]
---

A fictional repository updater reads a target-owned JSON file containing paths in a copied list. It deletes each path with rmSync(path.join(target, item), {recursive:true,force:true}). A regex permits names matching .claude/skills/[A-Za-z0-9._-]+ and tests only forbid ../. Evaluate the actual failure mode and safe minimum fix. Assume no access to executable code beyond this description; distinguish what is proven from what needs testing.
