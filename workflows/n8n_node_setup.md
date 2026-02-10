# n8n Node Configuration

## Objective
Configure n8n nodes correctly with proper parameters, credentials, and operation settings.

## Required Inputs
- Node type (e.g., HTTP Request, Google Sheets, Code, Webhook)
- Desired operation (e.g., GET, append, execute)

## Tools
- **MCP:** `n8n-mcp` — search for nodes, get node details
- **Skills:** `n8n-node-configuration` for property dependencies and required fields

## Steps
1. Search for the node using n8n MCP to get exact node name and version
2. Get node details at appropriate level (basic → full as needed)
3. Determine required fields for the chosen operation
4. Configure parameters respecting dependencies (some fields only appear based on operation choice)
5. Validate the configuration

## Expected Output
- Correctly configured node JSON ready to insert into a workflow

## Edge Cases
- Some nodes require credentials — check and prompt user
- Operation-dependent fields: always check `n8n-node-configuration` skill for dependency maps
- Version mismatches: use the latest node version available
