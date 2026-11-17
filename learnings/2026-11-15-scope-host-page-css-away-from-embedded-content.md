---
date: 2026-11-15
source: a private project
tags: [ui, css, testing]
status: practice
promoted_to: 
  - plugins/agent-workflow/skills/best-practices/ui.md
---

# A host page's element selectors reach into the content it embeds

**What happened.** A gallery page showed each slide on a sheet. The page's stylesheet padded every section element by 72px, and one slide layout used a section element for its signature block, so on the sheet that block doubled in height and ran over the footer. The same slide was fine standing alone.

**Why.** A bare element selector in the host's CSS applies to every matching element on the page, including the ones inside embedded content. The slide was correct in isolation, so its own tests passed; only the host composition was wrong.

**Do instead.** Name the host's elements in the rule, or exclude the embedded root with a zero-specificity guard such as `section:where(:not(.embedded-root section))`, so it keeps its weight against other rules. Add a test that no bare element rule of that kind exists in the host stylesheet, and measure embedded content on the host page, not only alone.

**Evidence.** The padding computed to 72px in the sheet and 0 standalone. After scoping the rule, the matrix findings on that page cleared and a stylesheet test now fails if a bare rule returns.
