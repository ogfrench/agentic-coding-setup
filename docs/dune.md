# DUNE Engineering: Code-First Product Development

> **Status:** Working operating contract, revision 1. DUNE here describes our Dune-inspired engineering method, not an official implementation of another company's internal system. Adopt incrementally; repository code and observed behavior take priority over this handbook.

**Start at the Product Passport → verify the owning code → change one paved path → prove actual behavior → reconcile the Product Passport.**

## Plugin and reference links

- **Agentic Workflow (source and installation instructions):** [ogfrench/agentic-coding-setup](https://github.com/ogfrench/agentic-coding-setup)
- **Claude Code plugin:** [plugins/agent-workflow](https://github.com/ogfrench/agentic-coding-setup/tree/main/plugins/agent-workflow)
- **ChatGPT plugin source:** [portable/agentic-workflow](https://github.com/ogfrench/agentic-coding-setup/tree/main/portable/agentic-workflow)
- **Product Passport skill:** [canonical skill](https://github.com/ogfrench/agentic-coding-setup/tree/main/plugins/agent-workflow/skills/product-passport)
- **Delivery Loop skill:** [canonical skill](https://github.com/ogfrench/agentic-coding-setup/tree/main/plugins/agent-workflow/skills/delivery-loop)
- **Installation and host limits:** [README](https://github.com/ogfrench/agentic-coding-setup#choose-an-edition) and [host capability standards](https://github.com/ogfrench/agentic-coding-setup/blob/main/docs/host-capability-standards.md)

The plugin **provides guidance**, not implicit GitHub access, CI permissions, Claude hooks in ChatGPT, an automatic repo sync, or an installed runtime. To adopt DUNE, copy/adapt the local entrypoint and explicitly enable checks in each product repository. The published release and installed plugin version must be verified separately from the main branch.

## 1. The governing principle

| Layer | Authority | What it does not prove |
| --- | --- | --- |
| Requirements and user journeys | Define intended outcomes and constraints | That the implementation meets them |
| Executable source, configuration and dependency graph | Define the implementation and its actual boundaries | That behavior is correct |
| Tests, runtime journeys, deployed revisions and artifacts | Supply evidence of behavior at a specific revision/environment | That untested cases work |
| Product Passport and architecture map | Direct people/agents to owners, entrypoints, contracts and evidence | Independent product truth |
| PR and release record | Preserve decisions, exact SHA, review, and rollback | A deployment or host installation by itself |

A green test is evidence for *what that test asserts*, not for every outcome. Documentation may be stale. A self-written agent explanation or screenshot without verified behavior is not a substitute for evidence.

## 2. The DUNE change loop

\`\`\`mermaid
flowchart TD
    Passport["Product Passport: capability, owner and risks"]
    Inspect["Inspect executable source, tests and dependencies"]
    Plan["Plan smallest change and negative cases"]
    Implement["Change canonical owning code"]
    Guard["Types / contracts / boundary checks"]
    Proof["Native tests and real user journeys"]
    Gate{"Required evidence sufficient?"}
    Review["Review exact head SHA and merge"]
    Delivery["Authorized deploy or release"]
    Evidence["Runtime evidence and remaining uncertainty"]
    Reconcile["Reconcile passport with code and proof"]
    Passport --> Inspect --> Plan --> Implement --> Guard --> Proof --> Gate
    Gate -->|No| Implement
    Gate -->|Yes| Review --> Delivery --> Evidence --> Reconcile --> Passport
\`\`\`

**At entry:** locate the intended user outcome in the product-owned passport; verify its paths before trusting them. If none exists, create a *minimal* map grounded in source, clearly marking unverified journeys.

**During work:** trace caller → API/service → state/persistence → user-visible effect as applicable. Identify one canonical owner for each state and policy; reuse the product's existing stack, abstractions, CI, and test tools. Challenge a requirement or a stale map when the implementation contradicts it.

**At exit:** update only affected capability paths, contracts, risks, and evidence. No churn for unrelated cosmetic edits: record \`map unchanged\` and the reason. The PR must state the exact commit, checks actually executed, skipped or blocked checks, reviewer decision, and next action.

Do not automatically tag, deploy, publish, merge, change credentials, or authorize irreversible operations because the passport says to do so.

## 3. What a product-owned passport contains

Minimum \`docs/product-passport/README.md\` (or the already established canonical equivalent):

- **Product outcome:** who needs the capability, and what they can actually do.
- **Entrypoints and implementation owners:** executable files/modules, call paths and state ownership, not duplicated design prose.
- **Interfaces and dependencies:** stable boundaries, persistence, secrets, external services, generated assets and callers where applicable.
- **Positive and negative behavior:** happy path, failure cases, permissions/authorization, recovery and accessibility where relevant.
- **Verification:** names of real test commands, tests, full user journeys, environments and evidence links.
- **Limitations and uncertainty:** \`passed\`, \`failed\`, \`blocked\`, \`not_run\`; never silently upgrade a claim.
- **Release state:** implemented vs tested vs built vs deployed vs released vs accepted, each attached to an exact revision.

Keep features in separate records only when ownership/journey complexity warrants it. An index should link *real files*. Avoid maintaining a second copy of executable configuration, schema, or dependency versions.

### Optional machine-readable index

In repositories opting into the portable index convention:

\`\`\`json
{
  "schemaVersion": 1,
  "capabilities": [
    {
      "id": "example-feature",
      "summary": "A user can complete a meaningful end-to-end task",
      "map": "docs/product-passport/features/example-feature.md",
      "source": ["src/feature"],
      "tests": ["tests/feature.test.mjs"]
    }
  ]
}
\`\`\`

This is a **schema example**, not a claim that these paths exist. Never create dummy tests to satisfy a validator. The validator can check that paths exist and remain inside the checkout; it cannot infer whether a test is meaningful or whether the user journey works.

The optional [Product Passport validator](https://github.com/ogfrench/agentic-coding-setup/blob/main/scripts/check-product-passport.mjs) is a **local repository file**, not an automatically installed global CLI. In the central repo it can be run with:

\`\`\`sh
node scripts/check-product-passport.mjs
node scripts/check-product-passport.mjs --base <reviewed-base-sha>
node scripts/check-product-passport.mjs --evidence .dune/evidence.json
\`\`\`

Opt-in per-product integration must bring and maintain its own authorized copy or invoke a pinned reusable validator. \`--base\` provides advisory impact reporting only. \`--evidence\` is restricted to \`.dune/\`, with symlink checks to protect source files. The generated JSON marks \`behavior: not_run\` and \`hostAcceptance: not_run\`; do not change those fields to passed without separate evidence.

## 4. The paved path: make the correct change the easy change

Before inventing an abstraction, determine whether the product already provides one canonical path for the same responsibility:

| Concern | Preferred approach | Failure to avoid |
| --- | --- | --- |
| UI state | Existing product state owner and component patterns | Two components writing conflicting shared state |
| APIs and contracts | Typed schema, API boundary and product validation | Silent contract changes with no consumer test |
| Persistence | Existing migration and transactional path | Unversioned schema edits or inconsistent data |
| Design tokens | Generate derived outputs from canonical tokens | Editing duplicated CSS/theme representations separately |
| Plugin skills | Canonical skill source and validated host-specific packaging | Manually diverging Claude and ChatGPT behavior |
| CI and delivery | Existing required checks and authorized release workflow | Pushing bypasses, weakening gates or republishing a tag |
| Privacy and authorization | Verify policy at the owning trust boundary | Client-side-only checks or confidential output leaks |

Only promote a rule into a **mandatory CI check** if it detects a demonstrated failure with acceptable false positives, covers a legitimate counterexample, and does not make existing engineering disproportionately costly.

Do not enforce a universal folder layout or general bans on comments, framework primitives, hooks or architectural styles. Different stacks require different boundaries.

## 5. Testing and independent proof

For each changed capability, choose the smallest meaningful native test set and add the missing negative-path regression. For changes spanning boundaries, drive one representative real user journey through the app, CLI or host:

1. **Arrange:** known source revision, isolated fixtures, test account/services and environment.
2. **Act:** user-facing entrypoint, including permission, validation, error and recovery paths as applicable.
3. **Assert:** meaningful postconditions, not merely that a command exits 0 or an HTTP call returns 200.
4. **Capture:** commands, test logs, artifact paths/checksums, screenshots when visual behavior matters, commit SHA, environment and caveats.
5. **Clean up:** reset test state and avoid leaving credentials or test data in production.
6. **Compare:** independent review of sensitive, security, irreversible, or release-impacting changes.

A coding agent's own narrative is **not** independent verification. Static skill/evaluation fixtures are not real model runs. Record uncertainty explicitly and do not call packaging, installation, deployment and release the same milestone.

## 6. CI and release boundaries

Suggested progressive gates (only adopt what the product's actual stack supports):

| Gate | Example | Policy |
| --- | --- | --- |
| Source/build | Lint, typecheck, native unit tests | Required if already stable |
| Product contracts | API/schema imports, token generation parity, migrations | Required for changed boundary |
| Passport path integrity | Existing entrypoints, tests, local map | Advisory first; required after calibration |
| Real journeys | Browser/API/CLI host acceptance | Required when behavior crosses critical boundaries |
| Safety | Secrets/public-data checks, dependency audit, authorization assertions | Preserve existing required checks |
| Release | Exact approved commit, immutable tag, package checksum, rollback plan | Human-authorized publication |

Avoid duplicated CI pipelines and per-commit releases. A normal PR can prove a source candidate; it does not authorize a production release. Keep post-deployment evidence out of loops that continuously commit generated manifests and retrigger CI.

## 7. Product and agent ownership

- **Product Passport** owns navigation and code/evidence reconciliation.
- **Architecture Gardener** owns drift, dependency direction and structural root causes.
- **Delivery Loop** owns implementation, targeted regression and verification.
- **Session Continuity** owns the live PR checklist and durable handoff.
- **Learning Loop** promotes recurring demonstrated mistakes into tests, checks or curated practices.
- **Adversarial Review / Implementation Proof**, where available, provide independent review and host-specific validation, not automatic permission to merge.

Prefer one main assistant plus on-demand skills. Do not create a parallel DUNE orchestrator, multiple competing to-do trackers, or unverified specialist agents. For pruning, compare task completion and failures against a baseline with and without a proposed specialist before removing it.

## 8. Adoption contract for an existing repository

A minimal adoption PR should:

1. Inspect its code, current Product Passport, \`AGENTS.md\` / \`CLAUDE.md\`, tests, existing CI and release safeguards.
2. Add a short agent-facing **DUNE entrypoint** that links this handbook and the Agentic Workflow plugin. Prefer updating existing instructions over introducing another conflicting document.
3. Identify the *real* source/test/release commands and a native paved path. If unknown, say \`not_run\` or \`unverified\`, never guess.
4. Preserve product-owned evidence and privacy. Public generic guidance must not disclose information from private product repositories.
5. Make the PR auditable: change scope, exact head SHA, test status, passport impact and known release/host limitations.
6. Leave downstream CI gates unchanged unless a separately justified, stack-specific constraint is implemented and tested.

Never treat syncing an agent skill as permission to rewrite a product architecture. An adoption PR can be documentation-only, and must be labelled as such. A product's workflow is enforced only when its own executable guards are installed and passing.

### Example local entrypoint

\`\`\`md
# Agent navigation

Read docs/product-passport/README.md first, then verify its paths against code.
Use the DUNE handbook and Agentic Workflow plugin as engineering guidance.
Follow this repository's own test, security and release instructions.
On every substantive PR: owning code, negative regression, actual proof,
passport reconciliation (or "map unchanged"), exact SHA and remaining risks.
Do not claim host acceptance, deployment or release without evidence.
\`\`\`

## 9. Scale without 5,000-person bureaucracy at 5 people

| Scale | Navigation | Mechanical enforcement | Coordination |
| --- | --- | --- | --- |
| 5 | One small product map | Native tests and clear owner | Small PRs, one checklist |
| 50 | Feature maps and CODEOWNERS | Low-noise dependency/contracts | Team ownership, explicit interfaces |
| 500 | Product-local indexes and generated discovery | Cross-boundary contract tests | Federated repositories, versioned APIs |
| 5,000 | Searchable federated passport graph | Shared organization policy plus local tests | Decentralized ownership and provenance |

The invariant stays local: each product owns its code, tests, passport and release controls. A central plugin shares methods, not product truth.

## 10. Learning, measurement and continuous pruning

After a defect or costly handoff, capture the *class* of failure, the existing boundary, the regression that would catch it, and the lowest-cost durable solution. Use a check instead of another paragraph when the check has demonstrated value.

Track navigation failures, stale passport pointers, escaped regressions, unnecessary CI cost, handoff reconstruction time, deploy rollbacks, and unverified claims. Do not invent productivity multipliers from PR counts.

Prune a rule or skill only after representative positive, negative, ambiguous and missing-host cases show no unacceptable regressions. Keep independent security review boundaries when removing an agent would undermine them.

## 11. PR handover and acceptance checklist

For every substantive PR, report:

- **Decision and scope:** desired user outcome and explicit non-goals.
- **Implementation:** changed canonical owners and affected boundaries.
- **Evidence:** exact head SHA, commands and outcomes, actual test/journey assertions, artifacts and environment.
- **Known gaps:** failed, blocked, skipped or unavailable checks; user-facing uncertainties.
- **Passport reconciliation:** affected capabilities and links or \`map unchanged\` with reason.
- **Review:** unresolved comments, required approval, rollback.
- **Release state:** separately identify implemented, tested, merged, deployed, installed, released and host accepted.

### What is and is not shipped

This handbook and the Agentic Workflow plugin provide a navigational and behavioral method. They do **not** automatically enforce DUNE across other repositories. Enforcement requires opting into product-owned, executable checks and observing them on the exact proposed revision.

The canonical source is maintained through reviewed PRs in [Agentic Workflow](https://github.com/ogfrench/agentic-coding-setup); private product-specific examples, code, operations and evidence stay in their owning repositories.
