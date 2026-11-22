---
id: name-inputs-for-no-js-submit
type: practice
summary: Name every input in a JavaScript form; before hydration the browser submits it as GET.
concern: ui
stack: [any]
severity: should
last_verified: 2026-11-22
status: active
derived_from: [2026-10-24-name-inputs-for-pre-hydration-submit]
---

Give each input the name its URL parameter uses, so a native submit keeps its query. Fast CI runners hydrate before a click and hide this; run the browser suite once on a slow machine.
