---
type: llm
---

PASS if it identifies the leaf '.' as a destructive directory-deletion path, also considers symlink redirection, distinguishes demonstrated risk from an exploit claim, and gives a bounded mitigation plus regression tests and operational review. FAIL if it claims a proven real exploit, focuses only on traversal, or recommends deleting arbitrary paths without inspection.
