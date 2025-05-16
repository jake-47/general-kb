# Link Validation

This document explains how to use the link validation tools provided with the Sitetracker Knowledge Base. These tools help ensure that all links within the documentation are valid and working properly.

## Why Link Validation Matters

Maintaining accurate links is crucial for documentation quality:

- Broken links frustrate users and reduce trust in the documentation
- Internal broken links make it difficult to navigate between related topics
- External broken links prevent users from accessing referenced resources
- Proper link validation improves the overall user experience

## Available Link Checking Tools

The Sitetracker Knowledge Base provides several tools for link validation:

### 1. Link Checker Script (`link_checker.py`)

This Python script analyzes all markdown files in the documentation to find broken links:

- Checks internal links between documentation pages
- Validates external URLs (optional)
- Identifies broken anchor links (links to specific sections)
- Generates detailed reports of any issues found

#### Usage

```bash
# Basic usage
python link_checker.py --directory docs --output link-check-report.md

# Skip checking external URLs (faster)
python link_checker.py --directory docs --output link-check-report.md --no-external

# Ignore specific URL patterns
python link_checker.py --directory docs --output link-check-report.md --ignore "^https://example.com" --ignore "^mailto:"

# Show detailed progress
python link_checker.py --directory docs --output link-check-report.md --verbose
```

### 2. Link Check Shell Script (`check_links.sh`)

A convenient shell script wrapper around the Python link checker:

```bash
# Basic usage
./check_links.sh

# Skip checking external URLs
./check_links.sh --no-external

# Specify a custom output file
./check_links.sh --output custom-report.md

# Ignore specific URL patterns
./check_links.sh --ignore "^https://example.com" --ignore "^mailto:"

# Show more detailed output
./check_links.sh --verbose
```

### 3. Documentation Verification Script (`verify_docs.sh`)

A comprehensive quality assurance script that runs both markdown linting and link checking:

```bash
# Run full verification
./verify_docs.sh
```

This script:
1. Fixes common markdown linting issues when possible
2. Checks for broken links throughout the documentation
3. Provides a summary of issues found

## Integrating Link Checking in Workflows

### Pre-commit Validation

Run link validation before committing changes:

```bash
# Quick check before committing
./check_links.sh --no-external
```

### Continuous Integration

Add link validation to CI/CD pipelines:

```yaml
# Example GitHub Actions workflow step
- name: Validate documentation links
  run: |
    ./verify_docs.sh
```

### Pre-deployment Checks

Always verify documentation before deployment:

```bash
# Comprehensive check before deploying
./verify_docs.sh
```

## Understanding Link Check Reports

The link checker generates a markdown report with the following sections:

1. **Summary** - Overview of all links checked, success rate, and issues found
2. **Files with Issues** - List of files containing broken links
3. **Detailed Results** - Line-by-line breakdown of each broken link, including:
   - Line number where the link occurs
   - Link text and URL
   - Reason for the failure

Example report entry:

```
### docs/usage/api-overview.md

| Line | Status | Link Text | URL | Reason |
|------|--------|-----------|-----|--------|
| 42 | ❌ | API Status | /api/status | File not found: /api/status.md |
| 78 | ⚠️ | Support Portal | https://support.example.com | HTTP Error: 404 |
```

## Troubleshooting Common Link Issues

### Internal Links

Problem: `File not found: path/to/file.md`

Solutions:
- Check if the target file exists at the specified path
- Ensure the path is relative to the current file
- Make sure the file extension (.md) is included or excluded consistently
- Verify the capitalization (file paths can be case-sensitive)

### Anchor Links

Problem: `Anchor not found: #section-name`

Solutions:
- Check if the anchor name matches the section heading exactly
- Ensure heading IDs follow the format MkDocs uses (lowercase, spaces replaced with hyphens)
- Verify you're linking to the correct file

### External Links

Problem: `HTTP Error: 404` or `Connection timeout`

Solutions:
- Verify the URL is correct and the site is accessible
- Consider ignoring specific unstable URLs with the `--ignore` flag
- Some sites may block automated requests; manually verify critical links

## Best Practices for Links in Documentation

1. **Use relative paths** for internal links to other documentation pages
2. **Include file extensions** (.md) in internal links for better IDE support
3. **Link to specific sections** when referencing content within long pages
4. **Verify external links** periodically, as external sites may change
5. **Use descriptive link text** that indicates where the link leads
6. **Consider future-proofing** by avoiding links to volatile resources
7. **Run link checks** before committing and deploying documentation

## Configuration Options

### Ignore Patterns

To ignore specific URL patterns, use regular expressions with the `--ignore` flag:

```bash
./check_links.sh --ignore "^mailto:" --ignore "^https://internal\\."
```

Common patterns to ignore:
- `^mailto:` - Email links
- `^https://internal\\.` - Internal service links
- `^http://localhost` - Local development links

### Performance Considerations

- Use `--no-external` for quick checks during development
- External link checking can be slow due to network requests
- Consider setting more restrictive timeouts for external checks
- Run comprehensive checks before releasing major documentation updates