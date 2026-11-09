# agentic-coding-setup

My shared agentic coding workflow: reusable skills, engineering practices, agent instructions, plugins and integrations, with explicit installation paths for different AI coding environments. The established automation is built around Claude Code; an optional, portable workflow plugin also targets ChatGPT and Codex. These integrations are not interchangeable or equally verified.

This is also a living record of lessons from building software with coding agents. Learnings become reviewed practices, then skills, subagents, hooks, commands or plugins where that improves real work. The knowledge base and [Product Passport](#current-architecture-review) provide reusable methods, while each repository's code, tests and observed behavior remain the source of truth. See [Learnings and practices](#learnings-and-practices). Public content never includes client information or private-repository material; see [Public by design](#public-by-design).

## Supported surfaces and boundaries

| Environment | What this repository provides | Current boundary |
| --- | --- | --- |
| **Claude Code (local and cloud)** | Primary user-level setup (`setup-user.sh`), project sync (`sync-to-repos.sh`), skills, agents, hooks, MCP configuration and reviewed marketplace plugins | Claude-specific `.claude/` files and CLI commands; actual installation is explicit and host-dependent |
| **ChatGPT** | Optional four-skill [`ogfrench-workflow`](portable/ogfrench-workflow/) plugin, also imported privately | Not the full Claude setup; no automatic project sync or implied access to local files, GitHub or MCP tools |
| **Codex / compatible ChatGPT desktop environments** | Optional repository-local marketplace definition and the same portable workflow source | Marketplace file checks exist; real host installation and skill behavior still need acceptance testing |
| **Other coding assistants, including GitHub Copilot** | Public, reusable principles and reference material that can inform future adapters | No tested installer, native integration or feature parity is claimed |

Platform support is intentionally capability-specific. A source package, successfully imported plugin and fully tested host installation are different milestones. Consult the [host contract](docs/portable-workflow-plugin.md) and [acceptance record](docs/portable-workflow-acceptance.md) before distributing anything as supported. Skills are instructions, not tool permissions or credentials.

## Reviewed marketplace updates

The shared `ogfrench` Claude Code marketplace is configured with `autoUpdate: false`. A reviewed upstream change is deployed through separate downstream sync PRs, not automatic marketplace refresh. The sync migrates only the managed `ogfrench` marketplace entry from earlier installations (including the repository's old name), leaving unrelated marketplace settings and project-owned overrides intact. A deliberate `setup-user.sh` invocation remains a user-triggered installation/update, not a background policy. Verify the effective setting on each actual Claude Code host; user-level and managed settings may have higher precedence.

## Optional cross-platform companion

The [ogfrench Workflow plugin](portable/ogfrench-workflow/) packages four focused review workflows for Claude Code and ChatGPT/Codex, without installing hooks, MCP servers or third-party dependencies. It is optional and separate from the established personal setup and project sync. See the [host compatibility and release gate](docs/portable-workflow-plugin.md) and [acceptance evidence requirements](docs/portable-workflow-acceptance.md). Its source has merged, but host acceptance and public distribution remain unverified.

## Source release | 9 November 2026

**agent-workflow v1.10.1** is the final reviewed source package including Product Passport. The optional **ogfrench-workflow v0.1.1** remains a private preview, not host-certified. See the [release inventory](docs/releases/2026-11-09.md). Source merge does not install plugins, publish the private ChatGPT plugin, tag a GitHub release or sync downstream projects.

## Claude Code installation and repository sync

The following two layers are **Claude Code-specific**, not universal setup commands for every coding assistant.

**User scope: `setup-user.sh`.** It installs every plugin in `user/plugins.txt` and copies the skills into `~/.claude/skills` and the subagents into `~/.claude/agents`, at user scope. Run it once on a laptop. For cloud sessions, paste this as the setup script of the environment on claude.ai/code. It runs before Claude starts, in every repo that uses the environment:

```sh
curl -fsSL https://raw.githubusercontent.com/ogfrench/agentic-coding-setup/main/setup-user.sh | bash
```

Cloud sessions do not install plugins solely because a repository's settings enable them.
Account-synced skills can load separately, and the rules vary for project cloud threads.
The setup script remains the explicit path for this repository's pinned plugins.
Check the current [skill loading rules](https://code.claude.com/docs/en/skills) before assuming
that repository, plugin and account skills are equivalent.

**Project scope: `sync-to-repos.sh`.** It commits the skills into each repo's `.claude/skills/` and merges `project/settings.json`, so teammates' local sessions and non-project cloud sessions that load repository skills get them. Cloud project threads use account-synced skills instead. Repos only enable team-useful plugins. Personal response modes live as opt-in Markdown skills under `user/skills/`; they are not pushed to teammates or installed as third-party plugins.

For centrally managed agent instructions and practices, this repo is the upstream source. Project code, tests and actual behavior remain authoritative for each product. The managed copies in each project are overwritten on the next Claude Code sync, so edit shared content here.

**Provenance and drift detection.** Each synced project records the central source commit and a SHA-256 fingerprint of its managed skill/agent/command copies in `.claude/claude-code-setup.json`. From a checkout of this repo, run `node scripts/check-sync.mjs /path/to/project` (or add `--json`) to distinguish current, outdated, locally modified, legacy and unverifiable copies. It reads only; it does not update a project. The next deliberate sync overwrites managed copies, while project-owned skills remain untouched. Existing projects acquire these stamps on their next sync. CI in a project can run the checker after checking out this source, but a standard project is not blocked automatically until its manifest is upgraded.

## Layout

| Path | What it is | Lands in each repo as |
| --- | --- | --- |
| `plugins/<plugin>/skills/<name>/SKILL.md` | A skill | `.claude/skills/<name>/` (copied) |
| `plugins/<plugin>/agents/<name>.md` | A subagent | `.claude/agents/<name>.md` (copied) |
| `plugins/<plugin>/commands/<name>.md` | A slash command | `.claude/commands/<name>.md` (copied) |
| `project/settings.json` | Hooks, permissions, enabled plugins, env | merged into `.claude/settings.json` |
| `project/mcp.json` | MCP servers | merged into `.mcp.json` |
| `project/retired.json` | Settings keys to take back out | removed from `.claude/settings.json` |
| `user/plugins.txt` | User-scope plugins, including 21st | not synced; installed by `setup-user.sh` |
| `user/skills/<name>/SKILL.md` | My opt-in, Markdown-only personal modes | `~/.claude/skills/<name>/` (not synced to repos) |
| `.claude-plugin/marketplace.json` | The `ogfrench` marketplace | registered by the merged settings |
| `repos.local.txt` | Which repos get all this, and their stacks: `owner/name nextjs,postgres`. Gitignored: a repo's name can name a client | |
| `public-repos.txt` | My repos that are public, so they may be named here | |
| `CONTRIBUTING.md`, `.github/` | The contribution rules (pull requests only), the PR template and the CI workflow | not synced |
| `learnings/` | Dated raw lessons, one per file | not synced |
| `kb/practices/` | The practices: one node per rule, with edges to its learnings and tools. The source | the cards for the repo's stacks, in `.claude/knowledge/practices/` |
| `kb/tools/` | One node per installed plugin, skill and agent: what it is, when to reach for it | listed in `.claude/knowledge/index.jsonl` |
| `kb/_vocab.json` | The allowed concerns, stacks, severities, tool kinds and states | not synced |
| `kb/index.jsonl`, `kb/graph.json`, `kb/INDEX.md`, `kb/bundles/` | Generated by `scripts/build-kb.mjs`: one JSON line per node, the full graph, a router, one digest per stack | a filtered `bundle.md`, `must.md` and `index.jsonl` in `.claude/knowledge/` |
| `scripts/kb-new.mjs`, `scripts/kb-audit.mjs` | Scaffold a learning; report what is stale or ready to promote | not synced |
| `plugins/agent-workflow/skills/best-practices/` | The practices as topic files, generated from `kb/practices/` | `.claude/skills/best-practices/` (copied) |
| `CLAUDE.md` | How Claude keeps the knowledge base: the public-repo rule and the promotion ladder | not synced |

Merging keeps everything a repo already has. Objects merge key by key, arrays gain the entries they lack, and a value the repo already set wins, so a repo's own permissions, hooks and disabled plugins survive. Merging never removes anything, so to take a key back out, list it in `project/retired.json`. Copies are listed in `.claude/claude-code-setup.json` inside each repo. A skill deleted or renamed here is therefore removed there on the next sync, while skills a repo wrote itself are never touched.

## Current architecture review

The [October 2026 research and skill inventory](docs/claude-practices-2026-10.md)
records a source-checked review of our skills and third-party plugins. Default
to one main agent loop, keep reusable know-how in on-demand skills and use tools
for live actions. Subagents require an evaluation advantage, not just a cheaper model.
The historic review does not itself uninstall anything; `setup-user.sh` now removes the retired personal plugins from user scope on its next run. No project copies are rewritten by this review;
the sync and installation steps remain explicit.


**AI plugin experience design.** The [`plugin-experience-design`](plugins/agent-workflow/skills/plugin-experience-design/SKILL.md) skill helps align plugin landing pages, installer packages and cross-host setup without claiming unsupported compatibility. Its [host and release checks](plugins/agent-workflow/skills/plugin-experience-design/references/acceptance.md) require clean-install proof before a download is called ready. It is synced with the other agent-workflow skills; running the setup script also installs it at user scope.

**Agent-ready knowledge bases.** The `knowledge-base-builder` skill documents source-native ingestion, source metadata, scoped retrieval, hybrid ranking, MCP contracts, freshness, privacy and evaluation. Use it to add knowledge retrieval to a repo without replacing its own sources. See [`SKILL.md`](plugins/agent-workflow/skills/knowledge-base-builder/SKILL.md) and its detailed references. It does not automatically index other repositories or activate a remote service.

**Product Passport (standard engineering workflow).** For substantive feature, regression, and release-verification work, use the [`product-passport`](plugins/agent-workflow/skills/product-passport/SKILL.md) skill to trace executable source code first, then follow existing tests and real product verification journeys. Feature maps and documentation are derived navigation aids, never the source of truth. It reuses each product's existing CLI, tests, and rendering tools, records what was actually exercised, and routes durable corrections into code or regression protection. [Feature, evidence, and maintenance contracts](plugins/agent-workflow/skills/product-passport/references/feature-contract.md) are on demand. Keep product-owned maps and private proof in the product repository. See the [implementation scratchpad](docs/product-passport/SCRATCHPAD.md) for the unmerged rollout status.

## Adding things

**A skill.** Create `plugins/frog-writing/skills/<name>/SKILL.md` (or `plugins/agent-workflow/skills/` for how work is run) with `name` and `description` in its frontmatter, and add a node for it in `kb/tools/` (`node --test` fails without one). If it belongs to a different theme, start a new plugin in `plugins/<plugin>/` and add an entry to `.claude-plugin/marketplace.json` with `"source": "./plugins/<plugin>"`.

**A hook.** Add it under `hooks` in `project/settings.json`, in the same shape as a normal settings file. Hooks belong here and not inside a plugin, because plugin hooks never run in cloud sessions. A hook runs in every repo, on Linux in the cloud and on Windows locally, so keep the command portable.

**An MCP server.** Add it under `mcpServers` in `project/mcp.json`. Never commit a secret. Write `"Authorization": "Bearer ${SOME_API_KEY}"` and set `SOME_API_KEY` in the cloud environment's settings on claude.ai/code and in your shell locally. Servers that only run on one machine, such as local wrapper scripts or a local build, don't belong here.

**A plugin.** For a third-party one, add an entry to `.claude-plugin/marketplace.json` pinned by `sha`. To update a pinned plugin, read the upstream diff and bump the `sha`. Then add it to `user/plugins.txt` if it is just for you, or enable it in `project/settings.json` if every repo should have it. Re-run `setup-user.sh` locally; cloud sessions pick it up on their next start.

**A repo.** Add `owner/name` to `repos.local.txt`, which stays on the laptop, followed by its stacks if it has any (`owner/name nextjs,postgres`). The first sync after the list left git recovers it from the clone's history by itself.

## Learnings and practices

```
learning (raw) -> practice (curated) -> promoted (skill, subagent, hook, command, plugin, MCP) -> retired
```

- **Capture** a lesson as `learnings/YYYY-MM-DD-slug.md` with the template in `learnings/README.md`. From another repo, the `learning-loop` skill writes it here, or to that repo's `.claude/learnings-inbox.md` to be harvested later. A lesson that cannot be told without a client or a private repo goes to a private notes repo of your own (same template, no sync), or to that project's `CLAUDE.md`. When the same private lesson shows up on a second or third project, rewrite it without names and bring it here.
- **Curate** it into a node in `kb/practices/`, with `derived_from` naming the learning, then run `node scripts/build-kb.mjs`. The `best-practices` skill is generated from the nodes and synced everywhere, so every session can read it.
- **Promote** a practice when it earns a heavier form: the ladder in `CLAUDE.md` says when a practice should be a skill, a subagent, a hook, a command, a plugin or an MCP server. `model-delegation` and the `cheap-reviewer` subagent are the first ones promoted.
- **Retire** what stops being true; the learning keeps the reason.

`node --test` checks the links both ways: every learning's `promoted_to` exists, every practice has evidence that exists, and the generated files match their nodes.

### Reading it cheaply

Four tiers, each with a budget in `lib/kb.mjs`, enforced by `test/budgets.test.mjs` (tokens estimated as characters / 4):

| Tier | What | Budget |
| --- | --- | --- |
| T0 always on | name and description of every skill and agent; in a project, `must.md`, printed by a SessionStart hook | 1,100; 600 |
| T1 per task | `kb/bundles/<stack>.md` (one line per practice), `kb/INDEX.md`, a SKILL.md body | 2,000, 1,500, 1,500 |
| T2 per lookup | one `kb/practices/<id>.md` card | 150 |
| T3 on invocation | the long reference skills (`frogify`, `deslopify`, `humanizer`) | none |

Find things with `grep -i <term> kb/index.jsonl` (one JSON line per node, edges included), then open the card. A skill's own `README.md` is not copied to other repos; its `LICENSE` is.

### As a function of the project

A repo's stacks decide what it gets. Put them after the repo in `repos.local.txt` (`owner/name nextjs,postgres,shadcn`; the allowed names are in `kb/_vocab.json`, and a typo fails the sync). The sync writes `.claude/knowledge/` in that repo: `bundle.md` (the `any` practices plus those for its stacks, one line each), `practices/<id>.md` (the cards), `index.jsonl` (search, tools included) and `must.md`. A SessionStart hook in the merged settings prints `must.md`, a few lines, and nothing else is loaded until a task needs it. The folder is rewritten whole each sync, and a repo that already has its own `.claude/knowledge` keeps it.

Mark a practice with a stack only when the lesson holds on that stack alone. Today every practice is `any`, because the learnings behind them do not show otherwise, so every repo gets the same bundle until one is tagged.

## Behavioral skill evaluations

The two first-party plugins have cases in `plugins/*/evals/`. The regular
`node --test` suite checks that cases, graders and skill-routing coverage
remain structurally valid, **not** whether Claude produces good answers.
For behavior, run the documented `claude plugin eval` commands from each
plugin directory on an authenticated machine. They compare fresh sessions
with and without the plugin and incur model usage; no automatic paid CI runs
are enabled. Keep reports and private prompts outside this public repository.

Do not use a green static check as evidence that a plugin improves quality.
Treat measured task completion and regressions as the promotion gate.

## Maintenance

Nothing here fixes itself, so a weekly look is the habit. `node scripts/kb-audit.mjs` lists practices and tools nobody re-checked in 120 days, raw learnings older than 14 days, practices backed by two learnings but enforced by nothing (candidates for a skill or hook), practices that rest on judgment alone, and how much token headroom is left. It never fails a build: dates move on their own and commits do not.

- **Re-verify or let go.** A stale practice is re-read against the code and the tool docs. If it holds, bump `last_verified`. If not, set `status: stale` (it leaves the bundles but stays in the graph) or `retired`.
- **Over budget means merge.** The budgets are in `lib/kb.mjs`. Raise none of them; fold two practices into one or retire one.
- **Capture** with `node scripts/kb-new.mjs learning <slug>`. The file carries `TODO`s that `node --test` rejects until they are written.

The upkeep can run unattended as a weekly scheduled task (a fresh session in this repo, with the prompt below). It opens a PR, never pushes `main`, and merges only a PR that is nothing but date bumps with no privacy findings:

```
Weekly upkeep of the public repo ogfrench/agentic-coding-setup. Clone it if it is not in the working
directory. Pull requests only, never push to main (CONTRIBUTING.md). Write no names of clients,
people or private repos anywhere, including PR text and your final message; refer to a finding by
file and line, never by quoting it.

1. Create branch kb/audit-<date>, run `git config core.hooksPath .githooks` and `node scripts/kb-audit.mjs`.
2. Accuracy: for each item it lists, check the claim against current docs or release notes (Claude
   Code, and the tools in kb/tools) by web search. Change only what a source confirms: bump
   last_verified or last_reviewed, set status stale or retired with the reason in the body, or add a
   tool node with state candidate. If it lists nothing, change nothing.
3. Privacy and sensitivity review. The automated check cannot know a name, so read as a careful human
   would: what changed in the last 7 days, plus all of learnings/, kb/practices/, kb/tools/,
   public-repos.txt and the README. Look for a client, employer or project name, a private repo's
   name, a person's name, confidential text, a secret, hostname or internal URL, and a lesson only
   tellable with the confidential part left in. Check that every learning's source is a listed repo
   or "a private project", that evidence from a private repo names no file, commit or issue, and
   that every repo in public-repos.txt is still public.
4. Fix a finding by rewording it generically or removing it. Note that git history still holds the
   old text; never rewrite history or force-push. State a serious finding at the top of your final message.
5. Run `node scripts/build-kb.mjs`, `node --test`, `node scripts/check-public.mjs` and
   `claude plugin validate . --strict`.
6. Open a PR titled "kb: weekly audit" with each change and its source. Merge only if CI is green
   and the change is only date bumps with no privacy findings.
7. If you cannot push or open a PR, report the findings in your final message instead.
```

## Public by design

Anyone can read this repo, its history and its CI logs. So it never names a client, an employer's confidential work, a private repo or a person, and it carries no secrets, hostnames, IPs or email addresses. `CLAUDE.md` has the full rule.

`scripts/check-public.mjs` enforces it, in three places:

- **Before a push**, from `.githooks/pre-push`, on the commits being pushed: their lines, file names and messages. `setup-user.sh` enables the hook for the clone it runs from; elsewhere, run `git config core.hooksPath .githooks` once.
- **In `node --test`**, on every tracked file.
- **In CI**, on the commits of each push or PR, as a backstop. By then the commit is already public, so the hook is the guard that counts.

It flags any `ogfrench/` repo missing from `public-repos.txt`, any email address but the no-reply and `example.com` ones, and any IP address outside loopback and the documentation ranges. It cannot know a client's name, because a list of such names can't live in a public repo. Reading your own diff for names is part of every change, and the PR checklist asks for it. The weekly audit adds a human-style read of the whole repo for the same thing. A finding names the place and the rule, never the matched text, and a file whose name is flagged is shown by number.

## Checking and shipping a change

Changes go in through pull requests only, never a push to `main`. The rules are in [CONTRIBUTING.md](CONTRIBUTING.md).

```sh
node scripts/build-kb.mjs                   # regenerate topic files, bundles and the index after editing a node
node --test                                 # unit tests, generated files up to date, budgets, public check; no dependencies
node scripts/kb-audit.mjs                   # the weekly look: what is stale or ready to promote
claude plugin validate . --strict           # marketplace manifest
DRY_RUN=1 bash sync-to-repos.sh             # prepare every repo, push nothing
MERGE=1 bash sync-to-repos.sh               # one PR per repo, squash-merged
bash sync-to-repos.sh owner/name            # just one repo
```

CI runs `node --test`, the public check on the pushed commits, plugin validation (the marketplace and each plugin) and an apply into an empty folder with stacks, on every PR and every push to `main`. `main` is protected: a PR is required, `check` must pass, and merge commits carry only the PR title. A real sync refuses to run unless the checkout is exactly `origin/main` and CI passed on that commit, so only what CI tested reaches the repos.

## The sync bot

Dependabot for this setup. `.github/workflows/sync.yml` runs `sync-to-repos.sh` every Sunday at
05:00 UTC (06:00 in Amsterdam in winter, 07:00 in summer: Actions schedules are UTC only), or
now from Actions → sync → Run workflow. Tick **merge** on a run by hand to also mark every sync
PR ready and squash-merge it; the scheduled run never merges. It opens a sync PR in each listed repo, or updates
the one already open there, as a draft with the `skip-e2e` label where the repo has one. It
opens a ready PR where drafts are not available. When the open PR already holds the same
files, it pushes nothing, so the repo's CI does not run again for no change.
Unless you tick merge, nothing is merged: the PRs wait for you. Weekly, not on every merge to `main`, because each
refresh re-runs the target repo's CI, which costs minutes in a private repo. The same gate
applies as by hand: only a `main` that passed `check` is synced.

Logs here are public and the repo list is not, so the bot runs with `SYNC_QUIET=1`. It prints
`repo 3 of 9` and a count, never a name, a PR link or an error's text. A failed repo is named
by its position in the list: run `bash sync-to-repos.sh owner/name` on the laptop to see why.
`test/sync-quiet.test.mjs` fails if a name gets through.

A PR's description warns when a managed copy in that repo had been edited by hand, because
the sync overwrites it.

**The buffer.** Each repo records the central commit it was synced from. Most central commits
change no synced file (a script, a README, a learning), so a repo whose files all match and
that is at most `SYNC_BUFFER` (2, in `lib/sync-status.mjs`) changes behind gets no PR: the
bot prints "in sync within the buffer". A change is a commit on `main`'s own line, so a PR
merged with a merge commit counts once. A third change refreshes it, so the record never
drifts far. The drift checker uses the same rule and calls such a repo current. Any change to
a synced file still syncs at once.

**Setting it up, once (GitHub settings, by you):**

1. **Create a GitHub App** (Settings → Developer settings → GitHub Apps → New). Name it
   anything, turn the webhook off, and give it these repository permissions: Contents read
   and write, Pull requests read and write, Metadata read. Nothing else.
2. **Install it on the listed repos only**, not on all repositories.
3. **Create the `sync` environment** in this repo (Settings → Environments → New
   environment). Under deployment branches and tags, choose "Selected branches and tags"
   and add `main` only. That is what keeps the secrets away from any other branch, even one
   whose copy of the workflow was edited.
4. **Generate a private key** on the App's page. Then, in the `sync` environment (not the
   repository-wide secrets):
   - add the variable `SYNC_APP_ID` with the App's ID;
   - add the secret `SYNC_APP_PRIVATE_KEY` with the whole `.pem` file;
   - add the secret `SYNC_REPOS` with the contents of `repos.local.txt`.
5. **Run it once by hand** from the Actions tab and read the summary.

A repo added to the list needs both: a line in `SYNC_REPOS` and the App installed on it.
`repos.local.txt` stays the list for runs from the laptop.

## Personal response modes

`/caveman` and `/ponytail` are now **original, user-only Markdown skills** in
[`user/skills/`](user/skills/). `/caveman` requests terse but accurate responses;
`/ponytail` requests the smallest correct code change. Both require explicit
invocation. They are not always-on hooks, don't run third-party code or collect
usage data, and are not copied into project repositories.

Re-run `bash setup-user.sh` from a current checkout on each machine or in the
cloud setup environment. The script uninstalls the retired user-scope
`caveman@ogfrench` and `ponytail@ogfrench` plugins, copies the two local
skills to `~/.claude/skills/` (or `CLAUDE_CONFIG_DIR/skills/`), and continues
to install **21st** unchanged. If an old plugin was enabled at project or local
scope separately, uninstall it at that scope too. Restart or reload Claude Code
for the new session configuration to take effect. Nothing in a GitHub merge
can change a running local Claude session.

## Plugins

| Plugin | Source |
| --- | --- |
| `frog-writing` | This repo. `frogify` and `deslopify` are mine. `humanizer` is vendored from [blader/humanizer](https://github.com/blader/humanizer) at `9600f2b`, MIT, with its license kept in its folder. |
| `agent-workflow` | This repo. How work is run: `model-delegation` (which model does which work), `best-practices` (the curated practices), `learning-loop` (capture, curate, promote), `visual-loop` (show design options on the real thing, read every shot, loop until one is picked), `token-efficiency` (fewer turns and tokens for the same work: batching, lean context, background waits, environment facts saved once), `session-continuity` (keep long work alive across compactions: state in durable places, check-ins that stand alone, the work checked against the plan, open points raised), `actions-cost` (estimate GitHub Actions runner-minutes before merging what triggers a workflow), `netlify-cost` (estimate a Netlify site's builds, credits and edge runs before changing its config, and a build-skip script that builds when unsure), `issue-management` (MECE backlog ownership, decision stages, issue writing and consolidation), `knowledge-base-builder` (provenance, retrieval, MCP and evaluation) and the `cheap-reviewer` subagent. |
| `presentation-craft` | This repo. Brand-neutral `presentation-story`, `presentation-design`, `design-system-adapter` and `visual-restraint` skills, with references and routing evaluations. They contain no proprietary fonts, logos, templates or client materials. `setup-user.sh` already copies these skills into user scope and the repo sync distributes them to projects. Installing the marketplace plugin separately is optional and may duplicate the user-scoped skills. |
| `ogfrench-workflow` | This repo, optional portable companion. Four skills for setup audit, adversarial review, implementation proof and release handover. Dual manifests for Claude Code and ChatGPT/Codex; not part of personal setup or automatic repo sync. See [compatibility and acceptance](docs/portable-workflow-plugin.md). |
| `21st` | [21st-dev/claude-code-plugin](https://github.com/21st-dev/claude-code-plugin), pinned by SHA |

The official plugins (superpowers, context7, playwright and the rest) come from `claude-plugins-official`, which Claude Code already knows. `project/settings.json` enables them directly.
