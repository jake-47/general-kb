# Internal-Only Content Guide

This guide explains how to create content that will only be visible in the internal Knowledge Base build.

## Overview

The SiteTracker Knowledge Base supports marking content as "internal-only" which will:

1. Display the content normally in the internal build (with special styling)
2. Hide the content completely in the external build

This feature allows you to maintain a single set of documentation files while still separating content meant for internal teams from content meant for customers.

## Using the Internal Admonition

The simplest way to mark content as internal-only is to use the custom "internal" admonition:

```markdown
!!! internal "Internal Note"
    This content will only be visible in the internal build.
    
    It can contain any Markdown formatting, including:
    - Lists
    - **Bold text**
    - [Links](https://example.com)
    - Code blocks
    - Images
```

This will render as:

!!! internal "Internal Note"
    This content will only be visible in the internal build.
    
    It can contain any Markdown formatting, including:
    - Lists
    - **Bold text**
    - [Links](https://example.com)
    - Code blocks
    - Images

### Collapsible Internal Admonition

You can also create a collapsible version using the `???` syntax:

```markdown
??? internal "Internal Configuration Details"
    This content is collapsible and only visible in the internal build.
    
    ```json
    {
      "apiKey": "secret-key-value",
      "endpoint": "internal-api.sitetracker.com"
    }
    ```
```

This will render as:

??? internal "Internal Configuration Details"
    This content is collapsible and only visible in the internal build.
    
    ```json
    {
      "apiKey": "secret-key-value",
      "endpoint": "internal-api.sitetracker.com"
    }
    ```

## Using the Internal-Only Class

For more flexibility, you can use the `internal-only` CSS class on any HTML element:

```html
<div class="internal-only">
This entire section is only visible in the internal build.

You can include any Markdown or HTML content here.

![Internal Image](/assets/images/internal-diagram.png)
</div>
```

This will render with a subtle purple left border and an "Internal Only" label at the top.

## Using Tabbed Content

For content that has both external and internal versions, you can use the tabbed content feature:

```markdown
=== "Public"
    This content is visible to everyone.
    
=== "Internal Only"
    This content is only visible in the internal build.
```

This approach is useful when you want to provide different information about the same topic to internal and external audiences.

## Technical Implementation

The internal-only content feature is implemented with:

1. **CSS Styling**: Custom styling in `assets/stylesheets/custom-admonitions.css` defines the appearance of internal content.

2. **JavaScript Logic**: The `assets/javascripts/internal-content-handler.js` script detects the build type and hides internal content in external builds.

3. **Build Configuration**: The `window.DOCS_ENV.isInternal` flag is set to `true` in the internal build and `false` in the external build.

### Hiding Mechanism

When the external build is detected, the JavaScript automatically:

1. Hides all elements with class `.internal-only`
2. Hides all admonitions with class `.admonition.internal`
3. Hides all collapsible details with class `.internal`
4. Hides all tabs with class `.tabbed-internal`

## Best Practices

1. **Be selective**: Only mark content as internal when it genuinely contains sensitive information.

2. **Provide context**: Don't just hide information without explanation - provide context in the public content.

3. **Consider restructuring**: If a page has more internal content than public content, consider moving it entirely to the internal documentation section.

4. **Be mindful of links**: Don't create public content that links to internal-only pages.

5. **Version considerations**: Remember that internal content may change between versions - be careful when documenting version-specific internal details.

## Example Page

For a complete example of mixing public and internal content, see the [Mixed Content Example](../getting-started/mixed-content-example.md) page.

For a demonstration of the different internal admonition styles, see the [Internal Callout Example](../getting-started/internal-callout-example.md) page.