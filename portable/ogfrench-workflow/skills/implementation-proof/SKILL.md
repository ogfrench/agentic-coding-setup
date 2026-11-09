---
name: implementation-proof
description: Review or redesign a real software interface using code-based options, builds and screenshots rather than generated mockups. Use for UI audits, visual comparison, design polish and interaction verification.
---

# Inspect the implemented interface

Open the actual UI code and its design system first. Treat brand, data, responsive breakpoints, states and neighboring content as part of the design, not decoration.

If the user asks for alternatives, implement a small number of meaningfully different options against the actual page or component, ideally on a separate branch. Show a live preview or faithful browser screenshots of the real build. Do not use generated pictures to imply code has changed, and never call an illustration a screenshot.

Inspect the output yourself before presenting it. Check spacing, hierarchy, wrapping, overflow, contrast, states, loading and errors, keyboard use and mobile/desktop layout. For motion changes, screenshots of settled states are insufficient; inspect the transition itself.

When a design is rejected, reconsider the shared premise before merely adjusting spacing or color. When the user says to fix the design rather than choose options, implement the requested changes without an artificial approval loop.

State the actual artifact and verification status. If a browser, repository or build is unavailable, show the concrete code or explain the limitation rather than invent visual proof.
