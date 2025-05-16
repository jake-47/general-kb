# Configuration Guide

This guide helps you configure SiteTracker to meet your organization's specific needs. SiteTracker is highly customizable, allowing you to tailor the platform to your business processes.

<div class="grid cards" markdown>

- :material-account-cog: **User Setup**  
  Configure user roles and permissions

- :material-application-cog: **Platform Settings**  
  Customize global SiteTracker settings

- :material-form-select: **Field Configuration**  
  Create and manage custom fields

- :material-workflow: **Workflow Design**  
  Design automated business processes

</div>

## User Management

### User Roles and Permissions

SiteTracker uses a role-based access control system to manage user permissions:

1. **Navigate to Settings**: Log in as an administrator and go to **Settings > Users & Permissions > Roles**

2. **Create or Edit Roles**: You can create new roles or edit existing ones:
   
   | Default Role | Description |
   |--------------|-------------|
   | Administrator | Full access to all features and settings |
   | Manager | Can manage projects and users, but limited admin access |
   | Field Technician | Mobile-focused access for site work and data collection |
   | Read Only | View-only access to projects and records |

3. **Configure Permissions**: For each role, set permissions for:
   
   - **Object Access**: Which records users can view/edit
   - **Field Access**: Which fields users can view/edit
   - **Feature Access**: Which features users can access
   - **Report Access**: Which reports users can view/export

### User Onboarding

To add new users to your SiteTracker instance:

=== "Individual Users"
    1. Go to **Settings > Users & Permissions > Users**
    2. Click **New User**
    3. Enter the user's email address and name
    4. Assign appropriate role(s)
    5. Click **Save & Send Invitation**

=== "Bulk Import"
    1. Go to **Settings > Users & Permissions > Users**
    2. Click **Import Users**
    3. Download the template CSV file
    4. Fill in user details following the template format
    5. Upload the completed CSV
    6. Review the preview and click **Import**

## Platform Configuration

### Global Settings

Configure platform-wide settings in **Settings > General**:

- **Organization Information**: Company name, logo, contact details
- **Regional Settings**: Date/time formats, currency, language
- **Security Settings**: Password policies, session timeouts, IP restrictions
- **Email Settings**: Notification templates, email footer

### Calendar and Scheduling

Configure how SiteTracker handles dates and scheduling:

1. Go to **Settings > Calendar**
2. Define **Working Hours** for your organization
3. Set up **Holiday Calendars** for different regions
4. Configure **Scheduling Rules** for resource allocation

## Custom Fields Configuration

SiteTracker allows you to create custom fields to capture your organization's unique data:

### Creating Custom Fields

1. Go to **Settings > Objects & Fields**
2. Select the object you want to customize (Projects, Assets, Work Orders, etc.)
3. Click **New Field**
4. Choose a field type:
   
   | Field Type | Use Case |
   |------------|----------|
   | Text | Names, descriptions, IDs |
   | Number | Quantities, measurements |
   | Date/Time | Deadlines, appointments |
   | Picklist | Predefined value selection |
   | Lookup | Reference to other records |
   | Formula | Calculated values |
   | File | Document attachments |
   | Location | Geospatial coordinates |

5. Configure field properties (required, unique, default value, etc.)
6. Set field-level security for different user roles
7. Click **Save**

### Field Dependency Rules

Create dynamic forms that change based on user input:

1. Go to **Settings > Objects & Fields > Field Dependencies**
2. Click **New Dependency Rule**
3. Select the controlling field and dependent field
4. Define the logic (e.g., "If Status = 'Complete', make 'Completion Date' required")
5. Click **Save**

## Workflow Automation

Configure automated business processes to enforce standards and boost efficiency:

### Creating Workflow Rules

1. Go to **Settings > Workflows > Workflow Rules**
2. Click **New Rule**
3. Select the object the rule applies to
4. Define the trigger condition:
   
   === "Time-Based"
       - Trigger when a record meets criteria for a specified time
       - E.g., "When a Work Order is 'Open' for more than 3 days"
   
   === "Event-Based"
       - Trigger when a record is created or edited
       - E.g., "When Project Status changes to 'Complete'"
   
   === "Formula-Based"
       - Trigger based on a custom formula evaluation
       - E.g., "When Actual Cost > Budgeted Cost * 1.1"

5. Define the actions to take when triggered:
   
   - Update fields
   - Create tasks
   - Send notifications
   - Create new records
   - Call external services via API

6. Set the execution criteria and order
7. Click **Save** and **Activate**

### Email Alerts

Set up automated email notifications:

1. Go to **Settings > Workflows > Email Alerts**
2. Click **New Alert**
3. Select the triggering object and conditions
4. Define recipients (users, roles, or external emails)
5. Create the email template
6. Set the timing and frequency
7. Click **Save** and **Activate**

## Integration Settings

Configure how SiteTracker integrates with external systems:

### API Configuration

1. Go to **Settings > Integrations > API Settings**
2. Configure authentication methods
3. Set up webhooks for real-time integrations
4. Define API rate limits

### Single Sign-On (SSO)

Set up SSO with your identity provider:

=== "SAML 2.0"
    1. Go to **Settings > Security > Single Sign-On**
    2. Enable SAML authentication
    3. Enter your Identity Provider details:
       - Entity ID
       - SSO URL
       - Certificate
    4. Configure user attribute mapping
    5. Test the configuration
    6. Click **Save**

=== "OAuth 2.0"
    1. Go to **Settings > Security > Single Sign-On**
    2. Enable OAuth authentication
    3. Configure your OAuth provider
    4. Set up the callback URL in your provider
    5. Test the configuration
    6. Click **Save**

## Mobile Configuration

Optimize the SiteTracker mobile experience:

1. Go to **Settings > Mobile**
2. Configure **Offline Mode Settings**:
   - Select which records to sync for offline access
   - Set sync frequency and storage limits
3. Define **Mobile Layouts**:
   - Customize which fields appear on mobile forms
   - Optimize screen layouts for field use
4. Configure **Mobile Actions**:
   - Create shortcuts for common mobile tasks
   - Set up barcode scanning rules

## Configuration Best Practices

- **Start Simple**: Begin with basic configurations and add complexity as needed
- **Test Thoroughly**: Always test configuration changes in a sandbox environment first
- **Document Changes**: Keep a record of all configuration changes and their purpose
- **Consider Performance**: Excessive automation rules or complex formulas can impact system performance
- **Use Validation Rules**: Prevent data issues with field validation rules
- **Regularly Review**: Audit configurations periodically to remove unused elements
- **Train Users**: Ensure users understand how configuration changes affect their workflow

## Need Help?

- **Knowledge Base**: Visit our [configuration guides](https://kb.sitetracker.com/configuration)
- **Community**: Join our [community forum](https://community.sitetracker.com) to share best practices
- **Professional Services**: Contact our [services team](mailto:services@sitetracker.com) for custom configuration assistance
