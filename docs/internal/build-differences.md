# Internal vs External Build Differences

This document outlines the key differences between the internal and external builds of the Knowledge Base.

## Content Differences
1. **Internal-only content** - Internal build includes content marked with internal-only classes/sections that is hidden in the external build
2. **Version management documentation** - Internal build includes detailed documentation about versioning process and management
3. **Development guides** - Internal build includes guides for documentation development and contribution workflows
4. **Security reporting** - Internal build includes detailed security reporting procedures

## Visual & UI Differences
1. **Version selector** - Internal build has a version selector dropdown (v3.5 ▼) to access previous versions of documentation
2. **Print button** - External build has a print button, internal build does not
3. **Theme toggle position** - In internal build, theme toggle appears to the left of version indicator
4. **URL structure** - External build is served at `/kb/` path, internal build at root path (`/`)

## Configuration Differences
1. **Internal flag** - Internal build sets `internal: true` in configuration
2. **Copyright notice** - Internal build has "INTERNAL USE ONLY" appended to copyright footer
3. **Server ports** - Internal build runs on port 8000, external build on port 8001
4. **Build scripts** - Different build script parameters for internal vs external (`./build.sh internal` vs `./build.sh external`)

## Feature Differences
1. **Access control** - Internal build has additional access control mechanisms for internal users
2. **Environment indicators** - Internal builds can display environment indicators (prod, staging, etc.)
3. **Navigation expansion** - Internal build includes additional navigation sections for internal documentation

## Understanding Build Servers

The Knowledge Base has two primary build types:

1. **Standard builds** - Regular documentation builds that serve the current content
   - Internal Standard: `./build.sh internal site-internal development serve 8000`
   - External Standard: `./build.sh external site development serve 8001`

2. **Versioned builds** - Used to create, manage, and serve versioned documentation
   - This is an additional build option only for internal documentation
   - Command: `./build.sh internal site-internal development serve versioned 5001`
   - The versioned build uses [mike](https://github.com/jimporter/mike), a tool that maintains multiple versions of documentation
   - Only needed when creating new versions or managing version history

!!! note "About the Versioned Build"
    The versioned build (port 5001) is generally only needed during version creation and management.
    For regular internal documentation viewing, the standard internal build (port 8000) is sufficient.
    The versioned server helps manage the mike-based versioning system, particularly during version creation and deployment.

## Internal-Only Content

The Knowledge Base supports hiding content in the external build while keeping it visible in the internal build. This feature is useful for including implementation details, developer information, or other sensitive content that should only be visible to internal users.

!!! internal "Internal Only"
    This content will only appear in the internal build.
    It can include any markdown elements including lists, formatting, code snippets, and links.

You can create internal-only content using:

1. **Admonition blocks with the "internal" class** - styled with a purple lock icon
2. **HTML elements with the "internal-only" CSS class** - for custom HTML content
3. **Collapsible sections that only appear in internal builds** - for expandable content

The implementation uses:
- Custom CSS styling in `docs/assets/stylesheets/custom-admonitions.css`
- JavaScript in `docs/assets/javascripts/internal-content-handler.js` to hide content in external builds
- Configuration in both `mkdocs.yml` and `mkdocs.internal.yml`

For complete documentation on creating and managing internal-only content, see the [Internal-Only Content](internal-content.md) guide.

## Build and Deployment Information

The Knowledge Base has two main builds:

* **Internal Build** - Served on port 8000, includes all content
* **External Build** - Served on port 8001 at path `/kb/`, excludes internal content

These builds are managed through the `build.sh` script with appropriate parameters.