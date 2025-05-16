# Internal Content Guide

This guide explains how to work with internal-only content in the Sitetracker Knowledge Base.

## Overview

The Knowledge Base supports both external (public) and internal content. We've moved away from the tab-based approach to a cleaner, admonition-based method for handling internal-only content.

## Internal Content With Admonitions

Use special admonition blocks to mark content as internal-only. This content will:

- Display in the internal documentation site
- Be hidden in the external documentation site in production environments
- Be visible (but clearly marked) in development/staging environments

### Syntax

```markdown
!!! internal "Internal Only"
    This information is restricted to internal Sitetracker staff only.
```

Which renders as:

!!! internal "Internal Only"
    This information is restricted to internal Sitetracker staff only.

## When To Use Internal Content

Use internal content blocks when you need to share:

1. **Implementation Details**: Technical details about how a feature is implemented
2. **Known Issues**: Information about edge cases or bugs that are being addressed
3. **Internal Processes**: Descriptions of internal workflows or procedures
4. **Security Information**: Security details that shouldn't be publicly visible
5. **API Credentials**: Test credentials, internal API endpoints, or authentication details
6. **Upcoming Features**: Information about features still in development

## Advantages Over Tabs

The admonition-based approach offers several advantages over the previous tab-based method:

1. **Better Flow**: Content reads naturally without jumping between tabs
2. **Reduced Duplication**: No need to duplicate context in both tabs
3. **Clearer Distinction**: Visually obvious what's internal vs. external
4. **Easier Maintenance**: Simpler to update and maintain
5. **Content Hierarchy**: Maintains proper document structure and heading hierarchy

## Example Use Cases

### 1. API Documentation with Internal Notes

```markdown
## User API Endpoint

The User API allows you to manage user accounts.

### Authentication

All requests require a valid API token in the Authorization header.

!!! internal "Authentication Implementation"
    The authentication system uses JWT tokens with a 24-hour expiration.
    Tokens are validated against the auth database with each request.
    
    During an outage, you can use the emergency endpoint:
    `https://emergency-auth.sitetracker.internal/`

### GET /users

Retrieves a list of users.

!!! internal "Rate Limiting"
    This endpoint has a rate limit of 100 requests per minute per API key.
    For internal services, use the service account keys which have higher limits.
```

### 2. Feature Documentation with Internal Details

```markdown
## Dashboard

The dashboard provides a real-time overview of all projects.

!!! internal "Performance Considerations"
    The dashboard may become slow with more than 10,000 active projects.
    When this happens, recommend users apply filters to reduce the dataset size.
    
    We're implementing data pagination in the next release to address this issue.

### Filtering Projects

Use the filter panel to narrow down projects by status, owner, or date.

!!! internal "Filter Implementation"
    Filters use Elasticsearch in the backend. If users report slow filtering,
    check the Elasticsearch cluster health in Datadog.
```

## Conversion From Tabs to Admonitions

When converting existing content from tabs to admonitions, follow these guidelines:

1. Keep all content from the "Public" tab as regular content
2. Convert "Internal Only" tab content to admonition blocks within the relevant sections
3. Make sure heading levels are appropriate (don't put an H2 heading inside an admonition)
4. Check that the narrative flow still makes sense

### Before (Tab-based):

```markdown
=== "Public"
    ## Feature X
    
    Feature X lets users organize their projects.
    
    ### Using Feature X
    
    Click the X button to start.

=== "Internal Only"
    ## Feature X
    
    Feature X is implemented using React components.
    
    ### Implementation Details
    
    The backend uses GraphQL to fetch the data.
```

### After (Admonition-based):

```markdown
## Feature X

Feature X lets users organize their projects.

!!! internal "Implementation Details"
    Feature X is implemented using React components.
    The backend uses GraphQL to fetch the data.

### Using Feature X

Click the X button to start.
```

## Best Practices

1. **Be Selective**: Only mark content as internal when necessary
2. **Maintain Context**: Ensure that both internal and external users have enough context
3. **Keep Flow**: Place internal admonitions where they naturally fit within the content
4. **Be Concise**: Keep internal notes focused and relevant
5. **Proper Headings**: Don't include section headings inside admonitions
6. **Documentation Updates**: Keep internal notes updated when implementation changes

## Technical Implementation

The visibility of internal content is controlled through CSS and JavaScript:

- In the internal build, all content is visible
- In development/staging environments, internal content is visible but clearly marked
- In production external builds, internal content is hidden completely

The environment configuration is set in `env-config.js` and managed by the build script.