---
date: 2026-11-15
source: a private project
tags: [ui, accessibility, export]
status: raw
promoted_to: []
---

# Name a graphic with an aria-label, not a visually hidden word

**What happened.** A table cell drew a three-segment meter and carried the level as visually hidden text for screen readers. The PowerPoint exporter found words on the slide that no measured slot carried and refused to export it.

**Why.** Visually hidden text is real text in the document, so anything that reads text (an exporter, a copy command, a search) sees it. An accessible name does not need to be content.

**Do instead.** Give the graphic `role="img"` and an `aria-label` carrying the same words. Screen readers read it, and nothing that extracts text sees a stray word.

**Evidence.** The export refusal named the hidden words; after the change the export test passed and the markup tests still found the label.
