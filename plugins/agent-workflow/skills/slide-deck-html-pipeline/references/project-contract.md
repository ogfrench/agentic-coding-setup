# Canonical deck project discovery

This is a map of **existing** files and behavior, not a prescribed folder layout, install script or claim that a named tool exists.

| Surface | What to establish from code and actual files |
| --- | --- |
| Canonical PPT | Current approved file and revision, slides, notes, omissions and exceptions |
| Beat mapping | Slide source number versus beat ID versus route position; order and appendix |
| Source ownership | Hand-maintained HTML versus active generator-owned slides |
| Text gate | Real extractor, both comparison directions, normalizations and exception rules |
| Build | Actual entry point, PPT path used for notes/owners, outputs, stale scripts |
| Browser engine | Steps, chrome, navigation, video, `?validate` or equivalent if implemented |
| Screenshots | Real viewport, browser, settling behavior, destructive output and retry policy |
| Media | Original assets, transcodes, poster frames, durations, offline and license status |
| Exports | Single HTML, linked archive and backup PPT exporter, their dependencies and limitations |
| Previous final | Last accepted artifacts and safe new versioned output location |

Inspect existing code, not only filenames and documentation. Source slide numbering need not match the route. A generated beat's owning file is its generator. Old wrappers may reference outdated PPTs or clear output folders. Compare changes with a diff baseline before editing.

## Exception record in the **target** project

```text
PPT revision:
Source slide ID and HTML beat ID:
Exact text or visual discrepancy:
Source-gap explanation:
Decision and approving owner:
Status: temporary | accepted
Gate handling and validation evidence:
```

Require a scoped decision, not a broad ignore rule. A chart rendered from a PPT image may require visual comparison of labels that text extraction cannot see. Preserve private evidence in the private deck repository, not in this public skill.
