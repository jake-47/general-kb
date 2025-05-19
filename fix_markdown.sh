#!/bin/bash

# Fix Markdown Script for General Knowledge Base
# This script automatically fixes common markdown linting issues in documentation files

set -e

# Define colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOCS_DIR="docs"
VERBOSE=false

# Display banner
function show_banner {
    echo -e "${BLUE}════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}   General Knowledge Base Markdown Fixer   ${NC}"
    echo -e "${BLUE}════════════════════════════════════════════════════${NC}"
    echo
}

# Display help message
function show_help {
    echo "Usage: $0 [options]"
    echo
    echo "Options:"
    echo "  --directory DIR      Directory containing markdown files (default: docs)"
    echo "  --verbose            Show detailed output during fixing"
    echo "  --help               Display this help message and exit"
    echo
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --directory)
            DOCS_DIR="$2"
            shift 2
            ;;
        --verbose)
            VERBOSE=true
            shift
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

echo -e "${BLUE}Starting markdown fixing for directory: $DOCS_DIR${NC}"
echo

# Check if markdownlint-cli is installed
if ! command -v markdownlint >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️ markdownlint-cli not found. Markdown fixing requires markdownlint-cli.${NC}"
    echo "   To install, run: npm install -g markdownlint-cli"
    exit 1
fi

# Count total markdown files
TOTAL_FILES=$(find "$DOCS_DIR" -name "*.md" | wc -l)
echo "🔍 Found $TOTAL_FILES markdown files to process"
echo

# Step 1: Run markdownlint with auto-fix
echo -e "${BLUE}Step 1/2: Running automatic fixes with markdownlint...${NC}"

# Get a list of all markdown files before fixing
if [ "$VERBOSE" = true ]; then
    PRE_FIX_ISSUES=$(markdownlint "$DOCS_DIR" || true)
    PRE_FIX_COUNT=$(echo "$PRE_FIX_ISSUES" | grep -v "^$" | wc -l)
    echo "ℹ️ Found $PRE_FIX_COUNT issues before fixing"
fi

# Run markdownlint with auto-fix
echo "🔧 Applying automatic fixes to common markdown issues..."
markdownlint --fix "$DOCS_DIR" || true

# Count remaining issues after fixing
POST_FIX_ISSUES=$(markdownlint "$DOCS_DIR" || true)
POST_FIX_COUNT=$(echo "$POST_FIX_ISSUES" | grep -v "^$" | wc -l)

if [ "$VERBOSE" = true ] && [ "$PRE_FIX_COUNT" -gt 0 ]; then
    FIXED_COUNT=$((PRE_FIX_COUNT - POST_FIX_COUNT))
    echo "ℹ️ Fixed $FIXED_COUNT issues automatically"
fi

echo -e "${GREEN}✅ Automatic fixing completed${NC}"
echo

# Step 2: Apply common manual fixes
echo -e "${BLUE}Step 2/2: Applying additional manual fixes...${NC}"

echo "🔧 Fixing trailing whitespace..."
find "$DOCS_DIR" -name "*.md" -exec sed -i 's/[ \t]*$//' {} \;

echo "🔧 Ensuring files end with a single newline..."
find "$DOCS_DIR" -name "*.md" -exec sed -i -e :a -e '/^\n*$/{$d;N;ba' -e '}' {} \;
find "$DOCS_DIR" -name "*.md" -exec sed -i -e '$a\' {} \;

echo "🔧 Converting spaces to tabs in code blocks..."
find "$DOCS_DIR" -name "*.md" -exec sed -i 's/^    \([^ ]\)/\t\1/g' {} \;

echo "🔧 Fixing inline code blocks with incorrect backticks..."
find "$DOCS_DIR" -name "*.md" -exec sed -i "s/'''/\`\`\`/g" {} \;
find "$DOCS_DIR" -name "*.md" -exec sed -i "s/''/\`\`/g" {} \;
find "$DOCS_DIR" -name "*.md" -exec sed -i "s/'/\`/g" {} \;

echo -e "${GREEN}✅ Additional fixes completed${NC}"
echo

# Final check
echo -e "${BLUE}Final check for remaining issues...${NC}"
FINAL_ISSUES=$(markdownlint "$DOCS_DIR" || true)
FINAL_COUNT=$(echo "$FINAL_ISSUES" | grep -v "^$" | wc -l)

if [ $FINAL_COUNT -eq 0 ]; then
    echo -e "${GREEN}🎉 All markdown issues fixed! Your documentation is now properly formatted.${NC}"
else
    echo -e "${YELLOW}⚠️ $FINAL_COUNT markdown issues remain that require manual fixing.${NC}"
    
    if [ "$VERBOSE" = true ]; then
        echo
        echo "The following issues remain:"
        echo "------------------------"
        echo "$FINAL_ISSUES" | head -n 20
        
        if [ $(echo "$FINAL_ISSUES" | wc -l) -gt 20 ]; then
            echo "... and more issues (showing only first 20)"
        fi
    fi
    
    echo
    echo "Common remaining issues and how to fix them:"
    echo "1. MD013 (line-length): Break long lines (> 120 chars) into multiple lines"
    echo "2. MD022 (headers-blank-line): Add blank lines before and after headers"
    echo "3. MD032 (blanks-around-lists): Add blank lines before and after lists"
    echo "4. MD034 (no-bare-urls): Wrap URLs in <>: <https://example.com>"
    echo "5. MD040 (fenced-code-language): Add language to code blocks: \`\`\`python"
fi

echo