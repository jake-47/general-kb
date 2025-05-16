# Markdown Style Guide

This style guide outlines the standards for writing Markdown documentation in the Sitetracker Knowledge Base.

## General Principles

1. **Clarity**: Write clear, concise, and easily understandable documentation.
2. **Consistency**: Follow consistent formatting throughout all documents.
3. **Correctness**: Ensure content is accurate and up-to-date.
4. **Completeness**: Cover topics thoroughly but avoid unnecessary verbosity.

## Markdown Formatting Rules

### Document Structure

- Each document should have a single top-level heading (`# Heading`) that matches the page title.
- Use proper heading hierarchy (don't skip levels, e.g., don't go from `##` to `####`).
- Add a newline before and after headings for readability.

### Line Length

- Keep lines to a maximum of 120 characters.
- Long URLs can be an exception to this rule.

### Lists

- Use ordered lists (`1.`, `2.`, etc.) for sequential items or steps.
- Use unordered lists (`-` or `*`) for non-sequential items.
- Be consistent with your list marker choice (either `-` or `*`, but not both).

```markdown
1. First item
2. Second item
3. Third item

- Unordered item 1
- Unordered item 2
- Unordered item 3
```

### Code Blocks

- Always use fenced code blocks with language specification for syntax highlighting.

```markdown
​```python
def hello_world():
    print("Hello, world!")
​```
```

- Use inline code for short code references, commands, or variables: `variable_name`.

### Links

- Use descriptive link text: [Link to the dashboard](#) instead of [click here](#).
- Don't use bare URLs. Format them properly: `[https://example.com](https://example.com)`.
- For internal links, use relative paths: `[Installation Guide](../getting-started/installation.md)`.

### Images

- Include alt text for all images: `![Alt text for the image](path/to/image.png)`.
- Keep images in the `docs/assets/images/` directory.
- Use descriptive filenames for images (e.g., `user-dashboard-overview.png`).

### Emphasis

- Use **bold** for strong emphasis or UI elements: `**bold**`.
- Use *italics* for general emphasis or introducing a new term: `*italics*`.
- Avoid using ALL CAPS or underlining for emphasis.

### Tables

- Include a header row for all tables.
- Align the pipes for better readability.

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Cell 2   | Cell 3   |
| Row 2    | Cell 5   | Cell 6   |
```

### Quotes

- Use blockquotes for quoted content or to highlight important notes.

```markdown
> This is a blockquote.
> It can span multiple lines.
```

### Horizontal Rules

- Use horizontal rules (`---`) to separate major sections of a document.

### File Endings

- All files should end with a single newline character.

## Accessibility Considerations

- Provide alt text for all images.
- Ensure color is not the only means of conveying information.
- Use descriptive link text instead of "click here" or bare URLs.

## Content Guidelines

### Tone and Voice

- Use a professional, friendly tone.
- Write in the active voice when possible.
- Address the reader directly using "you" rather than "the user."

### Terminology

- Be consistent with terminology throughout documentation.
- Define technical terms or jargon when first introduced.
- Follow Sitetracker's official naming conventions for products and features.

### Versioning Notes

- Clearly mark features that are version-specific: "Available in version 2.5 and later."
- Use admonitions for version-specific information:

```markdown
!!! note "Version 3.0+"
    This feature is only available in version 3.0 and later.
```

## Linting and Validation

We use markdownlint to enforce consistent style. Run the linting tool before submitting documentation changes:

```bash
# Check for issues
./lint.sh

# Or using npm scripts
npm run lint

# Automatically fix issues
npm run lint:fix
```

The configuration for markdownlint is in the `.markdownlint.json` file at the root of the repository.