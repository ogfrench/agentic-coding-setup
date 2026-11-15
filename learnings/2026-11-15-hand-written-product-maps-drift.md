---
date: 2026-11-15
source: a private project
tags: [docs, process]
status: raw
promoted_to: []
---

# Product maps help navigation, but stale claims erode trust

**What happened.** Source-linked product maps and verification pilots helped locate real test gaps. A later review also found obsolete revision or merge-status claims and map entries needing correction. No with-versus-without task comparison measured the net benefit of maintaining the maps.

**Why.** Maps are derived navigation aids, not implementation truth. Stable owner paths can help agents, while copied release status, version counts and task progress age quickly. A successful pilot does not establish that upkeep happens during later PRs.

**Do instead.** Keep each map focused on user journeys, canonical code owners, interfaces and native verification routes. Preserve dated evidence as history and read live CI or deployed state for current status. Reconcile changed features in the same PR; make the outcome explicit. Compare task success, time and errors with versus without the map before adding mandatory upkeep or deleting useful records.

**Evidence.** Pilot regressions exposed missed assertions, while follow-up review found stale map claims and no controlled comparison. The benefit and maintenance cost have not been quantified.
