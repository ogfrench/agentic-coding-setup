# Security and trust boundaries

This repository distributes Claude skills, agents, hooks and project configuration to other codebases. The source may be public while destination repositories and their client details are private. A change here can affect agent behavior in multiple downstream repositories.

## Private vulnerability reports

Report a suspected exploit privately to the repository owner or through GitHub private vulnerability reporting, when enabled. Do not paste client repository names, customer documents, secrets, private sync lists or GitHub App credentials in public issues, PRs or Actions logs.

## Controls and limitations

- **Filesystem:** the sync copier must reject untrusted managed paths, symlinks and redirections before deleting or writing target files. It must preserve target-owned content and record managed provenance.
- **Credentials:** keep `SYNC_REPOS`, GitHub App private keys and installation tokens out of commits, PR bodies and public CI logs. Use the narrowest repository permissions possible.
- **Review:** the scheduled sync creates draft downstream PRs; an explicit merge option is not a substitute for code and security review. Do not auto-merge security changes solely because tests passed.
- **Agent boundaries:** `CLAUDE.md`, skills, hook commands and MCP configurations are instructions with potential side effects, not security sandboxes. Review new shell/network/file access and externally fetched instructions. Apply host permission controls independently.
- **Supply chain:** plugins and marketplaces can update separately from committed managed copies, including when auto-update is enabled. Evaluate and record trusted providers and update policy.

The November 8, 2026 source-code review and independent reviewer checklist are in [docs/security/2026-11-08-sync-review.md](docs/security/2026-11-08-sync-review.md). It does not claim to have penetration-tested Claude or downstream repositories.
