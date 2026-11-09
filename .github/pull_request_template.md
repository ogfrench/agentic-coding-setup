## Outcome and scope

What behavior or deliverable changes, why, and what is explicitly out of scope?

## Execution checklist

Replace these examples with **specific** tasks and their acceptance criteria.
Keep the boxes updated during implementation, not only before review.

- [ ] Implement the scoped outcome and inspect the changed behavior
- [ ] Cover relevant regression, negative paths and security/privacy risks
- [ ] Run the appropriate source, test and runtime checks; attach evidence
- [ ] Reconcile product-map and documentation impact, or explain why unchanged
- [ ] Resolve or explicitly account for review feedback and remaining blockers

## Evidence and current status

- **Head revision:**
- **Executed checks, environment and results:**
- **Failed, blocked or not run:**
- **Current state:** implemented / locally tested / CI green / host tested / deployed / released (only mark what is true)

## Handover

- **Next action and owner:**
- **Open risks, decisions and follow-ups:**
- **Last reconciled with head, CI and review threads:**

## Repository checks

- [ ] Opened from a branch, not pushed to `main`
- [ ] `node scripts/check-public.mjs` passes
- [ ] `node --test` passes; generated files rebuilt with `node scripts/build-kb.mjs` when needed
- [ ] `claude plugin validate . --strict` passes (or explain unavailable host)
- [ ] I read the diff for client, project, private repository names and sensitive material (automated checks cannot detect everything)

Do not tick checks that were not performed. Leave them open and document the blocker.
