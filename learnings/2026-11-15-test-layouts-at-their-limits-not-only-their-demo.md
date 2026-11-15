---
date: 2026-11-15
source: a private project
tags: [testing, ui, layout]
status: practice
promoted_to: 
  - plugins/agent-workflow/skills/best-practices/testing.md
---

# A layout that is clean on its demo copy can collide at its stated limits

**What happened.** A diagram slide looked right with its demo text. Rendered with the longest title, a subtitle and the longest names its schema allowed, a label ran past the page margin, the subtitle touched the shapes, and two rows of labels touched.

**Why.** A schema states maximums, and the layout only ever met the average. Overlap, overflow and margin breaks appear at the maximum, in the widest typeface, in every look.

**Do instead.** Render every layout at the schema's limits in each look as part of its tests, and read the frames. When the worst case does not fit, lower the limit or give the layout room that follows its content; never shrink the type to hide it.

**Evidence.** At limits the label ran to 99 percent of the page width; after sizing labels to the room left and making the plan as tall as its content, the same render was clean in both brands.
