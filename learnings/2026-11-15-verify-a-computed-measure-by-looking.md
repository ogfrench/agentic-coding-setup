---
date: 2026-11-15
source: a private project
tags: [testing, ui, visual-review]
status: raw
promoted_to: []
---

# A computed metric can be wrong; look at the render before acting on it

**What happened.** An audit script reported a rule at 1.7 units thick and a plan was made to thin it. The rule was drawn at 0.2 units. The script had scaled a stroke by the wrong box, because the path's bounding box is not the drawing's coordinate space.

**Why.** Measures taken through transforms inherit every assumption about which box defines the scale. The number looked precise and was never compared with the picture.

**Do instead.** Treat a measured outlier as a hypothesis. Open the render, confirm it is visible, and only then change anything. Prefer measuring the rendered pixels or the element's own box over deriving size through viewBox maths.

**Evidence.** The reported 1.7 turned out to be a one-pixel-class hairline in the render; the change was dropped before any code was touched.
