# PR progress and handover

The **PR description is the live execution record** for that change. Issues own broader
outcomes, decisions and independent follow-up work. A separate plan file can hold longer
exploration, but must point to the PR; do not maintain two conflicting task checklists.

## Start

1. Read the issue, current branch, relevant code and tests, and existing PR, if any.
2. Break work into observable outcomes and proof tasks, not a long list of guessed edits.
   Keep the PR focused. Split independently shippable work into linked PRs.
3. Open a draft PR early when branch work is authorized. Populate and replace the PR
   template; do not leave empty task placeholders. Before a PR can be opened, record
   the checklist in a durable issue or plan, then move its active state into the PR.
4. Include applicable product-map and documentation maintenance in the same change.
5. List what is explicitly out of scope, so a reviewer can recognize scope creep.

## Working PR description

```md
## Outcome and scope
[Observable result and affected user journey; non-goals]

## Execution checklist
- [ ] Implement [specific outcome and owning path]
- [ ] Add [regression / negative-path] proof
- [ ] Run [real user journey or appropriate alternative]
- [ ] Reconcile affected Product Passport map (or state why unchanged)
- [ ] Check security/privacy, review threads and release gates

## Evidence
- Head: [full commit SHA] | Environment: [where]
- Passed: [exact command or observed journey, link to run/artifact]
- Failed / blocked / not run: [what and why, never a pass]
- UI / host checks: [actual environment, screenshot/build or unavailable]

## Handover
- State: [implemented / locally tested / CI green / host tested / deployed / released]
- Next: [one next action, owner, dependency]
- Open: [risks, unresolved reviews, decisions, rollback or migration if relevant]
- Checked against live PR/head: [date and head SHA]
```

The template is a starting point, not a mandatory ritual for trivial changes. Keep
three to seven meaningful outcome/proof items when possible, and expand for risky work.

## Checkpoint protocol

- After a meaningful step or before context changes, re-fetch live branch/PR head,
  diff, checks, open threads and relevant tracker. Compare against the checklist.
- Check a box only when its acceptance criterion is met and evidence is linked or
  located in the PR. Record exact command, outcome, environment and revision for
  verification. Separate source inspection from executing tests, and CI from host
  or production acceptance.
- A changed implementation or dependency can invalidate a previously checked
  verification box. Reopen the affected item until proof is rerun on the new head.
- Keep blocked/failed items unchecked, explain the cause and next action. If work
  is explicitly deferred, link a newly owning issue and say whether this blocks
  the PR. Never relabel an unresolved release blocker as a harmless follow-up.
- Do not overwrite another agent's newer PR description. Re-read and merge edits;
  in parallel work, choose one PR-status owner or partition PRs.
- Review feedback is work: link the thread, address it, update proof, then resolve
  the thread according to repository policy. Silence does not mean resolved.
- Before handover, do one fresh read of PR body, exact head, checks and open
  threads. Report current state, not the last remembered green CI result.

## Delivery loop

When asked to implement, fix, finish or work autonomously, do the next authorized
action rather than stopping at a plan or repeatedly asking for already-decided
details. The PR checklist tracks progress; it does not replace execution.

1. **Establish the actual task.** Read current code, tests, branch, open PRs,
   repository rules and prior decisions. State the outcome, constraints, relevant
   risks and concrete completion checks. Reuse an existing PR where it owns the
   work; do not create a second tracker or orchestrator.
2. **Work the checklist.** Do a small, coherent batch, inspect the real output,
   run appropriate regression and user-journey checks, then update the live PR
   with what passed, failed or remains blocked. Prefer fixing the owning layer
   to workarounds. Respect changes by parallel agents.
3. **Treat failures as a diagnostic branch, not a stopping point.** Inspect
   workflow and job states before changing code. A run with no jobs or logs
   may be blocked by billing, policy, permissions, concurrency or platform
   scheduling; a job with logs needs its own root-cause analysis. Fix what
   evidence identifies, then verify a new run on the relevant head.
4. **Continue safely.** If one external dependency blocks a task, complete
   independent authorized work and record the owner and exact next action.
   Do not spend repeatedly on non-actionable retries, fake a green check,
   lower verification gates or silently widen scope.
5. **Finish the agreed outcome.** Re-read the final diff, exact head, live
   check conclusions and unresolved review threads. Merge, deploy, publish
   or close issues only within authority and repository gates. Record
   implementation, tests, host checks and release state separately.

Use the relevant existing skill only when it contributes: `best-practices`
for learned rules, `product-passport` for real feature journeys,
`actions-cost` for CI spending and no-run failures, `issue-management`
for ownership, and `learning-loop` for durable lessons. Do not chain
skills just to demonstrate that they were used.

**Stop or escalate** when authority is missing for a sensitive action,
required access or evidence cannot be obtained, an irreversible change
is unapproved, or the only remaining work depends on an external decision.
Never promise later progress without a real scheduled automation. Report
what is completed now, what is blocked, why and who can unblock it.

## Closing

A PR is review-ready only when its included acceptance work is complete, evidence
is current, risks are explicit, and all actual repository gates are met. Checkboxes
are agent-maintained notes, not an enforcement mechanism. Required CI, protected
branches, independent review and human authorization remain separate controls.
No automatic merge, deploy, or issue closure is implied by a filled checklist.
