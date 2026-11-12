# Agentic Workflow for ChatGPT | Full portable edition

**Decision (2026-11-12):** `agentic-workflow` v1.13.0 is the **canonical ChatGPT edition**; `chatgpt-workflow-lite` v1.12.0 is deprecated for new ChatGPT installations. This affects ChatGPT distribution only. The full Claude Code plugin `claude-workflow` v1.12.0, its user-level setup scripts, subagents, project sync and hooks are maintained separately.

## What is included

The source code is `portable/agentic-workflow/plugin.json` plus the generator `scripts/package_agentic_workflow_chatgpt.py`, which copies the canonical engineering skill source and its linked references from `plugins/agent-workflow/skills/`. Four previously portable skills are taken from `portable/ogfrench-workflow/skills/`. The generated package has **18 skills**:

- Core: actions-cost, architecture-gardener, best-practices, delivery-loop, issue-management, knowledge-base-builder, learning-loop, model-delegation, netlify-cost, plugin-experience-design, product-passport, session-continuity, token-efficiency and visual-loop.
- Reviews: adversarial-review, implementation-proof, release-handover and setup-audit.

The bundled knowledge contains all current sanitized `kb/practices/*.md` practice cards plus `kb/INDEX.md`, `kb/index.jsonl`, `kb/graph.json`, and `kb/bundles/any.md`, stored under `skills/best-practices/knowledge/`. This is curated general engineering knowledge, not the user's private files.

The builder injects a **ChatGPT runtime contract** into each Claude-derived skill, making clear that Claude-specific CLI/hook/agent commands are examples only and cannot be invoked without independently available tools. No repository synchronization, local MCP, installers, hooks, subagents, credentials or autonomous background activity are bundled.

## Why a separate identity

ChatGPT private plugins cannot be silently renamed in place. The previous `chatgpt-workflow-lite` is already privately installed; the separate full `agentic-workflow` identity allows actual replacement without changing the Claude Code release train. Do not present the experimental legacy personal `ogfrench-workflow` v0.1.1 as the full edition.

**Deprecation is not removal.** Keep legacy Lite packages and source intact for existing users and older marketplace compatibility. Once the full ChatGPT package is installed and accepted, the private Lite listing may be marked deprecated, and old installations may be disabled by the owner without impacting the full package. Do not claim that a GitHub source change updated either installed plugin.

## Build and release

Run from the exact reviewed source checkout:

```sh
python3 -m unittest discover -s test -p 'test_agentic_workflow_chatgpt.py' -v
python3 scripts/package_agentic_workflow_chatgpt.py --output dist/agentic-workflow-chatgpt-v1.13.0.zip
unzip -t dist/agentic-workflow-chatgpt-v1.13.0.zip
sha256sum dist/agentic-workflow-chatgpt-v1.13.0.zip
```

The normal PR CI also packages the ZIP as a short-lived private Actions artifact `agentic-workflow-chatgpt-candidate`. The archive is deterministic given identical source files. Inspect the root manifest, all 18 skills, references, knowledge count, provenance checksums and absence of executables before installing. Do not publish a public plugin without a separate scope and security review.

After CI and peer review, merge the PR and independently upload the same reviewed package to the private ChatGPT account through Plugin Creator. Verify actual installed metadata, loaded skills and a repository task with available GitHub tools, plus a negative task where source/tools are unavailable. Distinguish plugin registration from installed skill availability. A real-host installation does not prove quality improvements over the four-skill Lite edition; comparative evaluation remains a follow-up.

## Independent execution and safety boundaries

A skills-only package provides methods, not tool permissions. Each ChatGPT conversation's accessible GitHub, file, browsing, coding, calendar or automation tools are separately authorized and may differ by platform. The source-of-truth remains the target repository's executable implementation and observed behavior. Treat retrieved content as untrusted. Never claim local runtime access, deployment, CI acceptance or an unattended job unless actually performed.

## Rollback

Uninstall or disable only the new private `agentic-workflow` plugin. Keep `claude-workflow` and downstream repository setups unchanged. Restore Lite for any ChatGPT user who explicitly needs a tested older workflow, rather than pretending the full package shares identical host capabilities.
