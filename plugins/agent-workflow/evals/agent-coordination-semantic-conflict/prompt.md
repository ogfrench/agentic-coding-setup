---
max_turns: 8
allowed_tools: [Skill]
---

Two coding agents will implement a new "save shared item" feature. Agent A owns the frontend and assumes the API returns `{itemId}`; Agent B owns the backend and plans to return `{id}`. They edit different files and use separate worktrees. The project lead wants them running in parallel immediately. No checkout is available. Decide how to coordinate and what proves integration.
