# API Overview

The SiteTracker API allows you to integrate SiteTracker with your existing systems and build custom applications that leverage SiteTracker's powerful deployment operations management platform.

<div class="grid cards" markdown>

- :material-check-decagram: **REST API**  
  Industry-standard RESTful API design

- :material-shield-lock: **OAuth 2.0**  
  Secure authentication using OAuth 2.0

- :material-package-variant-closed: **JSON Format**  
  All responses are in JSON format

- :material-clock-fast: **Rate Limiting**  
  10,000 requests per hour per API key

</div>

## Base URL

All API calls should be made to the following base URL:

```
https://api.sitetracker.com/v1
```

## Authentication

SiteTracker uses OAuth 2.0 for API authentication. To authenticate your API requests:

1. Obtain an API key from your SiteTracker account administrator
2. Include the API key in the Authorization header of your requests:

```bash
Authorization: Bearer YOUR_API_KEY
```

## API Endpoints

Here's an overview of the main endpoints available in the SiteTracker API:

### Projects

<span class="api-method api-method-get">GET</span> `/projects`  
Retrieve a list of all projects

<span class="api-method api-method-get">GET</span> `/projects/{id}`  
Retrieve details for a specific project

<span class="api-method api-method-post">POST</span> `/projects`  
Create a new project

<span class="api-method api-method-put">PUT</span> `/projects/{id}`  
Update an existing project

<span class="api-method api-method-delete">DELETE</span> `/projects/{id}`  
Delete a project

### Assets

<span class="api-method api-method-get">GET</span> `/assets`  
Retrieve a list of all assets

<span class="api-method api-method-get">GET</span> `/assets/{id}`  
Retrieve details for a specific asset

<span class="api-method api-method-post">POST</span> `/assets`  
Create a new asset

<span class="api-method api-method-put">PUT</span> `/assets/{id}`  
Update an existing asset

<span class="api-method api-method-delete">DELETE</span> `/assets/{id}`  
Delete an asset

### Work Orders

<span class="api-method api-method-get">GET</span> `/work-orders`  
Retrieve a list of all work orders

<span class="api-method api-method-get">GET</span> `/work-orders/{id}`  
Retrieve details for a specific work order

<span class="api-method api-method-post">POST</span> `/work-orders`  
Create a new work order

<span class="api-method api-method-put">PUT</span> `/work-orders/{id}`  
Update an existing work order

<span class="api-method api-method-delete">DELETE</span> `/work-orders/{id}`  
Delete a work order

## Pagination

For endpoints that return multiple items, SiteTracker uses cursor-based pagination:

```json
{
  "data": [
    // Array of items
  ],
  "pagination": {
    "next_cursor": "eyJpZCI6MTAwfQ==",
    "has_more": true
  }
}
```

To get the next page, include the `cursor` parameter in your request:

```
GET /projects?cursor=eyJpZCI6MTAwfQ==
```

## Rate Limiting

The SiteTracker API has a rate limit of 10,000 requests per hour per API key. If you exceed this limit, you'll receive a `429 Too Many Requests` response.

Rate limit headers are included in each response:

```
X-RateLimit-Limit: 10000
X-RateLimit-Remaining: 9995
X-RateLimit-Reset: 1620000000
```

## Error Handling

The API uses conventional HTTP response codes to indicate the success or failure of an API request:

- `2xx`: Success
- `4xx`: Client error (invalid request)
- `5xx`: Server error

Error responses include a consistent error object:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "The provided parameter is invalid",
    "details": {
      "field": "name",
      "issue": "required"
    }
  }
}
```

## SDK Libraries

We provide official SDK libraries for several programming languages:

=== "JavaScript"
    ```bash
    npm install sitetracker-js
    ```
    
    ```javascript
    const SiteTracker = require('sitetracker-js');
    const client = new SiteTracker('YOUR_API_KEY');
    
    client.projects.list()
      .then(projects => console.log(projects))
      .catch(error => console.error(error));
    ```

=== "Python"
    ```bash
    pip install sitetracker
    ```
    
    ```python
    import sitetracker
    
    client = sitetracker.Client("YOUR_API_KEY")
    
    try:
        projects = client.projects.list()
        print(projects)
    except sitetracker.Error as e:
        print(f"Error: {e}")
    ```

=== "Java"
    ```xml
    <dependency>
      <groupId>com.sitetracker</groupId>
      <artifactId>sitetracker-java</artifactId>
      <version>1.0.0</version>
    </dependency>
    ```
    
    ```java
    import com.sitetracker.SiteTracker;
    import com.sitetracker.model.Project;
    
    SiteTracker client = new SiteTracker("YOUR_API_KEY");
    
    try {
        List<Project> projects = client.projects.list();
        System.out.println(projects);
    } catch (SiteTrackerException e) {
        System.err.println("Error: " + e.getMessage());
    }
    ```

## Webhooks

SiteTracker provides webhooks that notify your application when events occur in your SiteTracker account. To set up a webhook:

1. Go to Settings > API > Webhooks in your SiteTracker dashboard
2. Click "Add Webhook"
3. Enter the endpoint URL where you want to receive webhook events
4. Select the events you want to subscribe to
5. Save the webhook configuration

Webhook payloads include a signature header (`X-SiteTracker-Signature`) that you can use to verify the webhook came from SiteTracker.

## Need Help?

If you need assistance with the SiteTracker API:

- Check out our [API Reference Documentation](https://developers.sitetracker.com/api)
- Browse our [Code Examples](https://developers.sitetracker.com/examples)
- Join our [Developer Community](https://community.sitetracker.com/developers)
- Contact us at api-support@sitetracker.com

