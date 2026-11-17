---
date: 2026-11-16
source: a private project
tags: [testing, ui, measurement]
status: practice
promoted_to:
  - plugins/agent-workflow/skills/best-practices/testing.md
---

# Measure in the unit the system defines, read from the running page

**What happened.** A slide stage is sized in a custom unit, and I reported that a landscape phone would give a stage 45 units tall. I had measured with one hundredth of the page width as the unit. The system defines the unit as the smaller of one hundredth of the width and a share of the height, so on a wide, short screen the unit is height-limited and the stage is never shorter than about 56 units. The claim was wrong, and a guard built on it had to be dropped.

**Why.** Recomputing a unit from its apparent definition gives a plausible number that is wrong exactly where the definition has a second branch. The number looked reasonable, so nothing prompted a second look.

**Do instead.** Read the unit from the running page: put a probe element sized `calc(100 * var(--u))` in the document and divide its measured width by 100. Report measurements in that unit, and treat any number derived another way as unverified.

**Evidence.** The probe gave 56.3 units for the same viewport where my estimate said 45.
