/**
 * Internal Content Handler
 * 
 * This script handles hiding internal-only content in external builds.
 * It uses the window.DOCS_ENV configuration to determine if the current build is internal or external.
 */

// Add a defensive check for utility functions
if (typeof safeQuerySelectorAll !== 'function') {
  // Define fallback functions if utils.js is not loaded
  function safeQuerySelectorAll(selector, parent = document) {
    try {
      if (!parent) return [];
      const elements = parent.querySelectorAll(selector);
      return elements ? Array.from(elements) : [];
    } catch (err) {
      console.warn(`Error finding elements "${selector}":`, err.message);
      return [];
    }
  }
}

/**
 * Internal Content Handler
 *
 * Wait for document ready and Material for MkDocs to finish loading
 * This ensures all DOM elements are available for manipulation
 */
function initInternalContentHandler() {
  try {
    // Use requestAnimationFrame for better performance
    // This runs after the page layout is complete but before painting
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        requestAnimationFrame(processInternalContent);
      });
    } else {
      // Document already loaded
      requestAnimationFrame(processInternalContent);
    }
  } catch (err) {
    console.warn('Error setting up internal content handler:', err.message);
  }
}

/**
 * Process internal content elements based on build type
 */
function processInternalContent() {
  try {
    // Check if we're in an external build
    var isExternalBuild = !window.DOCS_ENV || !window.DOCS_ENV.isInternal;
    
    if (isExternalBuild) {
      // Hide all internal admonitions
      hideElements('.admonition.internal, details.internal');
      
      // Hide all elements with internal-only class
      hideElements('.internal-only');
      
      // Remove internal-only tabs
      hideElements('.tabbed-set label.tabbed-internal');
      
      console.log('External build: Internal content hidden');
    } else {
      console.log('Internal build: Internal content shown');
    }
  } catch (error) {
    console.warn('Error processing internal content:', error);
  }
}

/**
 * Helper function to safely hide elements
 */
function hideElements(selector) {
  try {
    const elements = typeof safeQuerySelectorAll === 'function' 
      ? safeQuerySelectorAll(selector) 
      : document.querySelectorAll(selector);
    
    if (elements && elements.length > 0) {
      for (var i = 0; i < elements.length; i++) {
        if (elements[i] && elements[i].parentNode) {
          // Remove the element entirely rather than just hiding it
          elements[i].parentNode.removeChild(elements[i]);
        }
      }
    }
  } catch (e) {
    console.warn('Error removing elements with selector ' + selector + ':', e);
  }
}

// Initialize the handler with error handling
try {
  initInternalContentHandler();
} catch (err) {
  console.warn('Failed to initialize internal content handler:', err.message);
}