#!/bin/bash
# Simple documentation build script

# Usage information
function show_usage {
    echo "Usage: ./build.sh [internal|external] [serve] [port]"
    echo "Examples:"
    echo "  ./build.sh external serve 8001  # Start external docs server on port 8001"
    echo "  ./build.sh internal serve 8000  # Start internal docs server on port 8000"
    echo "  ./build.sh external             # Build external docs without serving"
    echo "  ./build.sh internal             # Build internal docs without serving"
    exit 1
}

# Parse first argument - build type
if [ "$1" == "internal" ]; then
    CONFIG_FILE="mkdocs.internal.yml"
    DEFAULT_PORT=8000
elif [ "$1" == "external" ]; then
    CONFIG_FILE="mkdocs.yml"
    DEFAULT_PORT=8001
else
    show_usage
fi

# Create environment config file
mkdir -p docs/assets/javascripts/config
echo "// Environment configuration
window.DOCS_ENV = {
  isInternal: $([[ "$1" == "internal" ]] && echo "true" || echo "false"),
  buildDate: '$(date -u +"%Y-%m-%dT%H:%M:%SZ")',
  buildType: '$1'
};" > docs/assets/javascripts/config/env-config.js

# Handle second argument - serve or build
if [ "$2" == "serve" ]; then
    # Use port from third argument or default
    PORT=${3:-$DEFAULT_PORT}
    
    echo "Starting $1 documentation server on 127.0.0.1:$PORT..."
    
    # Copy versions.json for internal builds if it exists
    if [ "$1" == "internal" ] && [ -f "docs/versions.json" ]; then
        mkdir -p site-internal
        cp "docs/versions.json" "site-internal/"
    fi
    
    # Start the server
    python -m mkdocs serve -f $CONFIG_FILE -a 127.0.0.1:$PORT
else
    # Just build without serving
    echo "Building $1 documentation..."
    python -m mkdocs build -f $CONFIG_FILE
fi

echo "Done!"