# Feature contract

**Code is the source, not documentation.** Tests and real execution provide evidence about its behavior. Feature maps are derived navigation aids with no authority to override source. Keep one small entry per meaningful user capability, not per component or function. Prefer code-derived entry points, exact symbol/file paths, and existing test commands. If the map disagrees with code, first determine whether the implementation is wrong or the map stale. Fix bugs in code with a regression; only then refresh the map.

Suggested path: `docs/product-passport/features/<stable-id>.md`.

## Template

```md
# <Feature name>

- **User outcome:** What the user can accomplish.
- **Entry points:** Routes, commands, API/MCP tools, or product interactions.
- **Owner:** Owning UI/module/service and the canonical implementation path.
- **Boundaries:** State, transport, persistence, process, and allowed dependencies.
- **Preconditions:** Inputs, access, runtime requirements, and isolation.
- **Success:** Observable, nontrivial assertions.
- **Failure/recovery:** Important error, empty, permission, or cancellation paths.
- **Verify:** Existing tests and exact runnable task steps.
- **Evidence:** Required output artifacts, source revision, and environment.
- **Known limitations:** Untested hosts or unproven behavior.
```

An entry must be checked against the current source and lead an unfamiliar agent to the correct implementation and a runnable check in minutes. Avoid fixed folder names for UI/client/host: a web app, CLI, research index, and desktop application own behavior differently. Keep both native and plugin/MCP entry points when they materially differ.

## Change impact

For every changed source path, determine the affected feature and neighboring contract surfaces. Changes to public API, persistence, state synchronization, binary output, permissions, exports, or plugin installation usually require more than a local unit test. If one module supports several features, map their shared invariant once and link from affected entries.

Feature maps are not exhaustive inventories of code symbols and should not duplicate architecture atlases. Prefer generated source-path and command inventories when reliable. A static path-existence check detects drift, not correct behavior; runtime verification remains independent of docs.
