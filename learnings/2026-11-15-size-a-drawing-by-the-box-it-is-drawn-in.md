---
date: 2026-11-15
source: a private project
tags: [ui, svg, layout]
status: raw
promoted_to: []
---

# An SVG overlay must take its coordinate space from the box it is drawn in

**What happened.** A leader line was drawn over a diagram in an SVG whose viewBox assumed a fixed height. When the diagram's box became as tall as its content, the line was stretched vertically and ended above the label it pointed at.

**Why.** With `preserveAspectRatio="none"` the viewBox is scaled to whatever box it is given, so a constant height in the viewBox becomes a vertical distortion as soon as the box height changes.

**Do instead.** Derive the viewBox from the same numbers that size the box, or draw in the box's own units. Test an overlay at more than one box height, and anchor labels by their first line so a longer note cannot move the line that points at them.

**Evidence.** The line landed level with the name in the demo and drifted by about a unit at the word limits until the viewBox height followed the box.
