# Sitetracker Knowledge Base

<div align="center">
  <img src="../logo.svg" alt="Sitetracker Logo" width="300">
  <h3>Enterprise-grade Documentation Platform</h3>
  <p>A sophisticated documentation platform that provides an intelligent and interactive knowledge base with advanced content management capabilities.</p>
</div>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#customization">Customization</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#license">License</a>
</p>

## Project Overview

The Sitetracker Knowledge Base is a comprehensive documentation platform designed to:

1. Provide a streamlined, modern documentation experience
2. Support both external (customer-facing) and internal documentation
3. Follow docs-as-code principles with Git-based workflows
4. Integrate with JIRA for ticket-based documentation development
5. Match Sitetracker's branding and design language
6. Offer powerful search and navigation capabilities

## Key Features

### Design and Branding

- **Professional UI**: Clean, modern Knowledge Base experience with Material theme
- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Dark Mode Support**: Enhanced dark theme with proper contrast
- **Theme-aware Logo**: Automatic logo switching between light and dark modes
- **Print Optimization**: Comprehensive print styles for PDF generation

### Navigation and Structure

- **Streamlined Navigation**: Simplified left-side navigation with intuitive hierarchy
- **Collapsible Sections**: Dropdown arrows for collapsible sections
- **In-place Expansion**: Navigation expands sections in place
- **Section Index Pages**: Section parent pages provide high-level overviews

### Search and Content Management

- **Centered Search Bar**: Optimized search layout and behavior
- **Content Controls**: Internal/External content separation with admonition boxes
- **Advanced TOC**: Customized table of contents with level filtering
- **Heading Level Control**: Right panel shows only level 2-4 headings, not page titles
- **Feature Documentation**: Comprehensive docs for key features

### Technical Features

- **Documentation as Code**: Complete docs-as-code workflow with Git integration
- **MkDocs Framework**: Built on MkDocs with Material theme
- **Algolia Search Integration**: Optional Algolia DocSearch integration
- **Link Validation**: Robust link checker to prevent broken links
- **Markdown Linting**: Ensures consistent documentation formatting
- **Branch-based Workflow**: Support for JIRA ticket-based documentation

## Technology Stack

- **Framework**: MkDocs with Material Theme
- **Languages**: Python, Markdown, JavaScript, CSS
- **Deployment**: GitHub Pages, CI/CD pipeline
- **Extensions**: Python-Markdown, PyMdown, Pygments
- **Tools**: Markdownlint, Link Validator, Search Enhancement

## Quick Start

### Prerequisites

- Python 3.11 or higher
- Git (to clone the repository)
- Node.js and npm (optional, for Markdown linting)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/jake-47/sitetracker-kb.git
cd sitetracker-kb

# 2. Create and activate a virtual environment
python -m venv venv

# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# 3. Install dependencies
pip install mkdocs mkdocs-material mkdocs-minify-plugin pymdown-extensions mike mkdocs-htmlproofer-plugin

# 4. Make the build script executable (macOS/Linux only)
chmod +x build.sh

# 5. Run the documentation server (external version)
./build.sh external site development serve 5000
```

### Running Both Versions Simultaneously

To view both the external and internal documentation at the same time:

```bash
# Terminal 1: Run the external version on port 5000
./build.sh external site-external development serve 5000

# Terminal 2: Run the internal version on port 5001
./build.sh internal site-internal development serve 5001
```

## Documentation

### Key Files and Directories

```
sitetracker-kb/
├── docs/                       # Main documentation content
│   ├── assets/                 # Static assets (JS, CSS, images)
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
```

### Content Authoring

To add internal-only content within pages, use the internal admonition:

```markdown
Regular content is visible to everyone by default.

!!! internal "Internal Only"
    This information is restricted to internal Sitetracker staff only.
```

For OS-specific instructions:

```markdown
=== "Windows"
    Windows-specific instructions go here

=== "macOS"
    macOS-specific instructions go here

=== "Linux"
    Linux-specific instructions go here
```

## Contributing

We welcome contributions to improve the Sitetracker Knowledge Base! Here's how to contribute:

1. **Fork the repository** to your GitHub account
2. **Create a branch** for your feature or fix
3. **Make your changes** following our content guidelines
4. **Test your changes** by running the documentation server locally
5. **Commit your changes** with clear, descriptive commit messages
6. **Submit a pull request** to the main repository

Before submitting a pull request, please run:

```bash
# Check links
./check_links.sh

# Lint markdown
./lint.sh

# Verify documentation builds without errors
./verify_docs.sh
```

## Customization

The Knowledge Base is designed to be highly customizable:

- **Styling**: Modify `docs/assets/stylesheets/extra.css` for custom CSS
- **JavaScript**: Enhance functionality in `docs/assets/javascripts/extra.js`
- **Templates**: Override theme components in `docs/overrides/` directory
- **Config**: Adjust site settings in `mkdocs.yml` and `mkdocs.internal.yml`

## Deployment

The documentation can be deployed to various hosting platforms:

### GitHub Pages

The simplest deployment option is GitHub Pages:

```bash
# Build the site
./build.sh external site production build

# Deploy to GitHub Pages (using mike for versioning)
mike deploy --push --update-aliases latest main
```

### Custom Server Deployment

For custom server deployment:

```bash
# Build the production site
./build.sh external site production build

# Copy the built site to your web server
rsync -avz --delete site/ user@server:/path/to/webroot/
```

## License

Copyright © 2025 Sitetracker, Inc. All rights reserved.

---

<p align="center">
  <em>Built with ❤️ by the Sitetracker Documentation Team</em>
</p>