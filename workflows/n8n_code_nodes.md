# n8n Code Node Development

## Objective
Write and debug JavaScript or Python code for n8n Code nodes.

## Required Inputs
- Language choice (JavaScript or Python)
- What the code should do (transform data, call API, filter items, etc.)
- Input data structure (what fields are available via $input / _input)

## Tools
- **Skills:** `n8n-code-javascript` or `n8n-code-python` depending on language

## Steps
1. Determine if JS or Python is more appropriate for the task
2. Reference the correct data access patterns ($json vs _json, $input vs _input)
3. Write code following n8n conventions (return array of objects for JS, return list of dicts for Python)
4. Handle errors gracefully within the code
5. Test with sample data if available

## Expected Output
- Working code snippet ready to paste into an n8n Code node

## Edge Cases
- Python in n8n has limited library access — check `STANDARD_LIBRARY.md`
- JS has access to $helpers for HTTP requests — don't use fetch/axios directly
- Always return items in the correct format or the node will error
