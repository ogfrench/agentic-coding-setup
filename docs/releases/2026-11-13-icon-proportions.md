# Agentic Workflow 2026.11.6

Incremental design guidance update to both full editions, building on the existing 2026.11.5 source tag.

- **Visual Loop:** check labeled icon size and spacing against adjacent typography and component tokens, including optical height, alignment, stroke weight and responsive/zoomed rendering.
- **Design System Adapter:** align icons with the intended text scale instead of unrelated pixel guesses, and distinguish glyph dimensions from accessible click/tap targets.
- Preserve design-system exceptions for logos, standalone icons and illustrations; these cues are not a reliable detector of AI authorship.
- No changes to product runtime, external permissions, command execution, skill count or independently versioned specialist plugins.

Release validation: both full-edition manifests use 2026.11.6; verify exact-head CI, source privacy checks, Claude upload ZIP validation, ChatGPT ZIP source integrity and GitHub asset checksums. Real-host acceptance must be documented or explicitly waived in the release workflow. Publishing source and Claude downloads does not update an installed ChatGPT/Claude plugin; private ChatGPT installation and Claude host sync are separate approved actions.
