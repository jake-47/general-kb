# Setting Up Algolia DocSearch

This guide explains how to implement Algolia DocSearch for enhanced search capabilities in the Sitetracker Knowledge Base.

## What is Algolia DocSearch?

[Algolia DocSearch](https://docsearch.algolia.com/) is a powerful search service specifically designed for documentation websites. Key benefits include:

- Superior search experience with typo tolerance
- Fast, as-you-type search results
- Relevance-based ranking
- Search analytics
- Mobile-friendly interface

## Prerequisites

1. Sign up for an [Algolia account](https://www.algolia.com/users/sign_up)
2. Apply for the free [DocSearch program](https://docsearch.algolia.com/apply/) or create a paid Algolia plan
3. Obtain your Algolia API credentials:
   - Application ID
   - Search-only API Key
   - Index name

## Implementation Steps

### 1. Add Algolia Configuration to mkdocs.yml

Uncomment and update the Algolia configuration in `mkdocs.yml`:

```yaml
extra:
  search:
    language: en
    provider: algolia
    separator: '[\s\-,:!=\[\]()"/]+|(?!\b)(?=[A-Z][a-z])|\.(?!\d)|&[lg]t;'
  algolia:
    application_id: YOUR_APP_ID
    api_key: YOUR_SEARCH_ONLY_API_KEY
    index_name: YOUR_INDEX_NAME
```

### 2. Set Up Environment Variables

For better security, store your Algolia credentials as environment variables:

1. Create a `.env` file in the project root (add to `.gitignore` to keep it private)
2. Add your Algolia credentials:

```
ALGOLIA_APP_ID=YOUR_APP_ID
ALGOLIA_API_KEY=YOUR_SEARCH_ONLY_API_KEY
ALGOLIA_INDEX_NAME=YOUR_INDEX_NAME
```

3. Update the mkdocs.yml to use environment variables:

```yaml
extra:
  search:
    language: en
    provider: algolia
    separator: '[\s\-,:!=\[\]()"/]+|(?!\b)(?=[A-Z][a-z])|\.(?!\d)|&[lg]t;'
  algolia:
    application_id: !ENV ALGOLIA_APP_ID
    api_key: !ENV ALGOLIA_API_KEY
    index_name: !ENV ALGOLIA_INDEX_NAME
```

### 3. Create Algolia Crawler Configuration

For the Algolia crawler, create a `docsearch-config.json` file:

```json
{
  "index_name": "sitetracker_kb",
  "start_urls": [
    "https://your-docs-website.com/"
  ],
  "stop_urls": [
    "https://your-docs-website.com/internal/"
  ],
  "selectors": {
    "lvl0": {
      "selector": ".md-header-nav__title",
      "global": true,
      "default_value": "Documentation"
    },
    "lvl1": ".md-content h1",
    "lvl2": ".md-content h2",
    "lvl3": ".md-content h3",
    "lvl4": ".md-content h4",
    "lvl5": ".md-content h5",
    "text": ".md-content p, .md-content li, .md-content pre"
  },
  "custom_settings": {
    "separatorsToIndex": "_",
    "attributesForFaceting": ["type", "lang"],
    "attributesToRetrieve": [
      "hierarchy",
      "content",
      "anchor",
      "url",
      "url_without_anchor",
      "type"
    ]
  },
  "conversation_id": [""],
  "nb_hits": 0
}
```

### 4. Test Locally

To test locally with your Algolia credentials:

```bash
export ALGOLIA_APP_ID=YOUR_APP_ID
export ALGOLIA_API_KEY=YOUR_SEARCH_ONLY_API_KEY
export ALGOLIA_INDEX_NAME=YOUR_INDEX_NAME
./build.sh public site development serve
```

### 5. Deploy with GitHub Actions

For CI/CD integration, update your GitHub Actions workflow to include Algolia secrets:

```yaml
name: Deploy Documentation

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: 3.11
      
      - name: Install dependencies
        run: pip install -e .
      
      - name: Build and deploy documentation
        env:
          ALGOLIA_APP_ID: ${{ secrets.ALGOLIA_APP_ID }}
          ALGOLIA_API_KEY: ${{ secrets.ALGOLIA_API_KEY }}
          ALGOLIA_INDEX_NAME: ${{ secrets.ALGOLIA_INDEX_NAME }}
        run: ./build.sh public site production
```

## Troubleshooting

Common issues and solutions:

1. **Search not working**: Ensure your API key has search permissions only
2. **Indexing issues**: Verify your crawler configuration matches your site structure
3. **Missing results**: Check if your site is being properly crawled by Algolia
4. **CORS errors**: Ensure your domain is allowed in the Algolia dashboard

## Resources

- [Algolia DocSearch Documentation](https://docsearch.algolia.com/docs/what-is-docsearch)
- [MkDocs Material Algolia Integration](https://squidfunk.github.io/mkdocs-material/setup/setting-up-site-search/#algolia)
- [Algolia Dashboard](https://dashboard.algolia.com/)