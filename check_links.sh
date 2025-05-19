#!/bin/bash

# Check Links Script for Knowledge Base
# This script provides a simple wrapper around the link_checker.py Python script
# for finding broken links in the documentation.

set -e

# Default values
DIRECTORY="docs"
OUTPUT="link-check-report.md"
CHECK_EXTERNAL=true
VERBOSE=false
IGNORE_PATTERNS=()

# Display help message
function show_help {
    echo "Usage: $0 [options]"
    echo
    echo "Options:"
    echo "  --directory DIR      Directory containing markdown files (default: docs)"
    echo "  --output FILE        Output file for the report (default: link-check-report.md)"
    echo "  --no-external        Skip checking external URLs (faster but less comprehensive)"
    echo "  --ignore PATTERN     Regex pattern for URLs to ignore (can be used multiple times)"
    echo "  --verbose            Show detailed progress information"
    echo "  --help               Display this help message and exit"
    echo
    echo "Examples:"
    echo "  $0                                  # Run with default settings"
    echo "  $0 --no-external                    # Skip checking external URLs"
    echo "  $0 --ignore \"^mailto:\"              # Ignore mailto links"
    echo "  $0 --ignore \"^https://example.com\"  # Ignore links to example.com"
    echo
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --directory)
            DIRECTORY="$2"
            shift 2
            ;;
        --output)
            OUTPUT="$2"
            shift 2
            ;;
        --no-external)
            CHECK_EXTERNAL=false
            shift
            ;;
        --ignore)
            IGNORE_PATTERNS+=("$2")
            shift 2
            ;;
        --verbose)
            VERBOSE=true
            shift
            ;;
        --help)
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

# Ensure the Python script exists
if [ ! -f "link_checker.py" ]; then
    echo "Error: link_checker.py not found in the current directory."
    echo "Please make sure you are running this script from the root of the documentation repository."
    exit 1
fi

# Build the command with all options
CMD="python link_checker.py --directory \"$DIRECTORY\" --output \"$OUTPUT\""

# Add optional flags based on parsed arguments
if [ "$CHECK_EXTERNAL" = false ]; then
    CMD="$CMD --no-external"
fi

if [ "$VERBOSE" = true ]; then
    CMD="$CMD --verbose"
fi

# Add all ignore patterns
for pattern in "${IGNORE_PATTERNS[@]}"; do
    CMD="$CMD --ignore \"$pattern\""
fi

# Run the command
echo "📋 Checking links in $DIRECTORY..."
echo "📊 Results will be saved to $OUTPUT"

# Convert the command string to an array
eval "$CMD"

echo "✅ Link check completed."
echo "📝 See $OUTPUT for detailed results."