# Agentic Workflow for ChatGPT

**Full portable edition, v2026.11.7.** Source: [ogfrench/agentic-coding-setup](https://github.com/ogfrench/agentic-coding-setup).

This package provides the 21 source-owned engineering, story and design skills from the Claude Code edition of `agentic-workflow`, 4 previously portable review/setup skills, and the curated public engineering-practice knowledge base. All skills retain their owning source guidance and supporting references. A short ChatGPT host-adapter contract is injected into the Claude-derived skills to prevent claiming unavailable tools or runtime features.

### Included workflow domains

- Architecture Gardener, Delivery Loop, Issue Management and Product Passport.
- Best Practices, Learning Loop, Knowledge Base Builder and Model Delegation.
- Visual Loop, Session Continuity, Token Efficiency, GitHub Actions Cost and Netlify Cost.
- Plugin Experience Design, Presentation Story, Presentation Design and Design System Adapter. Visual Loop also includes visual restraint.
- Frogify, Deslopify and Humanizer for selective brand writing and editorial revision, with Humanizer's MIT notice.\n- Adversarial Review, Implementation Proof, Release Handover and Setup Audit from the former Lite edition.

Select a skill for a relevant task. Ordinary chat should not activate all skills. Read supporting references only if relevant and accessible.

The standalone `frog-writing` and `presentation-craft` packages are retired; the writing and presentation skills are included here.  the shared three skills are included here and in Claude Workflow. Use frogViz's actual authoring workflow whenever explicitly requested, rather than a generic imitation. Existing legacy plugin installations are not silently removed.

### What this does not install

No Claude Code hooks, commands, subagents, user setup scripts, local MCP processes, credentials, automatic project sync, or autonomous background work. ChatGPT tools, local file access, authentication, runtime and UI/browser capabilities are **independent**. A skill's instructions never create tool permissions.

Knowledge consists of source-linked, curated engineering practices and their public index, not client projects or a private file corpus. The source repository's code and runtime behavior remain authoritative; documentation may be stale.

### Version and deprecation

`agentic-workflow` v2026.11.7 supersedes **ChatGPT Workflow Lite** v1.12.0 and the legacy personal `ogfrench-workflow` v0.1.1 **for ChatGPT**. The Lite archives remain only as historical compatibility packages and are deprecated, not auto-deleted. The Claude Code edition of `agentic-workflow` (named `claude-workflow` through 2026.11.3) shares this release number, but remains independently packaged and host-verified.

### Building and testing

Run `python3 -m unittest discover -s test -p test_agentic_workflow_chatgpt.py`, then `python3 scripts/package_agentic_workflow_chatgpt.py`. The build uses the checked-in canonical source, fails on missing skills or linked support files, keeps an integrity manifest and creates a reproducible ZIP. Upload privately through ChatGPT Plugin Creator, inspect the installed skill list, and verify a task on a real repository.

No public directory submission or share permission is implied.
