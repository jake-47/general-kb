# One-Click Sharing with Annotations

The Knowledge Base offers a powerful one-click sharing feature that allows you to share specific content with annotations, making collaboration and knowledge sharing easier and more effective.

## Overview

One-click sharing with annotations enables you to:

1. **Share Specific Sections** - Share a direct link to any section of the documentation
2. **Add Contextual Annotations** - Highlight text and add your own notes to provide context
3. **Collaborate Effectively** - Easily communicate specific information with colleagues
4. **Track Discussions** - Maintain a history of annotations for future reference

## How to Share with Annotations

### Creating an Annotated Share

1. **Select Content to Share**:
   - Highlight the text you want to share by clicking and dragging your cursor
   - The highlighter tool will appear automatically

2. **Add Your Annotation**:
   - Click the "Add Note" button that appears
   - Type your annotation in the text field 
   - Click "Save" to attach your note to the highlighted text

3. **Share the Link**:
   - Click the "Share" button that appears in the annotation panel
   - A modal will appear with a unique URL containing your highlighted section and annotation
   - Choose from these sharing options:
     - Copy link to clipboard
     - Send via email
     - Copy as Markdown for JIRA or Confluence

### Viewing Shared Annotations

When someone opens a shared link with annotations:

1. They'll be taken directly to the relevant section of the documentation
2. The shared text will be highlighted
3. Annotations will be visible in a side panel
4. They can reply to annotations to start a discussion thread

## Managing Your Annotations

### Editing and Deleting

To edit or delete an annotation you've created:

1. Find your annotation in the right sidebar or by locating the highlighted text
2. Click the three-dot menu (⋮) on the annotation 
3. Select "Edit" or "Delete" from the dropdown menu

### Viewing Annotation History

To see the history of all annotations on a page:

1. Click the "Annotations" button in the top toolbar
2. Filter by date, author, or status
3. Click any annotation to jump to its location in the document

## Using Annotations for Feedback

Annotations are particularly useful for providing feedback on documentation:

1. **Content Reviews** - Highlight unclear sections and suggest improvements
2. **Bug Reports** - Annotate any incorrect information by highlighting it
3. **Feature Requests** - Suggest new content sections that would be helpful
4. **General Feedback** - Share thoughts on how documentation could be improved

## Team Collaboration with Annotations

### Private vs. Public Annotations

Annotations can be set as:

- **Private** - Only visible to you
- **Team** - Visible to members of your team
- **Public** - Visible to anyone with access to the documentation

### Notification Settings

You can configure notifications for annotation activities:

1. Navigate to your user profile
2. Select "Notification Settings"
3. Choose when to receive notifications:
   - When someone replies to your annotation
   - When someone mentions you in an annotation
   - When a new annotation is added to a page you're watching

## Integration with Other Tools

One-click sharing with annotations integrates with:

- **Email** - Send annotated links directly via email
- **Slack** - Share annotated links in channels or direct messages
- **JIRA** - Attach annotated documentation to JIRA tickets
- **Confluence** - Embed annotated documentation in Confluence pages

!!! internal "Implementation Details"
    The annotation system uses a WebSocket connection to provide real-time updates when multiple 
    users are viewing the same page. This ensures that new annotations appear instantly without 
    requiring page refreshes.
    
    Annotations are stored in a separate database collection to keep the core documentation 
    content clean and manageable. The annotation data structure includes:
    
    ```json
    {
      "id": "ann-123456",
      "documentId": "doc-78910",
      "sectionId": "configuration-options",
      "createdBy": "user@sitetracker.com",
      "createdAt": "2025-01-15T14:35:22Z",
      "updatedAt": "2025-01-15T14:38:10Z",
      "highlight": {
        "text": "Configure the application through the config.json file",
        "startOffset": 42,
        "endOffset": 89
      },
      "content": "This configuration approach is being replaced in v3.0 with environment variables.",
      "visibility": "team",
      "replies": [...]
    }
    ```

## Best Practices for Annotations

1. **Be Specific** - Highlight only the relevant text, not entire paragraphs
2. **Be Clear** - Write concise, action-oriented annotations
3. **Add Context** - Explain why you're highlighting something, not just what
4. **Link Related Information** - Include URLs to related resources when relevant
5. **Follow Up** - Check back on your annotations for replies or updates

## Troubleshooting

### Common Issues

**Issue**: Highlights not appearing for recipients
**Solution**: Ensure they are logged in and have permission to view the annotations

**Issue**: Can't edit an annotation
**Solution**: You can only edit annotations that you created, unless you have admin privileges

**Issue**: Annotation link not directing to the correct section
**Solution**: The document may have been restructured. Try searching for the text that was highlighted.

## Coming Soon

Future enhancements to annotations will include:

- Drawing tools for annotating images and diagrams
- Voice annotations for accessibility
- Bulk annotation management
- Advanced annotation analytics