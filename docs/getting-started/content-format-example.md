# Internal Content Example

This page demonstrates how to display internal-only content using the new admonition-based approach.

## Old Approach (Tabbed Content)

Previously, we used tabs to separate public and internal content:

```markdown
=== "Public"
    This information is visible to everyone.

=== "Internal Only"
    This information is only for internal users.
```

## New Approach (Admonition)

Now we use a single flow of content, with special admonition blocks for internal-only information:

```markdown
Regular content is visible to everyone by default.

!!! internal "Internal Only"
    This information is restricted to internal Sitetracker staff only.
```

Which renders as:

Regular content is visible to everyone by default.

!!! internal "Internal Only"
    This information is restricted to internal Sitetracker staff only.

## Advanced Examples

### API Documentation

Here's how you might document an API, with some restricted internal details:

#### User Management API

The User Management API allows you to create, read, update, and delete users in the system.

**Base URL**: `https://api.sitetracker.com/v1/users`

##### Authentication

All API endpoints require authentication using a Bearer token.

```
Authorization: Bearer YOUR_API_TOKEN
```

!!! internal "Internal Authentication Details"
    For internal systems, we use the service account `api-internal@sitetracker.com` 
    with the token stored in the shared password manager.
    
    Development environments use simplified authentication with the token: 
    `dev-env-token-123456789`

##### Endpoint: Create User

```
POST /users
```

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin"
}
```

!!! internal "Internal Implementation Notes"
    The user creation process triggers several internal workflows:
    
    1. User record is created in the main database
    2. Provisioning workflow is triggered in the background job queue
    3. Welcome email is scheduled through the messaging service
    
    **Known Issues:**
    
    * Race condition can occur if concurrent create requests happen for the same email
    * In high load situations, the provisioning workflow can be delayed

### Configuration Guide

Here's how you might document configuration settings with some internal-only details:

#### System Configuration

Configure the application through the `config.json` file:

```json
{
  "app_name": "SiteTracker Instance",
  "theme": "default",
  "cache_timeout": 3600,
  "max_upload_size": "10MB"
}
```

!!! internal "Internal Configuration Options"
    The following additional configuration options are available for internal deployments:
    
    ```json
    {
      "debug_mode": false,
      "internal_api_endpoint": "https://internal-api.sitetracker.com",
      "log_level": "error",
      "feature_flags": {
        "experimental_features": false,
        "beta_reporting": false
      }
    }
    ```
    
    **Security Note:** Never enable `debug_mode` in production environments as it exposes sensitive information.

## Benefits of the New Approach

1. Clearer distinction between public and internal content
2. No need to duplicate shared content across tabs
3. Better flow of documentation with supplementary internal notes
4. Easier to maintain and update
5. More consistent visual treatment of internal content