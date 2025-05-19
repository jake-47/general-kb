#!/bin/bash

# Verify Documentation Script for Knowledge Base
# This script performs comprehensive quality checks on the documentation:
# 1. Markdown linting (with auto-fixing of common issues)
# 2. Link validation (both internal and external links)
# 3. Generates a summary report of any issues found

set -e

# Define colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOCS_DIR="docs"
LINK_REPORT="link-check-report.md"
SUMMARY_REPORT="docs-verification-report.md"
CHECK_EXTERNAL=true
AUTO_FIX_MARKDOWN=true
RUN_LINK_CHECK=true
IGNORE_PATTERNS=()

# Display banner
function show_banner {
    echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}   Knowledge Base Documentation Verification Tool   ${NC}"
    echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
    echo
}

# Display help message
function show_help {
    echo "Usage: $0 [options]"
    echo
    echo "Options:"
    echo "  --no-external       Skip checking external URLs (faster)"
    echo "  --no-fix            Don't attempt to auto-fix markdown issues"
    echo "  --no-links          Skip link checking entirely"
    echo "  --ignore PATTERN    Regex pattern for URLs to ignore (can be used multiple times)"
    echo "  --help              Display this help message and exit"
    echo
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --no-external)
            CHECK_EXTERNAL=false
            shift
            ;;
        --no-fix)
            AUTO_FIX_MARKDOWN=false
            shift
            ;;
        --no-links)
            RUN_LINK_CHECK=false
            shift
            ;;
        --ignore)
            IGNORE_PATTERNS+=("$2")
            shift 2
            ;;
        --help)
            show_banner
            show_help
            exit 0
            ;;
        *)
            echo "Error: Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

show_banner

# Start the verification process
echo -e "${BLUE}Starting documentation verification...${NC}"
echo

# Check if required scripts exist
if [ ! -f "lint.sh" ]; then
    echo -e "${YELLOW}Warning: lint.sh not found. Markdown linting will be skipped.${NC}"
    AUTO_FIX_MARKDOWN=false
fi

if [ "$RUN_LINK_CHECK" = true ] && [ ! -f "link_checker.py" ]; then
    echo -e "${YELLOW}Warning: link_checker.py not found. Link checking will be skipped.${NC}"
    RUN_LINK_CHECK=false
fi

# Step 1: Markdown linting with auto-fixing
if [ "$AUTO_FIX_MARKDOWN" = true ]; then
    echo -e "${BLUE}Step 1/3: Running markdown linting with auto-fixing...${NC}"
    
    # Check if markdownlint-cli is installed
    if command -v markdownlint >/dev/null 2>&1; then
        echo "🔍 Checking markdown files for formatting issues..."
        echo "🔧 Auto-fixing common issues where possible..."
        
        # Run markdownlint with auto-fix
        markdownlint --fix "$DOCS_DIR" || true
        
        echo -e "${GREEN}✅ Markdown linting and fixing completed.${NC}"
    else
        echo -e "${YELLOW}⚠️ markdownlint-cli not found. Skipping Markdown linting.${NC}"
        echo "   To enable linting, install markdownlint-cli with: npm install -g markdownlint-cli"
    fi
else
    echo -e "${BLUE}Step 1/3: Markdown linting (skipped)${NC}"
fi

echo

# Step 2: Link checking
if [ "$RUN_LINK_CHECK" = true ]; then
    echo -e "${BLUE}Step 2/3: Checking for broken links...${NC}"
    
    # Build the link checker command
    LINK_CMD="./check_links.sh --directory \"$DOCS_DIR\" --output \"$LINK_REPORT\""
    
    # Add option to skip external links if requested
    if [ "$CHECK_EXTERNAL" = false ]; then
        LINK_CMD="$LINK_CMD --no-external"
        echo "ℹ️ Skipping external URL checks as requested"
    else
        echo "ℹ️ Checking both internal and external links"
    fi
    
    # Add ignore patterns
    for pattern in "${IGNORE_PATTERNS[@]}"; do
        LINK_CMD="$LINK_CMD --ignore \"$pattern\""
        echo "ℹ️ Ignoring URLs matching pattern: $pattern"
    fi
    
    # Make sure the script is executable
    chmod +x check_links.sh
    
    # Run the link checker
    echo "📋 Running link checker..."
    eval "$LINK_CMD"
    
    LINK_CHECK_STATUS=$?
    if [ $LINK_CHECK_STATUS -eq 0 ]; then
        echo -e "${GREEN}✅ Link checking completed.${NC}"
    else
        echo -e "${YELLOW}⚠️ Link checking completed with issues.${NC}"
    fi
else
    echo -e "${BLUE}Step 2/3: Link checking (skipped)${NC}"
fi

echo

# Step 3: Generate summary report
echo -e "${BLUE}Step 3/3: Generating summary report...${NC}"

# Create the summary report
cat > "$SUMMARY_REPORT" << EOL
# Documentation Verification Report

_Generated on: $(date)_

