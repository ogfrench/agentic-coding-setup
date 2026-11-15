---
date: 2026-11-15
source: a private project
tags: [docs, testing, release]
status: raw
promoted_to: []
---

# Generate the list of surfaces a feature must reach, and test it, or surfaces drift

**What happened.** Twenty-four new page layouts shipped to a library. Listing was automatic, so they appeared, but none had a card picture, the library had no way to filter to them, the plugin page and six of the public guides never mentioned them, the registry could not tell them from other layouts, and the review table rows were blank.

**Why.** Only the surface that is generated from the folders updates itself. Every other surface is a place someone has to remember, and a prose map of surfaces has no way to fail when one is missed.

**Do instead.** Write the gap analysis once as a table of surface, what it should say, what it says, and the fix. Then turn it into one test that fails when any listed surface omits the feature, and generate the list of surfaces from the catalog where possible.

**Evidence.** A grep across the surfaces found zero mentions in six guides and no still for any of the twenty-four layouts, while the whole local check suite was green.
