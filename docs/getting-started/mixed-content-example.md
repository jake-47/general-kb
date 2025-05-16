# Mixed Content Example

This page demonstrates how to embed internal content within public documentation.

## Product Overview

Sitetracker helps you manage and track assets, work, and projects in a single platform.

=== "Public"
    The Sitetracker platform offers robust project management capabilities for tracking site-based projects and assets.
    
    ![Project Dashboard](/assets/images/project-dashboard.png)

=== "Internal Only"
    The platform uses a proprietary algorithm for resource allocation that combines machine learning with historical project data.
    
    Key internal metrics to monitor:
    
    - Processing time per project (target: <2.5ms)
    - Database query optimization (check execution plans)
    - Cache hit ratio (target: >85%)

## Getting Started

Follow these steps to set up your first project.

1. Navigate to the Projects section
2. Click "New Project"
3. Fill in the required fields

=== "Public"
    The standard project creation workflow includes basic fields like name, description, start date, and end date.
    
    ```
    Required fields:
    - Project Name
    - Description
    - Start Date
    - Project Type
    ```

=== "Internal Only"
    When creating projects for enterprise customers, ensure you set the correct account hierarchy and billing codes.
    
    ```
    Additional required fields for enterprise:
    - Billing Code
    - Department Code
    - Account Hierarchy
    - SLA Profile
    - Priority Schema
    ```
    
    For projects with a value >$100k, contact the Solutions Architecture team for additional review.

## Configuration Options

The platform offers various configuration options to customize your experience.

=== "Public"
    Standard configuration options include:
    
    - User permissions
    - Notification preferences
    - Dashboard layouts
    - Report templates

=== "Internal Only"
    Advanced configuration options for admins:
    
    - SQL query builder for custom reports
    - Database optimization settings
    - API rate limit adjustments
    - Custom field mapping to legacy systems
    - Hidden debug menu: press Ctrl+Shift+D on any screen
    
    Note: When customizing for clients, refer to the internal pricing matrix for add-on features.

## Support Resources

=== "Public"
    For support, please contact:
    
    - Email: support@sitetracker.com
    - Phone: (800) 555-1234
    - Hours: Monday-Friday, 8am-6pm EST

=== "Internal Only"
    Support escalation path:
    
    1. L1 Support: Initial triage (response in 1 hour)
    2. L2 Support: Advanced troubleshooting (response in 30 min)
    3. L3 Support: Engineering assistance (response in 15 min)
    
    For critical issues (P0/P1):
    - Use the emergency Slack channel: #emergency-support
    - Call the on-call engineer: 555-123-4567
    - Passwords for production diagnostic tools: See password manager under "Prod Support"