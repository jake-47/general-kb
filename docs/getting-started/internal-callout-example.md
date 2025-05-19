# Internal Callout Example

This page demonstrates how to use the new internal admonition for marking content that should only be visible in the internal build.

## Using the Internal Admonition

This Knowledge Base offers a special admonition type for internal-only content. This content will be:

- Visible in the internal build with special styling
- Hidden completely in the external build

### Standard Usage

!!! internal "Internal Note"
    This content is only visible in the internal build.
    
    It's meant for internal team members and contains information
    that shouldn't be exposed to customers or the public.

### Collapsible Version

You can also create a collapsible version:

??? internal "Internal Configuration Details"
    When configuring the system for enterprise customers, use the following settings:
    
    ```json
    {
      "enterprise": {
        "rateLimit": 5000,
        "maxConnections": 200,
        "dbPoolSize": 25,
        "cacheTimeout": 3600
      }
    }
    ```
    
    These settings are optimized for high-traffic deployments.

## How It Works

The internal admonition works via:

1. Custom CSS styling that gives it a unique purple appearance with a lock icon
2. JavaScript that detects the build type and hides these elements in the external build

## Other Ways to Mark Internal Content

Besides the admonition, you can also:

1. Use the `internal-only` class on any HTML element
2. Use tabbed content with an "Internal" tab (see mixed-content-example.md)

<div class="internal-only">
This entire div is only visible in the internal build because it has the class "internal-only".
</div>

## When To Use Each Approach

| Approach | Best For | Notes |
|----------|----------|-------|
| Internal Admonition | Highlighted callouts | Most visually distinctive |
| internal-only class | Hiding sections of content | No visual indicator |
| Tabbed Content | Alternative views of same topic | Maintains context |

Remember that all these approaches will hide content in the external build, but they will still appear in the source code if someone looks at the raw markdown files.