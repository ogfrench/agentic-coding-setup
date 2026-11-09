# Feature contract

Keep one small Markdown entry per meaningful user capability, not per component or function. Prefer repository-native naming and existing docs. Feature entries are maintained maps; if the source disagrees, inspect the source, fix the map, and write a regression only when behavior matters.

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

A feature entry should lead an unfamiliar agent to the correct source and a runnable check in minutes. Avoid fixed folder names for UI/client/host: a web app, CLI, research index, and desktop application own behavior differently. Keep both native and plugin/MCP entry points when they materially differ.

## Change impact

For every changed source path, determine the affected feature and neighboring contract surfaces. Changes to public API, persistence, state synchronization, binary output, permissions, exports, or plugin installation usually require more than a local unit test. If one module supports several features, map their shared invariant once and link from affected entries.

Feature maps are not exhaustive inventories of code symbols and should not duplicate architecture atlases. Generated inventories can help detect drift but cannot independently certify user behavior.
