# env0 MCP Server — Fork Configuration

This is the dbt Labs fork of `env0/mcp-server`, deployed to Runlayer as a hosted MCP server.

## Upstream PR policy

This file exists only in the dbt Labs fork (`dbt-labs/env0-mcp-server`). It must **never** be included in PRs to the upstream repo (`env0/mcp-server`).

When creating upstream PRs:
1. Branch from `upstream/main`, not `origin/main`
2. Cherry-pick or rebase only the commits relevant to the contribution
3. Verify `CLAUDE.md` is not in the diff before opening the PR

## Runlayer deployment sync

This fork is deployed to Runlayer as a hosted Docker service. Tool descriptions served by the MCP server become the schema that Claude Code and other clients see. **When you change a tool's description, default value, or parameter schema in the source code, the Runlayer deployment must be rebuilt to pick up those changes.**

After merging changes that affect tool metadata:
- Rebuild the deployment in Runlayer (deployment ID: `7a867761-29af-4722-b285-1ebd095582b8`)
- Verify the updated descriptions appear via `list_server_tools` on the Runlayer API

There are two places tool descriptions live in the source:
1. **Schema files** (`src/mcp/schemas/*.ts`) — parameter-level descriptions and defaults
2. **Tool registration** (`src/mcp/tools/*.ts`) — top-level tool description string

Both must stay consistent with each other, and both propagate to Runlayer only after a redeploy.

## Remotes

| Remote | Repo | Purpose |
|--------|------|---------|
| `origin` | `dbt-labs/env0-mcp-server` | Fork — our changes, Runlayer deployment source |
| `upstream` | `env0/mcp-server` | Upstream — general contributions only |
