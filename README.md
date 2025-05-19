# General Purpose Knowledge Base Framework

## Project Overview
A powerful documentation platform that combines simplicity with advanced features, giving you complete control over how you present, secure, and distribute information.
What Makes This Different
This knowledge base framework is designed with a dual-purpose architecture that lets you maintain a single source of truth while serving different content to different audiences. It's perfect for organizations that need to maintain both public documentation and internal knowledge.

### Core Principles
**Single Source, Dual Output**: Maintain content in one repository while generating separate internal and external builds
**Privacy By Design**: Automatically filter internal-only content from public-facing documentation
**Docs-as-Code Workflow**: Use familiar Git workflows, branches, and pull requests to manage documentation
**Developer-Friendly**: Built on open standards with Markdown, Python, and JavaScript
**Future-Proof**: Version-controlled documentation with full history tracking and parallel version access

### Designed for Teams
This framework bridges the gap between technical and non-technical team members:
**For Writers**: Focus on content creation in Markdown without worrying about implementation details
**For Developers**: Integrate documentation directly into your development workflow with CI/CD support
**For Product Teams**: Link documentation to JIRA tickets to track documentation alongside features
**For IT Teams**: Secure deployment options for both public and private documentation needs

### Key Technical Features
**Robust Content Separation**: Built-in mechanisms for excluding sensitive information from public builds
**Modern UI**: Responsive design with light/dark mode, collapsible sections, and optimized navigation
**Enhanced Search**: Configurable search with Algolia integration option for enterprise-grade performance
**Quality Assurance**: Built-in tools for link validation, markdown linting, and documentation testing
**Deployment Flexibility**: Deploy to GitHub Pages, custom servers, or any static hosting service
**Enhanced Search Options**: Built-in search engine powered by Lunr.js that requires zero configuration or additional cost. Search interface is fully integrated with the theme and offers search highlighting, suggestions, and keyboard navigation. For extremely large documentation sites (~10,000 documents), the framework includes optional Algolia DocSearch integration, which requires additional setup and potentially introduces costs.

## Quick Start

### One-Time Setup (Only Needed When Creating Environment)
- Python 3.11 or higher
- Git
- Node.js and npm (optional, for Markdown linting)

#### 1. Clone the repository
In your terminal, run

```
git clone https://github.com/jake-47/general-kb.git
cd general-kb
```

#### 2. Create and activate a virtual environment

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**On Windows**: 
```bash
python -m venv venv
venv\Scripts\activate
```

#### 3. Install dependencies
```bash
pip install mkdocs mkdocs-material mkdocs-minify-plugin pymdown-extensions mike
```

#### 4. For macOS/Linux only: Make the build script executable 
```bash
chmod +x build.sh
```

### Each Time You Work on the Documentation

#### 5. Activate the virtual environment

**On macOS/Linux:**
```bash
source venv/bin/activate
```
**On Windows**: 
```bash
venv\Scripts\activate
```

#### 6. Run the build script to serve or build the knowledge base locally

**For internal build**:
```bash
./build.sh internal site-external development serve 8000
```
**For external build**:
./build.sh external site development serve 8001

Open a new terminal to run both builds simultaneously.


# Terminal 1: Run the external version on port 5000

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