## Summary

This report summarizes the results of content verification for the Knowledge Base.

| Check Type | Status | Details |
|------------|--------|---------|
EOL

# Add markdown linting result to summary
if [ "$AUTO_FIX_MARKDOWN" = true ]; then
    if command -v markdownlint >/dev/null 2>&1; then
        # Check remaining issues after auto-fixing
        REMAINING_ISSUES=$(markdownlint "$DOCS_DIR" 2>&1 || true)
        if [ -z "$REMAINING_ISSUES" ]; then
            echo "| Markdown Linting | ✅ PASS | No issues found after auto-fixing |" >> "$SUMMARY_REPORT"
        else
            ISSUE_COUNT=$(echo "$REMAINING_ISSUES" | wc -l)
            echo "| Markdown Linting | ⚠️ ISSUES | $ISSUE_COUNT issues remain after auto-fixing |" >> "$SUMMARY_REPORT"
        fi
    else
        echo "| Markdown Linting | ⚠️ SKIPPED | markdownlint-cli not installed |" >> "$SUMMARY_REPORT"
    fi
else
    echo "| Markdown Linting | ⚠️ SKIPPED | Auto-fixing disabled |" >> "$SUMMARY_REPORT"
fi

# Add link checking result to summary
if [ "$RUN_LINK_CHECK" = true ]; then
    if [ -f "$LINK_REPORT" ]; then
        # Extract the summary from the link check report
        if grep -q "🎉 All links are valid!" "$LINK_REPORT"; then
            echo "| Link Checking | ✅ PASS | All links are valid |" >> "$SUMMARY_REPORT"
        else
            # Extract the number of broken links from the report
            BROKEN_COUNT=$(grep -o -E "[0-9]+ broken links" "$LINK_REPORT" | awk '{print $1}')
            if [ -z "$BROKEN_COUNT" ]; then
                BROKEN_COUNT="Some"
            fi
            echo "| Link Checking | ❌ FAIL | $BROKEN_COUNT broken links found |" >> "$SUMMARY_REPORT"
        fi
    else
        echo "| Link Checking | ⚠️ ERROR | Link check report not generated |" >> "$SUMMARY_REPORT"
    fi
else
    echo "| Link Checking | ⚠️ SKIPPED | Link checking disabled |" >> "$SUMMARY_REPORT"
fi

# Add recommendations section
cat >> "$SUMMARY_REPORT" << EOL

## Recommendations

EOL

# Generate recommendations based on results
if [ "$AUTO_FIX_MARKDOWN" = true ] && [ ! -z "$REMAINING_ISSUES" ]; then
    cat >> "$SUMMARY_REPORT" << EOL
### Markdown Formatting

There are still some markdown formatting issues that couldn't be automatically fixed:

\`\`\`
$(echo "$REMAINING_ISSUES" | head -n 10)
$([ $(echo "$REMAINING_ISSUES" | wc -l) -gt 10 ] && echo "... and more issues")
\`\`\`

**Action:** Review the above issues and fix them manually to ensure consistent documentation styling.

EOL
fi

if [ "$RUN_LINK_CHECK" = true ] && [ -f "$LINK_REPORT" ] && ! grep -q "🎉 All links are valid!" "$LINK_REPORT"; then
    cat >> "$SUMMARY_REPORT" << EOL
### Broken Links

Some broken links were detected in the documentation. For a detailed list, see the [link check report]($LINK_REPORT).

**Action:** Review and fix the broken links before publishing or deploying the documentation.

EOL
fi

echo -e "${GREEN}✅ Summary report generated: $SUMMARY_REPORT${NC}"
echo

# Final summary
echo -e "${BLUE}═════════════════ Verification Complete ═════════════════${NC}"
echo

# Check if there were any issues
ISSUES_FOUND=false

if [ "$AUTO_FIX_MARKDOWN" = true ] && [ ! -z "$REMAINING_ISSUES" ]; then
    ISSUES_FOUND=true
    echo -e "${YELLOW}⚠️ Markdown linting issues found${NC}"
fi

if [ "$RUN_LINK_CHECK" = true ] && [ -f "$LINK_REPORT" ] && ! grep -q "🎉 All links are valid!" "$LINK_REPORT"; then
    ISSUES_FOUND=true
    echo -e "${YELLOW}⚠️ Broken links detected${NC}"
fi

if [ "$ISSUES_FOUND" = true ]; then
    echo -e "${YELLOW}⚠️ Some issues were found in the documentation.${NC}"
    echo -e "   Please review the reports for details:"
    echo -e "   - Summary report: ${BLUE}$SUMMARY_REPORT${NC}"
    [ "$RUN_LINK_CHECK" = true ] && echo -e "   - Link check report: ${BLUE}$LINK_REPORT${NC}"
    echo
    echo -e "   Run this script again after fixing the issues to verify the fixes."
else
    echo -e "${GREEN}🎉 No issues found! Documentation is ready for publishing.${NC}"
fi

echo