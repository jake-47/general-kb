/**
 * Algolia DocSearch Integration
 * 
 * This script enhances the default MkDocs search with Algolia DocSearch.
 * It's designed to work with the Material theme and provides an improved
 * search experience when Algolia credentials are configured.
 */

document.addEventListener('DOMContentLoaded', function() {
  /**
   * Check if Algolia DocSearch is configured
   * @returns {boolean} True if Algolia is properly configured
   */
  function isAlgoliaConfigured() {
    // Check if the configuration exists in the global scope
    return (
      typeof window.siteConfig !== 'undefined' &&
      window.siteConfig.algolia &&
      window.siteConfig.algolia.applicationId &&
      window.siteConfig.algolia.apiKey &&
      window.siteConfig.algolia.indexName
    );
  }

  /**
   * Initialize Algolia DocSearch
   * This function adds the DocSearch functionality to the search input
   */
  function initAlgoliaSearch() {
    if (!isAlgoliaConfigured()) {
      console.log('Algolia DocSearch is not configured.');
      return;
    }

    // Check if DocSearch script is loaded
    if (typeof docsearch !== 'function') {
      // Load the DocSearch script and stylesheet
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js';
      script.async = true;
      document.head.appendChild(script);

      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = 'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css';
      document.head.appendChild(style);

      script.onload = initDocsearch;
    } else {
      initDocsearch();
    }
  }

  /**
   * Initialize DocSearch with the configuration
   */
  function initDocsearch() {
    const config = window.siteConfig.algolia;
    
    // Initialize DocSearch on the search input
    docsearch({
      apiKey: config.apiKey,
      indexName: config.indexName,
      appId: config.applicationId,
      container: '.md-search__form',
      transformItems: function(items) {
        // Transform search results to match the expected format
        // Safely transform items
        if (!Array.isArray(items)) {
          return [];
        }
        
        let result = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          result.push({
            hierarchy: {
              lvl0: item.hierarchy ? (item.hierarchy.lvl0 || 'Documentation') : 'Documentation',
              lvl1: item.hierarchy ? (item.hierarchy.lvl1 || '') : '',
              lvl2: item.hierarchy ? (item.hierarchy.lvl2 || '') : '',
              lvl3: item.hierarchy ? (item.hierarchy.lvl3 || '') : '',
              lvl4: item.hierarchy ? (item.hierarchy.lvl4 || '') : '',
              lvl5: item.hierarchy ? (item.hierarchy.lvl5 || '') : '',
              lvl6: item.hierarchy ? (item.hierarchy.lvl6 || '') : ''
            },
            content: item.content || '',
            url: item.url || '#'
          });
        }
        return result;
      },
      debug: false // Set to true to enable debug mode
    });

    // Customize the search UI
    customizeSearchUI();
  }

  /**
   * Add custom styling to the search UI
   */
  function customizeSearchUI() {
    // Add Algolia badge to search
    const searchForm = document.querySelector('.md-search__form');
    if (searchForm) {
      const algoliaLogo = document.createElement('div');
      algoliaLogo.className = 'algolia-logo';
      algoliaLogo.innerHTML = 'Powered by <a href="https://www.algolia.com/docsearch" target="_blank" rel="noopener">Algolia</a>';
      algoliaLogo.style.cssText = 'position: absolute; bottom: -20px; right: 10px; font-size: 10px; color: #999;';
      searchForm.parentNode.appendChild(algoliaLogo);
    }
  }

  // Initialize search once the document is fully loaded
  if (isAlgoliaConfigured()) {
    initAlgoliaSearch();
  }
});

/**
 * Global configuration setup for Algolia
 * This will be populated from the MkDocs configuration
 */
window.siteConfig = window.siteConfig || {};
window.siteConfig.algolia = window.siteConfig.algolia || {
  // These will be populated from environment variables in mkdocs.yml
  applicationId: '',
  apiKey: '', // This should be the search-only API key
  indexName: ''
};

// Set up Algolia config from MkDocs when available
if (typeof document$.subscribe === 'function') {
  document$.subscribe(function() {
    // Attempt to read config from the MkDocs configuration
    try {
      const config = document.querySelector('script[data-algolia-config]');
      if (config) {
        const algoliaConfig = JSON.parse(config.getAttribute('data-algolia-config'));
        window.siteConfig.algolia = {
          applicationId: algoliaConfig.application_id,
          apiKey: algoliaConfig.api_key,
          indexName: algoliaConfig.index_name
        };
        
        // Initialize Algolia if configuration is found
        if (isAlgoliaConfigured()) {
          initAlgoliaSearch();
        }
      }
    } catch (e) {
      console.error('Failed to initialize Algolia DocSearch:', e);
    }
  });
}