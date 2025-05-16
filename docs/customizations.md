# Knowledge Base Customizations

This page demonstrates various customizations and features available in the Knowledge Base.

## Standard Admonitions

MkDocs Material supports several types of admonitions by default:

!!! note "Note Admonition"
    This is a standard note admonition from Material for MkDocs.

!!! tip "Tip Admonition"
    This is a standard tip admonition.

!!! warning "Warning Admonition"
    This is a standard warning admonition.

## Custom Internal-Only Admonition

We've added a custom admonition type for internal-only content:

!!! internal "Internal-Only Content"
    This content only appears in the internal build of the documentation.
    It will be automatically hidden in the external build.

### Collapsible Internal Admonition

You can also create collapsible versions:

??? internal "Click to reveal internal details"
    This is a collapsible internal-only section.
    
    It contains implementation details or other information that should only be 
    visible to internal users.

## HTML-Based Internal Content

You can also use HTML with a special CSS class for internal-only content:

<div class="internal-only">
  <p>This is internal-only content using HTML.</p>
  <ul>
    <li>It can include any HTML elements</li>
    <li>And will only be visible in the internal build</li>
  </ul>
</div>

## Other Features

The Knowledge Base includes several other customizations:

1. Version selection for internal builds
2. Custom navigation structure
3. Branding customizations
4. Dark mode support