markdown<img src="logo.svg" alt="Logo" width="300">

# Knowledge Base

## Project Overview
This Knowledge Base is designed to:
- Provide a streamlined, modern documentation experience
- Support both external (customer-facing) and internal documentation
- Follow docs-as-code principles with Git-based workflows
- Integrate with JIRA for ticket-based documentation development
- Offer powerful search and navigation capabilities

## Key Features

### Design and Branding

- **Professional UI**: Clean, modern Knowledge Base experience with Material theme
- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Dark Mode Support**: Enhanced dark theme with proper contrast
- **Print Optimization**: Comprehensive print styles for PDF generation

### Navigation and Structure

- **Streamlined Navigation**: Simplified left-side navigation with intuitive hierarchy
- **Collapsible Sections**: Dropdown arrows for collapsible sections
- **In-place Expansion**: Navigation expands sections in place
- **Section Index Pages**: Section parent pages provide high-level overviews

### 🔍 Search and Content Management

- **Centered Search Bar**: Optimized search layout and behavior
- **Content Controls**: Internal/External content separation with admonition boxes
- **Advanced TOC**: Customized table of contents with level filtering
- **Heading Level Control**: Right panel shows only level 2-4 headings, not page titles

### 🚀 Technical Features

- **Documentation as Code**: Complete docs-as-code workflow with Git integration
- **MkDocs Framework**: Built on MkDocs with Material theme
- **Algolia Search Integration**: Optional Algolia DocSearch integration
- **Link Validation**: Robust link checker to prevent broken links
- **Markdown Linting**: Ensures consistent documentation formatting
- **Branch-based Workflow**: Support for JIRA ticket-based documentation

## Quick Start

### Prerequisites

- Python 3.11 or higher
- Git (to clone the repository)
- Node.js and npm (optional, for Markdown linting)

### Setup in 5 Minutes

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/knowledge-base.git
cd knowledge-base

# 2. Create and activate a virtual environment
# On Windows:
python -m venv venv
venv\Scripts\activate

# On macOS/Linux:
python -m venv venv
source venv/bin/activate

# 3. Install dependencies
pip install mkdocs mkdocs-material mkdocs-minify-plugin pymdown-extensions mike

# 4. Make the build script executable (macOS/Linux only)
chmod +x build.sh

# 5. Run the documentation server (external version)
./build.sh external site development serve 5000
Running Both Versions Simultaneously
bash# Terminal 1: Run the external version on port 5000
./build.sh external site-external development serve 5000

# Terminal 2: Run the internal version on port 5001
./build.sh internal site-internal development serve 5001
Directory Structure
knowledge-base/
├── docs/                       # Main documentation content
│   ├── assets/                 # Static assets (JS, CSS, images)
│   │   ├── javascripts/        # JavaScript files
│   │   └── stylesheets/        # CSS files
│   ├── overrides/              # Theme customization templates
│   ├── features/               # Feature documentation
│   ├── getting-started/        # Getting started guides
│   ├── internal/               # Internal-only documentation
│   └── home/                   # Home section
├── site/                       # Generated external site (not in git)
├── site-internal/              # Generated internal site (not in git)
├── mkdocs.yml                  # External site configuration
├── mkdocs.internal.yml         # Internal site configuration
├── build.sh                    # Main build script
└── README.md                   # Project overview
Content Authoring
Internal-Only Content
To add internal-only content within pages, use the internal admonition:
markdownRegular content is visible to everyone by default.

!!! internal "Internal Only"
    This information is restricted to internal staff only.
OS-Specific Instructions
markdown=== "Windows"
    Windows-specific instructions go here

=== "macOS"
    macOS-specific instructions go here

=== "Linux"
    Linux-specific instructions go here
Advanced Configuration
Script Options
The build script supports various configuration options:
bash./build.sh [external|internal] [output_directory] [environment] [serve] [port] [server_address]
Parameters:

Build Type: external or internal (default: external)
Output Directory: Where to save the built site (default: site)
Environment: development, staging, or production (default: production)
Serve: Add serve to start a local server
Port: Server port when using serve (default: 8001 for external, 8000 for internal)
Server Address: IP address to bind server to (default: 0.0.0.0)

Examples:
bash# External docs in development mode at port 8001
./build.sh external site development serve 8001

# Internal docs in staging environment
./build.sh internal site-internal staging serve 8000

# Build production-ready external docs without serving
./build.sh external site production
Troubleshooting
Common issues and solutions:

Permission denied when running build.sh
bashchmod +x build.sh

Python version issues
Ensure you're using Python 3.11 or higher:
bashpython --version

Port is already in use
Start the server on a different port:
bash./build.sh external site development serve 8000

Missing dependencies
If you see errors about missing packages:
bashpip install -e .

"mkdocs: command not found" error
Use the Python module syntax instead:
bashpython -m mkdocs build -f mkdocs.yml -d site
cd site && python -m http.server 5000 --bind 0.0.0.0


Customization
The Knowledge Base is designed to be highly customizable:

Styling: Modify docs/assets/stylesheets/extra.css for custom CSS
JavaScript: Enhance functionality in docs/assets/javascripts/site-core.js and extra.js
Templates: Override theme components in docs/overrides/ directory
Config: Adjust site settings in mkdocs.yml and mkdocs.internal.yml

Deployment
GitHub Pages
bash# Build the site
./build.sh external site production build

# Deploy to GitHub Pages (using mike for versioning)
mike deploy --push --update-aliases latest main
Custom Server Deployment
bash# Build the production site
./build.sh external site production build

# Copy the built site to your web server
rsync -avz --delete site/ user@server:/path/to/webroot/
Version Management
This project uses Mike for managing multiple versions of documentation:
bash# Deploy version 1.0.0 as "latest"
mike deploy 1.0.0 latest

# Set default version
mike set-default latest
Contributing
We welcome contributions to improve this Knowledge Base! Here's how to contribute:

Fork the repository to your GitHub account
Create a branch for your feature or fix
Make your changes following our content guidelines
Test your changes by running the documentation server locally
Commit your changes with clear, descriptive commit messages
Submit a pull request to the main repository

Before submitting a pull request, please run:
bash# Check links
./check_links.sh

# Lint markdown
./lint.sh

# Verify documentation builds without errors
./verify_docs.sh
License
Copyright © 2025. All rights reserved.