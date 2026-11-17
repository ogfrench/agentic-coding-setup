---
date: 2026-11-15
source: a private project
tags: [testing, agents, visual-review]
status: raw
promoted_to: []
---

# Judge rendered pages at rest, with scripts off, never from mid-animation frames

**What happened.** A cheap model reviewed screenshots of animated slides and reported several slides as showing only a headline. The screenshots had been taken while the slide was still revealing, so the body had not appeared yet. A second pass on rest-state frames matched the measured inventory.

**Why.** Reveals are functions of time, and a screenshot taken at an arbitrary moment catches an arbitrary state. The reviewer judged what it was given, correctly, and the input was wrong.

**Do instead.** Render with scripts disabled so the page sits at its final state, which is deterministic, and have every review, human or model, use those frames. Keep one script for rest-state capture and reuse it.

**Evidence.** The first review flagged two slides as headline-only; the rest-state rerun found both complete and agreed with a computed-style inventory of the same pages.
