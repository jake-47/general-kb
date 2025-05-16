#!/bin/bash
# Script to run markdownlint and fix common issues

echo "🔍 Running Markdown linting on documentation files..."

if ! command -v npx &> /dev/null; then
    echo "❌ npx not found. Please install Node.js to use markdownlint."
    exit 1
fi

# Print the issues without fixing
echo "📋 Checking for markdown issues..."
npx markdownlint 'docs/**/*.md'
LINT_RESULT=$?

if [ $LINT_RESULT -eq 0 ]; then
    echo "✅ All Markdown files are properly formatted!"
else
    echo ""
    echo "⚠️ Found markdown formatting issues."
    echo ""
    
    # Ask if we should automatically fix the issues
    read -p "Would you like to automatically fix fixable issues? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🔧 Fixing markdown issues..."
        npx markdownlint --fix 'docs/**/*.md'
        
        # Check if all issues were fixed
        npx markdownlint 'docs/**/*.md' > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo "✅ All issues have been fixed!"
        else
            echo "⚠️ Some issues could not be fixed automatically. Please fix them manually."
            echo "   Run './lint.sh' again to see remaining issues."
        fi
    else
        echo "❌ Fix cancelled. Please fix the issues manually."
        echo "   To automatically fix issues, run: './lint.sh' and confirm with 'y'"
    fi
fi

echo ""
echo "📝 Markdown Style Guide Reminders:"
echo "  • Line length: Keep lines under 120 characters"
echo "  • Use fenced code blocks with language specification (```python)"
echo "  • Use proper URL formatting with [link text](url)"
echo "  • Single trailing newline at the end of each file"
echo "  • Only one top-level heading (# Heading) per document"
echo "  • Proper ordered list numbering (1., 2., 3., etc.)"
echo "  • No bare URLs - use [url](url) format instead"
echo ""
echo "For more details, see docs/internal/markdown-guide.md"