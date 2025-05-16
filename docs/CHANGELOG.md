# Knowledge Base Changelog

## May 14, 2025

### Server and JavaScript Improvements
- Changed server addresses to use 0.0.0.0 for better compatibility with Replit
- Fixed several JavaScript errors by adding defensive error handling
- Added utils.js with helper functions for safer DOM operations
- Optimized JavaScript load order to prevent race conditions

### Internal Content Features
- Added purple lock icon for internal-only admonitions
- Created special CSS styling for internal content
- Added JavaScript functionality to hide internal content in external builds
- Documented multiple ways to mark content as internal-only

### Documentation
- Added Internal Callout Example page demonstrating admonition usage
- Created comprehensive guide for internal-only content
- Added Mixed Content Example page showing tab-based content separation
- Improved build differences documentation

### Navigation and Configuration
- Updated navigation menus to include new example pages
- Fixed duplicate JavaScript includes in configuration files
- Fixed duplicate menu entries in internal navigation

## May 13, 2025

### Version Selection
- Implemented template-based version selection for internal builds
- Created cleaner dropdown with "v3.5 ▼" design
- Added ability to select from multiple stored versions
- Fixed CSS for version dropdown to match site theme

### Site Branding
- Changed site title to just "Knowledge Base" for both builds
- Removed "(internal)" text from page titles
- Moved internal status indicator to right of title
- Fixed CSS and alignment issues for better appearance

### Internal/External Build Configuration
- Changed server ports to 8000 (internal) and 8001 (external)
- Updated build scripts to support both build types
- Added consistent environment indicators
- Enhanced build script with better error handling

## Earlier Changes

### UI Improvements
- Added tabbed content support for OS-specific instructions
- Improved code block styling with language indicators
- Enhanced search experience with better UX
- Updated to latest Material for MkDocs theme

### Documentation Structure
- Restructured navigation for better content organization
- Created dedicated sections for user guides and API documentation
- Added example pages with formatting demonstrations
- Improved release notes format