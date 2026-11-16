---
name: slide-deck-html-pipeline
description: Build and revise PowerPoint-canonical HTML slide decks with two-way text parity, scoped beat edits, browser verification and reliable exports. Use for source-synced beat-based keynotes, not arbitrary decks or trivial copy fixes.
---

# Slide deck HTML pipeline

Work from a canonical PowerPoint into an existing beat-based HTML slide deck. **The PPT governs wording and notes; implementation and observed behavior govern what actually works.** Approved exceptions must be explicit. This skill is a procedure, not a new rendering engine.

## Routing

Use for slide projects with a canonical PPT and per-slide HTML beats, or when expressly building that workflow. Use `presentation-story` for narrative, `presentation-design` for general deck creation and `visual-loop` for rendered visual judgment. A named specialist authoring system owns its actual templates, fonts, assets, engine and export path. This skill may add source parity and verification, but cannot replace that engine with a generic imitation. Do not trigger for a one-line title change or a deck that does not have a canonical PPT.

## 1. Inspect before execution

Read the actual PPT, existing beat files and order, source/build scripts, active generators, engine, tests, media pipeline and exporters. Follow [the project discovery contract](references/project-contract.md). Source code and observed behavior outrank a handover. Check that the build reads the **current** PPT, not a stale copy. Differentiate PPT slide IDs from route order; appendix slides may live outside main progress. Determine whether each beat is hand-maintained or generated before editing.

Record the allowed exception registry and current deliverables. Report incomplete or contradictory source material as a **source gap**. Do not silently fix it in HTML or retroactively treat a mismatch as approved. Keep confidential PPT content, project identities, proprietary visuals and source excerpts in the owning project, never in a public workflow repository.

## 2. Make the smallest correct change

Patch only the changed beat, or its current generator if generated. Inspect legacy `gen_*`, `patch*` and export scripts before running them: old scripts can overwrite newer work. Preserve established design tokens, title style, layout, photos, notes, navigation and media. Compare the diff against the requested scope. Build or export the entire deck only when the acceptance requirement warrants it.

Prefer scoped CSS class names and component-owned DOM lookups to avoid collision with the deck chrome or progress bar. Verify stepper state, next/previous navigation, overlays, focus, hover, fit and footer clearance. Honor the project's color contrast, media and brand rules, not invented global colors or decorative instructions.

Main agent owns shared state, final text gate, build, renders and exports. Delegate only self-contained, disjoint beat ranges when valuable; include source PPT range, paths, rules, exceptions, allowed edits and return format. Do not let parallel workers run shared build/export commands. Inspect their changes and rerun checks; their reports are claims, not proof.

## 3. Enforce bidirectional PPT text parity

Run the real project text check, commonly `check_text.py`, against the canonical PPT and HTML. It must detect **both** PPT text missing from the corresponding beat **and** HTML text absent from the PPT. A one-way test can pass while stale copy survives. Confirm the gate actually checks both directions; inspect its extraction and normalizations, including speaker notes, image-backed charts, hidden text and duplicate labels as relevant.

An exception needs the slide/beat ID, exact discrepancy, reason and documented approval. Never add a blanket ignore or declare a mismatch harmless without source evidence. Rerun the gate before each final export. The project scripts referred to here are **not bundled** with this Markdown skill; do not fabricate or claim to run scripts that are unavailable.

## 4. Verify real rendering and interactions

Run the active build only after the appropriate text gate passes or documented exceptions are accepted. When the engine has an entry point such as `index.html?validate`, inspect its implementation, exercise it and report its actual coverage. Validate route progress, jumps, keyboard navigation, appendix access, steps, footer clearance and video click sequence when present.

Render changed slides at presentation size, usually 1920x1080, and inspect each at full size after motion settles. Validate screenshot existence and plausible size. A flaky headless capture may be retried once; if bulk still generation deletes old files, preserve the last accepted set and check the full run completed. Do not interrupt a destructive stills batch and assume it succeeded.

Stills cannot prove sound, motion or video playback. Test click-to-play, play/pause, overlays, seek and navigation in a real browser if claiming them. Compare source video durations after transcode/export. Scan QR codes and check actual target URLs before claiming those work. Distinguish headless validator success from real-user playback.

## 5. Export without destroying the last final

Use the **project-owned** single-file HTML exporter, linked-assets ZIP exporter and picture-backed PPT exporter, only if they exist and their dependencies work. Save to a new versioned destination; never empty or overwrite the previous accepted final. Validate offline single-file HTML, linked asset references and ZIP integrity, and open the PowerPoint backup in a real PPT renderer where available. Check slide count, notes, posters, embedded video and fidelity independently.

Describe image-backed PPT slides as flat pictures, not native editable shapes. A successful exporter exit is not proof of file playback or PowerPoint visual fidelity. If one format cannot be produced or checked, state the limitation rather than substituting an unverified equivalent.

## 6. Evidence-based handover

Use [the acceptance matrix](references/acceptance.md) at the scope appropriate to the change. Record source PPT revision, changed beats, approved exceptions/source gaps, exact checks run and results, captures inspected, real-browser media evidence, output files, integrity checks and untouched prior final. Explicitly list what **was not verified**. Remind the user that client-facing material and media rights require owner review before external sharing.
