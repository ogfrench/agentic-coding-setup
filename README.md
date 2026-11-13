# Agentic Workflow

**Plan, build, review and ship software with AI assistants that work from evidence.**

Agentic Workflow is a modular product-engineering toolkit for **Claude Code and ChatGPT**. It combines specialized skills, reusable engineering practices, architecture and visual-design methods, knowledge management, and end-to-end delivery guidance.

It favors one capable assistant using the right skill for the job over rigid processes or unnecessary multi-agent orchestration. **Code and observed behavior take precedence over documentation; tests and real user journeys determine correctness.**

## What it helps you do

| Capability | What it covers |
| --- | --- |
| **Architecture and product understanding** | Map features and dependencies, detect architecture drift, investigate root causes, and keep implementation-backed product maps. |
| **Development and delivery** | Plan scoped changes, edit existing code, manage issues and PRs, recover CI, and carry work through verified handover. |
| **Design and diagrams** | Review real UI output, iterate on visual improvements, and produce editable Mermaid architecture, process, and sequence diagrams. |
| **Knowledge and research** | Build source-grounded knowledge bases, retrieve curated practices, capture learnings, and design retrieval and MCP integrations. |
| **Agent coordination** | Select useful skills or tools, delegate only when warranted, preserve progress across sessions, and manage context efficiently. |
| **Cost and operations** | Review GitHub Actions and Netlify costs, audit plugin installation, and maintain disciplined release workflows. |

Skills are invoked selectively. Installing the package does **not** grant repository access, credentials, browser capabilities, MCP connections, or background execution.

## Choose an edition

| | **Claude Workflow** | **ChatGPT Agentic Workflow** |
| --- | --- | --- |
| Release candidate | `2026.11.4` | `2026.11.4` |
| Skills | 18 canonical engineering, story and design skills | 22 portable skills (18 shared + 4 review and verification skills) |
| Environment | Claude Code | ChatGPT |
| Integration | Claude-specific setup, agents, hooks, and optional project sync | Skills and curated knowledge using the tools available in ChatGPT |
| Package | [Claude source](plugins/agent-workflow/) | [ChatGPT package](portable/agentic-workflow/) |

The editions share canonical engineering guidance and a coordinated release version, but **not identical runtime capabilities**. The historical four-skill [ChatGPT Workflow Lite](portable/ogfrench-workflow/) is deprecated for new ChatGPT installations and retained for compatibility.

## Plugin ecosystem

The marketplace also includes the writing specialist and compatibility plugins:

| Plugin | Purpose |
| --- | --- |
| `agentic-workflow` | Full Claude Code edition of Agentic Workflow (18 canonical engineering, story and design skills). Published as `claude-workflow` through 2026.11.3. |
| `frog-writing` | Specialist writing and copy refinement. |
| `chatgpt-workflow-lite` | Deprecated four-skill compatibility package, not the full ChatGPT edition. |
| `21st` | Pinned, externally maintained UI tooling. |

The full **ChatGPT `agentic-workflow`** edition is packaged separately and does not require these Claude marketplace entries.

## Core skills

| Area | Skills |
| --- | --- |
| Architecture and products | [Architecture Gardener](plugins/agent-workflow/skills/architecture-gardener/SKILL.md), [Product Passport](plugins/agent-workflow/skills/product-passport/SKILL.md), [Diagram Craft](plugins/agent-workflow/skills/diagram-craft/SKILL.md) |
| Implementation and delivery | [Delivery Loop](plugins/agent-workflow/skills/delivery-loop/SKILL.md), [Issue Management](plugins/agent-workflow/skills/issue-management/SKILL.md), [Session Continuity](plugins/agent-workflow/skills/session-continuity/SKILL.md) |
| Engineering knowledge | [Best Practices](plugins/agent-workflow/skills/best-practices/SKILL.md), [Learning Loop](plugins/agent-workflow/skills/learning-loop/SKILL.md), [Knowledge Base Builder](plugins/agent-workflow/skills/knowledge-base-builder/SKILL.md) |
| Design and experience | [Visual Loop](plugins/agent-workflow/skills/visual-loop/SKILL.md), [Plugin Experience Design](plugins/agent-workflow/skills/plugin-experience-design/SKILL.md) |
| Orchestration and efficiency | [Model Delegation](plugins/agent-workflow/skills/model-delegation/SKILL.md), [Token Efficiency](plugins/agent-workflow/skills/token-efficiency/SKILL.md), [Actions Cost](plugins/agent-workflow/skills/actions-cost/SKILL.md), [Netlify Cost](plugins/agent-workflow/skills/netlify-cost/SKILL.md) |

