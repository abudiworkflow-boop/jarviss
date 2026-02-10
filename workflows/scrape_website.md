# Scrape Website

## Objective
Extract data from a website and save it for processing.

## Required Inputs
- Target URL(s)
- What data to extract (text, links, tables, specific selectors)
- Output format (JSON, CSV)

## Tools
- `tools/scrape_single_site.py` (to be created when needed)

## Steps
1. Validate the target URL is accessible
2. Run the scraping tool with appropriate selectors
3. Save raw output to `.tmp/`
4. Transform data into the requested format
5. Deliver to cloud service or keep local as needed

## Expected Output
- Scraped data in `.tmp/` as JSON or CSV
- Summary of what was extracted (row count, fields, etc.)

## Edge Cases
- Site blocks requests: try with headers/user-agent, or use n8n HTTP Request node as alternative
- Dynamic content (JS-rendered): may need a headless browser approach
- Rate limiting: add delays between requests
- Large sites: paginate and track progress
