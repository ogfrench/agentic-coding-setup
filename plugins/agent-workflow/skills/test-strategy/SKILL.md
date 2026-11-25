---
name: test-strategy
description: >-
  Choose unit, integration, E2E or host tests based on code change risk.
---

# Test strategy: prove the changed behavior

Read the implementing code, requirements, existing tests, runtime boundaries and
repository release gates before selecting a test. Choose the *cheapest reliable proof*
of the failure, then add a broader test when it catches a different failure class.
Do not treat a passing test as proof that the product meets requirements by default.

## Select the test

1. Identify what changed, which user outcome could break, and where the relevant
   boundary is: pure logic, database, service, browser, external API or installed host.
2. Inspect existing coverage. Select a focused regression that would fail on the old
   defect when feasible. Use the [decision matrix](references/decision-matrix.md) to
   distinguish tests that actually prove different things.
3. Cover meaningful negative paths, permissions, concurrency, retries, failure
   recovery and persistence when they are relevant. Avoid testing only mocked calls.
4. Determine whether an *actual* end-to-end journey is required to test components
   together. For auth, account ownership, real-time games, destructive migrations,
   conversion outputs, plugin installation and cross-process workflows, favor an
   affected real journey. Do not default every change to the entire browser suite.
5. Separate **test coverage** from **test execution schedule**. Focused tests while
   editing; cheap PR gates on changed revisions; required risk-based broad suites and
   security checks on the final accepted SHA. Consult actions-cost for scheduling
   and budgets, but never weaken required proof to save minutes.
6. Use isolated state and wait for observable readiness, not arbitrary sleeps.
   Investigate flakes rather than masking them with retries. See
   [reliability](references/reliability.md).
7. Record what ran, exact commit and runtime, outcomes, before/after evidence,
   justified skips and remaining gaps. A skipped, blocked, stale or waived test is
   **not** a pass.

## Copy-change preflight

Before expensive builds, package repinning or full acceptance, reconcile the
complete UI/documentation copy diff with its dependent tests. Include removed
and changed labels, accessible names, translated strings, prompts, error text,
step order, selectors, fixtures and snapshots. Search for old strings and
normalized fragments across the affected test and proof suites; inspect each
matching assertion, including later assertions masked by an earlier failure.
Read the actual generated markup or rendering code and check affected journeys.

Use stable semantic selectors, identifiers and download destinations for behavior
tests. Keep exact wording and accessible-name assertions where those are the
approved contract; update them to the new requirement, not to whatever happens
to render. Preserve negative paths, accessibility and user-facing instructions.
Do not delete or loosen valid assertions to obtain green CI.

Run the smallest relevant generated-site and browser tests on fresh output
first. Batch corrections, then run required full acceptance on the final SHA.
If focused execution is unavailable, report that proof gap explicitly; static
search is not a substitute for a passing test.

## Shared-state and multi-user correctness

For concurrent writes, live collaboration, tenant-owned data, reconnects or offline
synchronization, consult [multi-user correctness](references/multi-user-correctness.md).
Identify the state owner, atomicity and conflict policy before choosing tests or
algorithms. Test real competing operations and authorization boundaries where relevant.
Ordinary single-user or read-only changes do not need this protocol.

## Source-derived output checks

For migrations, generated documents, exports and reports, trace outputs to
an authoritative source revision. Where fidelity matters, check
**both directions**: required source facts survive and unsupported or stale
output is absent. Document scoped approved exceptions and source gaps rather than
silently changing the input or weakening the gate. A successful build,
screenshot or integrity check alone does not prove real consumer behavior;
exercise representative import, playback, rendering or user interaction.

## Optional mobile agent exploration

For native or hybrid mobile release discovery, consider
[mobile-agent-testers](https://github.com/pierridotite/mobile-agent-testers) as
an external example of parallel iOS/Android persona testing across devices,
languages, display scaling and accessibility settings. It can expose unanticipated
user-journey failures, but exploratory AI findings are nondeterministic. Inspect
screenshots, reproduce the defect, and add a deterministic regression where
appropriate. Review upstream code, secrets/test data exposure, model spend and
runner costs before adopting it. This is not bundled, installed, or a required
CI gate, and does not replace the product's own tests.

## Boundaries

This skill owns choosing sufficient tests. Delivery-loop owns execution and PR
handover; product-passport owns affected feature journeys; security-review owns
trust-boundary threats; visual-loop owns render inspection. Keep the product's own
test runners, required checks and deployment safeguards. A documentation-only edit
does not automatically require E2E; a small auth change may still require it.
