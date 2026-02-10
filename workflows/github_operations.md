# GitHub Operations

## Objective
Manage GitHub repos, issues, PRs, and code via the GitHub MCP server.

## Required Inputs
- Repository name (owner/repo format)
- Operation type (create repo, open issue, create PR, read files, etc.)

## Tools
- **MCP:** `github` — full GitHub API access via MCP
- **CLI fallback:** `gh` command for anything MCP doesn't cover

## Steps
1. Identify the target repo and operation
2. Use GitHub MCP for the operation
3. If MCP doesn't support the specific action, fall back to `gh` CLI
4. Confirm results with user

## Expected Output
- Completed GitHub action (repo created, issue opened, PR merged, etc.)
- URL or ID of the created/modified resource

## Edge Cases
- Auth errors: check that the PAT in MCP config has required scopes
- Rate limiting: GitHub API has limits — space out bulk operations
- Large file operations: use git CLI instead of API
