# n8n Workflow Management

## Objective
Create, update, list, and manage n8n workflows on the cloud instance.

## Required Inputs
- Workflow name or ID (for updates/retrieval)
- Workflow JSON (for creation/updates)

## Tools
- **MCP:** `n8n-mcp` — use for listing, creating, activating, deactivating workflows
- **Skills:** `n8n-workflow-patterns` for architecture guidance, `n8n-mcp-tools-expert` for tool usage

## Steps
1. List existing workflows to check for duplicates
2. Validate workflow JSON using `n8n-validation-expert` skill
3. Create or update workflow via n8n MCP
4. Activate if ready, or leave in draft

## Expected Output
- Workflow live on `abudii.app.n8n.cloud`
- Confirmation with workflow ID and status

## Edge Cases
- If workflow name already exists, confirm with user before overwriting
- If validation fails, report errors and suggest fixes
- If API rate-limited, wait and retry once, then report
