# Acceptance matrix and honest handover

Use only the gates relevant to the task and intended delivery. Names such as `check_text.py`, `build.py` and `shoot_all.py` are **examples of project-native scripts**, not code included here.

| Gate | Evidence required | Do not claim success based on |
| --- | --- | --- |
| Source | Verified canonical PPT revision and the build's actual input path | Handover filename alone |
| Two-way wording | PPT-to-HTML and HTML-to-PPT checks passing, or exact approved exceptions | One-way contains test, catch-all ignore |
| Source scope | Diff of changed beats and any generator with no unrelated edits | "Agent completed" report |
| Build | Existing builder finishes, expected output exists | Valid source but no build |
| Runtime | Executed validation route and targeted real navigation; verify appendix and footer | Query parameter present without running |
| Visual | Full-size changed slide screenshots inspected for clipping, titles, contrast and footer | Files generated but never opened |
| Media | Source/export durations, real-browser play/pause/seek/close where claimed | Still images or headless metadata alone |
| QR/links | Scan QR with device and check URLs | QR drawn on a slide |
| Embedded HTML | Real offline open, fonts/images/videos resolvable | Base64 encoder source alone |
| Linked ZIP | Archive test and referenced relative assets checked | Zip file exists |
| PPT backup | Real PPT render, expected slide count, notes and embedded video checked | Export command exits 0 |
| Preservation | Old final untouched, new output location listed and hash/file inventory recorded | Prior output was cleared |
| Distribution | Owner reviews sensitive deck content and asset/font licensing | Package is technically valid |

**Execution order:** Source and scoped diff -> parity gate -> build and runtime check -> full-size visual inspection -> real interaction and media check -> exports to a fresh location -> independent format inspection -> evidence handover. For a one-slide edit, do not regenerate every deliverable unless asked or necessary.

Use a compact evidence report:

```text
Canonical PPT/revision:
Changed beats:
Approved exceptions and source gaps:
Text parity: PASS / FAIL / NOT RUN, with real command
Build and runtime: PASS / FAIL / NOT RUN
Screenshots inspected / missing:
Real-browser media: PASS / FAIL / NOT RUN
QR and URLs: PASS / FAIL / NOT RUN
HTML offline / ZIP / PPT: independently verified statuses
Prior final preserved: VERIFIED / NOT VERIFIED
Outstanding checks and manual review:
```

Do not describe a flat image-slide PowerPoint as editable native shapes. State exactly which checks did **not** run.
