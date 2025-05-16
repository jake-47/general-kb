# Version Management

This guide explains how to manage versions of the internal Sitetracker documentation.

## Understanding Versioning

The internal documentation supports versioning, allowing users to view documentation for different release versions of the Sitetracker platform. The version number is the same for both internal and external builds and comes from JIRA, but only the internal documentation has the ability to access previous versions.

Versioning is particularly useful for:

- Referencing documentation for specific releases
- Comparing features between versions
- Maintaining historical documentation

## Versioning Approaches

We currently support two approaches to versioning the documentation:

1. **Git-based versioning** with `mike` (traditional approach for environments with git access)
2. **JavaScript-based versioning** (our current implementation for Replit environment)

Both approaches provide the same user experience - a version selector in the header that allows users to choose which documentation version they want to view.

## Viewing Versioned Documentation

When viewing the internal documentation, you'll see a version selector in the header. This dropdown allows you to switch between different versions of the documentation.

![Version Selector](../assets/images/version-selector.png)

The available versions typically include:

- **Latest Release**: The most recent documentation (may include unreleased features)
- **Stable Release**: The current stable release
- **Dated versions**: Specific release versions (e.g., "March 2023 Release (2023.1)")

## JavaScript-Based Version Selector

Our current implementation uses a client-side JavaScript approach for version selection. Key points about this approach:

1. The version number shown in both builds is the same and comes from JIRA
2. Only the internal build displays a dropdown selector to access previous versions
3. The dropdown selector appears in the header of internal documentation pages only
4. Version information is loaded from `versions.json` at the root of the documentation
5. When a user selects a different version, they would be redirected to that version
6. A special "Version Management" option links directly to this documentation

The selector is implemented in `docs/assets/javascripts/simple-version-selector.js` and is only loaded for internal documentation (when `window.DOCS_ENV.isInternal === true`), making it invisible to external users.

### Version Configuration

The available versions are defined in the `versions.json` file:

```json
{
  "versions": [
    {
      "version": "latest",
      "title": "Latest Release",
      "aliases": ["latest"],
      "default": true
    },
    {
      "version": "stable",
      "title": "Stable Release",
      "aliases": ["stable"]
    },
    {
      "version": "2023.3",
      "title": "December 2023 Release",
      "aliases": []
    },
    {
      "version": "2023.2",
      "title": "August 2023 Release",
      "aliases": []
    },
    {
      "version": "2023.1",
      "title": "March 2023 Release",
      "aliases": []
    }
  ]
}
```

To add or modify available versions, edit this file with the appropriate version information.

## Git-Based Versioning (Future Implementation)

For environments with git access, we can use the `mike` tool for more robust versioning. This is how it would work:

### Using the Version Script

The easiest way to create a new version is to use the `version_internal.sh` script:

```bash
./version_internal.sh "2023.4" "latest"
```

This command:
1. Builds the internal documentation
2. Creates a version labeled "2023.4" 
3. Sets it as the "latest" version

### Using the Build Script Directly

You can also use the build script with the `version` command:

```bash
./build.sh internal site-internal production version "2023.4" "latest"
```

### Parameters Explained

- First parameter: The version identifier (e.g., "2023.4")
- Second parameter: The alias to assign (e.g., "latest", "stable")
- Third parameter (optional): Whether to update aliases (default: "true")

## Version Aliases

We use aliases to provide friendly names for specific versions:

- `latest`: The most current documentation
- `stable`: The current stable release

This allows us to keep these special versions pointing to the appropriate releases as new versions are published.

## Serving Versioned Documentation Locally

To run a local server with version support:

```bash
./build.sh internal site-internal development serve versioned 5001
```

This will start a server on port 5001 with the version selector enabled.

## Available Versions

The following versions are currently available:

- Latest Release (most current documentation)
- Stable Release (current stable release)
- December 2023 Release (2023.3)
- August 2023 Release (2023.2)
- March 2023 Release (2023.1)

## Common Tasks

### Setting a New Stable Version

When a new stable version is released:

```bash
./version_internal.sh "2023.4" "stable"
```

### Creating a New Version Without Changing Aliases

To add a version without affecting existing aliases:

```bash
./version_internal.sh "2023.4" "" "false"
```

### Listing All Available Versions

To see all available versions with the git-based approach:

```bash
mike list
```

## Best Practices

1. Always keep version labels consistent across documentation and product releases
2. Maintain a clear naming convention (e.g., "Month Year Release (Version Number)")
3. Document which product features were introduced in which versions
4. When adding a new version, ensure the "Latest Release" alias points to it