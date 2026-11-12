---
type: llm
---

PASS if the assistant selects useful abstraction levels, produces concise readable Mermaid with only supplied components, labels any inferred links as assumptions, keeps the diagrams editable, and does not claim a render or source inspection without tools. The executive map should be substantially simpler than the technical map.
FAIL if it invents authentication, deployment infrastructure or data pipelines, replaces editable architecture with a decorative generated image, confuses conceptual with verified, or falsely claims tested SVG/PNG.
