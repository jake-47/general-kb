#!/bin/bash

# Script to manage internal documentation versions
# This script creates or updates versioned documentation for internal use

# Load environment variables if they exist
if [ -f ".env" ]; then
    source .env
fi

# Default values
DEFAULT_VERSION="latest"
DEFAULT_ALIAS="latest"

# Parse arguments
VERSION=${1:-$DEFAULT_VERSION}
ALIAS=${2:-$DEFAULT_ALIAS}
UPDATE_ALIAS=${3:-"true"}

echo "============================================================"
echo "Internal Documentation Version Manager"
echo "============================================================"
echo "Version: $VERSION"
echo "Alias: $ALIAS"
echo "Update Alias: $UPDATE_ALIAS"
echo "------------------------------------------------------------"

# Build the internal documentation
echo "Building internal documentation..."
./build.sh internal site-internal production build

# Deploy the version
if [ "$UPDATE_ALIAS" = "true" ]; then
    echo "Deploying version $VERSION with alias $ALIAS..."
    mike deploy --push --update-aliases $VERSION $ALIAS
else
    echo "Deploying version $VERSION without updating aliases..."
    mike deploy --push $VERSION
fi

echo "------------------------------------------------------------"
echo "Version deployed successfully!"
echo "To view this version locally, run: mike serve"
echo "============================================================"