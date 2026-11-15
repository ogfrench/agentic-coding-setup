---
id: chrome-devtools-mcp
type: tool
kind: mcp
summary: Candidate Chrome DevTools MCP for performance traces and browser diagnosis.
use_when: Evaluate performance traces on a non-sensitive Chrome test target when Playwright is insufficient.
where: chrome-devtools-mcp@upstream
state: candidate
last_reviewed: 2026-11-15
---

Upstream: https://github.com/ChromeDevTools/chrome-devtools-mcp (Apache-2.0).
Not installed or approved. `where` is a catalog placeholder, not an install command.
Before vetting, review bundled tools and browser-data access; usage statistics are on by
default (`--no-usage-statistics` opts out), and performance traces may send URLs to the
CrUX API (`--no-performance-crux` disables this). Compare with existing Playwright use.
