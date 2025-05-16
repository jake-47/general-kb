#!/bin/bash
# Script to create sample versions for testing the internal versioning feature

echo "Creating sample versions for internal documentation..."

# Initialize the mike versioning system
echo "Initializing versioning system..."
./build.sh internal site-internal production version "latest" "latest"

# Create version 2023.1
echo "Creating version 2023.1..."
./build.sh internal site-internal production version "2023.1" "2023.1"

# Create version 2023.2
echo "Creating version 2023.2..."
./build.sh internal site-internal production version "2023.2" "2023.2"

# Create version 2023.3 as stable
echo "Creating version 2023.3 as stable..."
./build.sh internal site-internal production version "2023.3" "stable"

echo "Sample versions created successfully!"
echo "To view the versioned documentation, run:"
echo "./build.sh internal site-internal development serve versioned 5001"