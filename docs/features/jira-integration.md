# JIRA Workflow Integration

The Knowledge Base seamlessly integrates with your existing JIRA workflow, enabling documentation to stay in sync with your development and support processes.

## Overview

The JIRA integration allows you to:

1. **Link Documentation to JIRA Issues** - Connect relevant documentation directly to JIRA tickets
2. **Track Documentation Changes** - Monitor how documentation evolves through JIRA tickets
3. **Generate Branch-Specific Documentation** - Create documentation versions tied to feature branches
4. **Automate Documentation Workflows** - Trigger documentation updates based on JIRA status changes

## Connecting JIRA and Knowledge Base

### Setup Process

1. **Administrator Configuration**:
   - Navigate to Admin Settings > Integrations > JIRA
   - Enter your JIRA instance URL
   - Provide API credentials (as configured by your JIRA administrator)
   - Select which JIRA projects to integrate with

2. **User Authentication**:
   - Each user will need to authenticate with their JIRA credentials
   - Go to My Profile > Connected Services
   - Click "Connect to JIRA" and follow the OAuth prompts

3. **Permission Mapping**:
   - Map JIRA roles to Knowledge Base permission levels
   - Example: JIRA Project Admins automatically get Knowledge Base Editor permissions

## Using JIRA Integration

### Linking Documentation to JIRA Issues

#### From Knowledge Base to JIRA:

1. Navigate to any documentation page
2. Click the "Link to JIRA" button in the top toolbar
3. Search for a JIRA issue by key or description
4. Select the appropriate issue
5. The documentation link will appear in the JIRA issue's "Documentation" section

#### From JIRA to Knowledge Base:

1. Open any JIRA issue
2. Click the "Documentation" tab in the issue view
3. Select "Link Existing Documentation" or "Create New Documentation"
4. For new documentation, a template will be pre-populated with issue details
5. For existing documentation, search and select the relevant pages

### Automatic Documentation Updates

The integration keeps JIRA and documentation in sync:

1. When a linked documentation page is updated, a comment is automatically added to the JIRA issue
2. When a JIRA issue status changes, optional documentation status flags can be updated
3. Documentation requirements in acceptance criteria can be automatically checked

## Branch-Based Documentation

### Creating Documentation for Feature Branches

1. **From JIRA**:
   - Within a JIRA issue, navigate to the Documentation tab
   - Click "Create Branch Documentation"
   - Select the git branch associated with this feature
   - A documentation branch will be created with the same name

2. **Manual Process**:
   - Create a git branch for your documentation that matches your feature branch
   - Example: For code branch `feature/new-login`, create docs branch `docs/feature/new-login`
   - Update documentation within this branch to reflect the new feature

### Previewing Branch Documentation

1. In the Knowledge Base, click the "Versions" dropdown
2. Select "Branch Previews"
3. Choose the branch you want to preview
4. The documentation will switch to show content from that branch

### Merging Branch Documentation

When the feature is ready to be released:

1. Create a documentation pull request
2. Link the documentation PR to the feature PR in JIRA
3. Reviewers can preview the branch content to approve
4. Once approved, the documentation changes merge when the feature does

!!! internal "Implementation Notes"
    Branch-based documentation uses Git under the hood, with a webhook system that 
    syncs changes between the code repository and the documentation repository. This 
    ensures that documentation branches are automatically created when feature branches 
    are created.
    
    The automatic JIRA commenting is implemented via the JIRA REST API and uses a 
    webhook listener that monitors documentation repository changes.

## JIRA Issue Templates

### Documentation-Specific Templates

The integration adds documentation-specific issue templates to JIRA:

1. **Documentation Update Request**
   - For requesting updates to existing documentation
   - Includes fields for specific changes needed

2. **New Documentation Request**
   - For requesting completely new documentation
   - Includes fields for audience, content type, and priority

3. **Documentation Bug Report**
   - For reporting errors in existing documentation
   - Includes fields for error type, location, and impact

### Custom Fields

The integration adds the following custom fields to JIRA issues:

- **Documentation Status** - Tracks the documentation component of a feature
- **Documentation Assignee** - Person responsible for documentation
- **Documentation Due Date** - When documentation should be completed
- **Documentation Reviewers** - Who should review the documentation

## Workflow Automation

### JIRA Workflow Integration

The integration supports these JIRA workflow automations:

1. **Status-Based Triggers**:
   - When issue moves to "Ready for QA", documentation is flagged for review
   - When issue is "Done", documentation is published
   - When issue is "Reopened", documentation is flagged for update

2. **Documentation Requirements**:
   - Prevent tickets from moving to certain statuses if documentation is incomplete
   - Auto-assign documentation tasks based on issue type
   - Send reminders for pending documentation

### JIRA Board Integration

Visualize documentation status on your JIRA boards:

1. **Custom Columns**:
   - Add "Docs Needed" or "Docs Ready" columns to your board
   - Filter by documentation status

2. **Card Badges**:
   - Documentation status badges appear on cards
   - Click badges to quickly access documentation

## Reporting and Analytics

### Documentation Coverage Reports

Use JIRA's reporting tools to analyze documentation coverage:

1. **Feature Coverage**:
   - See which features have complete documentation
   - Identify documentation gaps in product areas

2. **Sprint Documentation**:
   - Track documentation completion per sprint
   - Compare documentation velocity across teams

3. **Release Readiness**:
   - Generate documentation readiness reports for releases
   - Ensure critical features are properly documented

## Using the Integration for Common Workflows

### Example: Documentation for New Feature

1. **Planning Phase**:
   - JIRA issue created for new feature
   - Documentation requirements added to acceptance criteria
   - Documentation tasks automatically created as sub-tasks

2. **Development Phase**:
   - Developer creates feature branch
   - Documentation branch automatically created
   - Technical writer updates documentation in branch
   - Developer reviews documentation for technical accuracy

3. **Review Phase**:
   - Documentation branch is previewed by stakeholders
   - Feedback captured as comments on the documentation
   - Updates made based on feedback

4. **Release Phase**:
   - Feature and documentation branches merged
   - Release notes generated automatically from documentation changes
   - Documentation published with new feature

### Example: Documentation Bug Fix

1. User reports incorrect information via JIRA
2. Issue is assigned to documentation team
3. Fix is made in documentation
4. JIRA issue is automatically updated with fix details
5. User is notified that the issue is resolved

## Troubleshooting

### Common Issues

**Issue**: JIRA integration disconnected
**Solution**: Check API credentials in Admin Settings > Integrations > JIRA

**Issue**: Documentation branch not created
**Solution**: Verify naming convention follows `docs/feature/branch-name` pattern

**Issue**: Documentation updates not appearing in JIRA
**Solution**: Check webhook configuration in JIRA settings

## Best Practices

1. **Always Link Documentation**:
   - Make it a standard practice to link documentation to JIRA issues
   - Include documentation updates in definition of done

2. **Use Branch Documentation**:
   - Create branch-specific documentation for significant features
   - Preview documentation changes before merging

3. **Include Documentation in Reviews**:
   - Add technical writers to pull request reviews
   - Have developers review documentation for technical accuracy

4. **Automate Where Possible**:
   - Set up JIRA automation rules for documentation tasks
   - Use templates for common documentation needs