Three shared skills, **Presentation Story**, **Presentation Design** and **Design System Adapter**, support narrative work and independent authoring when appropriate. **Visual Loop** incorporates visual-restraint review. A named specialist such as frogViz owns its real template/build/export pipeline. The ChatGPT edition additionally includes **Adversarial Review, Implementation Proof, Release Handover, and Setup Audit**. Read the [plugin product map](plugins/agent-workflow/skills/product-passport/references/plugin-product-map.md) for ownership, boundaries, and routing.

## Get started

### Claude Code

From a reviewed checkout:

```bash
git clone https://github.com/ogfrench/agentic-coding-setup.git
cd agentic-coding-setup
bash setup-user.sh
```

This installs supported user-level Claude Code skills and plugin configuration. Project setup is separate: `sync-to-repos.sh` copies managed skills into selected repositories, preserving project-owned settings and content. Installation and synchronization are explicit actions, not automatic consequences of merging a PR.

See the [full Claude Code setup and sync guide](docs/maintainers-guide.md#claude-code-installation-and-repository-sync) for cloud sessions, local overrides, drift checking, and rollback.

### ChatGPT

Use the full [Agentic Workflow ChatGPT edition](portable/agentic-workflow/). It contains 22 portable skills, their references, and curated public engineering knowledge.

The plugin is currently **privately installed**; this public repository provides its source and [packaging and host contract](docs/agentic-workflow-chatgpt.md), not a public one-click installation. The package does not include Claude-specific hooks, installers, or local MCP executables.

## How it works

**Canonical skills and practices → host-specific package → explicit installation → real-task verification.**

- The canonical engineering skills live in [`plugins/agent-workflow/skills/`](plugins/agent-workflow/skills/).
- Reviewed lessons and practices live in [`learnings/`](learnings/) and [`kb/`](kb/). The generated knowledge index supports targeted lookup instead of loading everything into every task.
- The Claude Code setup can integrate skills, hooks, agents, and project sync; the ChatGPT builder adapts skills for a skills-only host.
- A source merge, passing CI, installed plugin, and proven end-user outcome are separate milestones.

## Documentation

- [Plugin product map](plugins/agent-workflow/skills/product-passport/references/plugin-product-map.md): ecosystem, skill ownership, supported hosts, release boundaries.
- [Repository engineering and maintainer guide](docs/maintainers-guide.md): architecture, setup, sync, knowledge base, maintenance, CI, and security.
- [ChatGPT edition and packaging](docs/agentic-workflow-chatgpt.md): contents, capability contract, installation, and integrity checks.
- [Host capability standards](docs/host-capability-standards.md): what instructions, available tools, and verification can actually do.
- [Skill evaluations](plugins/agent-workflow/evals/README.md): behavioral evaluation cases and acceptance boundaries.
- [Contributing](CONTRIBUTING.md): PR requirements, tests, and privacy controls.

## Releases

**Next full-edition release candidate: `2026.11.4`** (not published). **Last published: `2026.11.3`**. [Read the last release](https://github.com/ogfrench/agentic-coding-setup/releases/tag/v2026.11.3).

Both full editions follow `YYYY.MM.N` CalVer and are checked for version parity. The standalone presentation-craft plugin is retired; its content is part of Agentic Workflow. The separate frog-writing specialist and deprecated Lite package retain their own versions. The published first release uses the historical tag `v.2026.11.1`; future Git tags use the convention `vYYYY.MM.N` (no dot after `v`). See [release conventions](docs/maintainers-guide.md#release-versioning-and-publication).

This repository is public by design. Private client code, research corpora, credentials, and project-specific evidence belong in their owning repositories.
