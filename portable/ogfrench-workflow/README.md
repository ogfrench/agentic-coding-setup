# ogfrench Workflow

A four-skill, optional companion to [agentic-coding-setup](https://github.com/ogfrench/agentic-coding-setup). Version **0.1.1**, currently a **draft release candidate**, not a public release.

It provides `setup-audit`, `adversarial-review`, `implementation-proof` and `release-handover`. These provide instructions, not independent access to your filesystem, GitHub, browser, MCP tools or credentials. The existing Claude plugins (`agent-workflow`, `frog-writing` and `presentation-craft`) remain separate and canonical.

## Use with Claude Code

The following installation path passed on an isolated Linux CI configuration. To test this **unmerged** branch locally:

```sh
git clone https://github.com/ogfrench/agentic-coding-setup.git
cd agentic-coding-setup
git switch feat/cross-platform-workflow-plugin-2026-11-09
claude plugin marketplace add ./
claude plugin install ogfrench-workflow@ogfrench --scope user
claude plugin list
```

In a Claude Code session, request one of the four supported workflows, for example: "Run an adversarial review of this PR and distinguish proven defects from unverified risks." Verify the skill actually activates and uses only tools available to that session. **That interactive behavior has not yet been accepted.**

To uninstall:

```sh
claude plugin uninstall ogfrench-workflow@ogfrench --scope user
```

For a truly clean test, use a disposable `CLAUDE_CONFIG_DIR`. Do not assume the commands above can safely replace an existing marketplace already installed under the same name.

## Use with ChatGPT

A private `ogfrench-workflow` v0.1.1 plugin was imported successfully for its creator. It is **not publicly discoverable** and **not automatically installed by checking out GitHub**.

If you already have access to that private plugin, open **Plugins** in ChatGPT and find it under **Personal** or **Installed**, depending on your account. Install if prompted, then use it for a relevant request, including with an @ mention where supported. No additional app authorization is bundled in this skills-only package. Access to GitHub or other services remains separately controlled.

For development on a supported ChatGPT desktop/Work or Codex environment, the repository also contains `.agents/plugins/marketplace.json`, a *local* marketplace that points to this directory. Open a checkout of the branch as a workspace, restart the desktop app if needed, select the local marketplace in Plugins, and install the companion there. This is not the same as the private uploaded ChatGPT plugin or a public listing.

To update an owned private ChatGPT package, build/import a new version with Plugin Creator and verify the released files match the GitHub source. Publishing a commit or editing the local marketplace does not automatically update the privately imported release.

## Verification, limitations and rollback

- **Verified:** GitHub CI unit tests, manifest validation, safety checks, Linux CLI install/list/uninstall, and private ChatGPT package source parity.
- **Not verified:** authenticated Claude task execution, task-quality improvement compared with no plugin, and Windows/macOS host behavior.
- **Not included:** Claude hooks, subagents, commands, MCP installation, third-party plugins, account settings, automatic sync, or credentials.
- **Rollback:** uninstall/disable the optional companion in the relevant host. It does not migrate or replace the existing setup.

For current evidence, test instructions, and release blockers, see the [host contract](../../docs/portable-workflow-plugin.md), [adversarial review](../../docs/portable-workflow-adversarial-review-2026-11-09.md), and [working scratchpad](../../docs/WORK-IN-PROGRESS.md).

Official references: [Claude Code settings and precedence](https://code.claude.com/docs/en/settings), [OpenAI plugin packaging](https://developers.openai.com/plugins/build/plugins), and [ChatGPT plugin installation](https://help.openai.com/en/articles/20001256-plugins-in-chatgpt).
