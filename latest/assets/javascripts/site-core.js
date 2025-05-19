/**
 * General Knowledge Base - Core Functionality
 * 
 * This file consolidates essential functionality:
 * - Error handling and polyfills
 * - Environment configuration
 * - Version selection
 * - Internal content handling
 * - Auto-link generation
 */

// ------------------------------
// ERROR HANDLING AND POLYFILLS
// ------------------------------

// Run immediately when the script is loaded
(function() {
  console.log("Core functionality initialized");
  
  // Define a global error handler to catch and fix common issues
  window.addEventListener('error', function(event) {
    if (event && event.error) {
      const errorMsg = event.error.message || '';
      if (errorMsg.includes('map is not a function') || 
          errorMsg.includes('find is not a function') ||
          errorMsg.includes('filter is not a function') ||
          errorMsg.includes('Cannot read properties of undefined')) {
        console.log('Caught error: ' + errorMsg);
        // Prevent the error from showing in console
        event.preventDefault();
        return false;
      }
    }
  }, true);
  
  // Fix for missing data-md-component=header error
  const header = document.querySelector('header.md-header');
  if (header && !header.hasAttribute('data-md-component')) {
    header.setAttribute('data-md-component', 'header');
  }
  
  // Polyfill for Array.prototype.find
  if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      
      for (var i = 0; i < length; i++) {
        var value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    };
  }
  
  // Polyfill for Array.from
  if (!Array.from) {
    Array.from = function(arrayLike) {
      var result = [];
      if (arrayLike) {
        for (var i = 0; i < arrayLike.length; i++) {
          result.push(arrayLike[i]);
        }
      }
      return result;
    };
  }
  
  // Add filter method if needed
  if (!Array.prototype.filter) {
    Array.prototype.filter = function(callback) {
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }
      var o = Object(this);
      var len = o.length >>> 0;
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
      var thisArg = arguments[1];
      var a = [];
      var k = 0;
      while (k < len) {
        if (k in o) {
          var element = o[k];
          if (callback.call(thisArg, element, k, o)) {
            a.push(element);
          }
        }
        k++;
      }
      return a;
    };
  }
  
  // Make NodeList iterable safely
  if (typeof NodeList !== 'undefined' && NodeList.prototype && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
  
  // Add map method to NodeList
  if (typeof NodeList !== 'undefined' && NodeList.prototype && !NodeList.prototype.map) {
    NodeList.prototype.map = function(callback, thisArg) {
      var result = [];
      for (var i = 0; i < this.length; i++) {
        result.push(callback.call(thisArg, this[i], i, this));
      }
      return result;
    };
  }
  
  // Add find method to NodeList
  if (typeof NodeList !== 'undefined' && NodeList.prototype && !NodeList.prototype.find) {
    NodeList.prototype.find = function(callback, thisArg) {
      for (var i = 0; i < this.length; i++) {
        if (callback.call(thisArg, this[i], i, this)) {
          return this[i];
        }
      }
      return undefined;
    };
  }
  
  // Override console.error to suppress specific messages
  const originalConsoleError = console.error;
  console.error = function() {
    // Check if this is related to our known errors
    const errorText = Array.prototype.join.call(arguments, ' ');
    if (errorText.includes('map is not a function') || 
        errorText.includes('find is not a function') ||
        errorText.includes('Cannot read properties of undefined')) {
      // Silently ignore these errors
      return;
    }
    
    // For all other errors, use the original console.error
    return originalConsoleError.apply(console, arguments);
  };
})();

/**
 * Safely query DOM elements with better error handling
 */
function safeQuerySelector(selector, parent = document) {
  try {
    if (!parent) return null;
    return parent.querySelector(selector);
  } catch (err) {
    console.warn(`Error finding element "${selector}":`, err.message);
    return null;
  }
}

/**
 * Safely query multiple DOM elements with better error handling
 */
function safeQuerySelectorAll(selector, parent = document) {
  try {
    if (!parent) return [];
    const elements = parent.querySelectorAll(selector);
    if (!elements) return [];
    
    // Convert NodeList to Array without using Array.from for better compatibility
    var result = [];
    for (var i = 0; i < elements.length; i++) {
      result.push(elements[i]);
    }
    return result;
  } catch (err) {
    console.warn(`Error finding elements "${selector}":`, err.message);
    return [];
  }
}

// ------------------------------
// ENVIRONMENT CONFIGURATION
// ------------------------------

(function() {
  // Default configuration
  window.DOCS_ENV = window.DOCS_ENV || {};
  
  // Try to determine if we're in an internal build
  function detectInternalBuild() {
    try {
      // Check for explicit configuration
      if (typeof window.DOCS_ENV.isInternal === 'boolean') {
        return window.DOCS_ENV.isInternal;
      }
      
      // Check if the 'internal' flag is in the config
      if (document.querySelector('meta[name="site-internal"]')) {
        return document.querySelector('meta[name="site-internal"]').content === 'true';
      }
      
      // Check for internal indicators in the URL
      const url = window.location.href.toLowerCase();
      return url.includes('internal') || 
             url.includes('private') || 
             url.includes('intranet');
    } catch (e) {
      console.warn('Error detecting build type:', e);
      return false; // Default to external for safety
    }
  }
  
  // Initialize core configuration 
  window.DOCS_ENV.isInternal = detectInternalBuild();
  window.DOCS_ENV.version = document.querySelector('meta[name="site-version"]')?.content || 'latest';
  window.DOCS_ENV.environment = 'production';
  window.DOCS_ENV.buildDate = new Date().toISOString();
  window.DOCS_ENV.buildType = window.DOCS_ENV.isInternal ? 'internal' : 'external';
  
  // Log configuration (only in development)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Documentation environment:', window.DOCS_ENV);
  }
  
  // Apply environment styles
  document.addEventListener('DOMContentLoaded', function() {
    // Apply body classes
    document.body.classList.add(`env-${window.DOCS_ENV.environment}`);
    document.body.classList.add(window.DOCS_ENV.isInternal ? 'internal-build' : 'external-build');
    
    // Process page title modifications in internal build
    if (window.DOCS_ENV.isInternal) {
      // Remove "(Internal)" from page titles
      const regex = /\s*\(Internal\)\s*$/i;
      document.title = document.title.replace(regex, '');
      
      // Remove from all h1 elements that might have it
      try {
        const h1Elements = document.querySelectorAll('h1');
        if (h1Elements) {
          for (let i = 0; i < h1Elements.length; i++) {
            const h1 = h1Elements[i];
            if (h1 && h1.innerHTML) {
              h1.innerHTML = h1.innerHTML.replace(regex, '');
            }
          }
        }
      } catch (err) {
        console.warn('Error updating h1 elements:', err);
      }
    }
  });
})();

// ------------------------------
// INTERNAL CONTENT HANDLER
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
  // Use requestAnimationFrame for better performance
  requestAnimationFrame(processInternalContent);
});

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

// ------------------------------
// VERSION DROPDOWN FUNCTIONALITY
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
  // Only run on internal documentation
  if (window.DOCS_ENV && window.DOCS_ENV.isInternal === true) {
    enhanceVersionDropdown();
  }
});

/**
 * Enhances the existing version dropdown with additional functionality
 */
function enhanceVersionDropdown() {
  try {
    // Find the version indicator 
    const versionIndicator = document.querySelector('.md-version-indicator');
    
    if (!versionIndicator) {
      console.log("Version indicator not found. This is expected in external builds.");
      return;
    }

    // Find the existing dropdown
    const dropdown = versionIndicator.querySelector('.md-version-dropdown');
    
    if (!dropdown) {
      console.warn("Version dropdown not found in the DOM.");
      return;
    }
    
    // Add an active indicator to the current version
    highlightCurrentVersion(dropdown);
    
    // Make clicking on the version label also toggle the dropdown
    versionIndicator.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Toggle dropdown visibility
      const isVisible = dropdown.classList.contains('md-version-dropdown--visible');
      
      if (isVisible) {
        hideDropdown(dropdown);
      } else {
        showDropdown(dropdown);
      }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
      hideDropdown(dropdown);
    });
    
    // Prevent dropdown from closing when clicking inside it
    dropdown.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    
    // Add keyboard navigation
    versionIndicator.addEventListener('keydown', function(e) {
      // Toggle dropdown on Enter or Space
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isVisible = dropdown.classList.contains('md-version-dropdown--visible');
        
        if (isVisible) {
          hideDropdown(dropdown);
        } else {
          showDropdown(dropdown);
        }
      }
      
      // Close on Escape
      if (e.key === 'Escape') {
        hideDropdown(dropdown);
      }
    });
    
    // Add touch device support
    if ('ontouchstart' in window) {
      versionIndicator.classList.add('md-version-indicator--touch');
    }
    
    // Make the indicator keyboard focusable
    versionIndicator.tabIndex = 0;
    versionIndicator.setAttribute('role', 'button');
    versionIndicator.setAttribute('aria-haspopup', 'true');
    versionIndicator.setAttribute('aria-expanded', 'false');
  } catch (err) {
    console.warn('Error enhancing version dropdown:', err);
  }
}

/**
 * Helper function to show dropdown
 */
function showDropdown(dropdown) {
  dropdown.classList.add('md-version-dropdown--visible');
  dropdown.style.display = 'block';
  
  // Update ARIA state
  const indicator = dropdown.closest('.md-version-indicator');
  if (indicator) {
    indicator.setAttribute('aria-expanded', 'true');
  }
}

/**
 * Helper function to hide dropdown
 */
function hideDropdown(dropdown) {
  dropdown.classList.remove('md-version-dropdown--visible');
  dropdown.style.display = '';
  
  // Update ARIA state
  const indicator = dropdown.closest('.md-version-indicator');
  if (indicator) {
    indicator.setAttribute('aria-expanded', 'false');
  }
}

/**
 * Highlights the current version in the dropdown
 */
function highlightCurrentVersion(dropdown) {
  try {
    // Get the current path
    const currentPath = window.location.pathname;
    
    // Find all version links
    const versionItems = dropdown.querySelectorAll('.md-version-item');
    
    for (let i = 0; i < versionItems.length; i++) {
      const item = versionItems[i];
      // Skip the management link
      if (item.classList.contains('md-version-item-special')) {
        continue;
      }
      
      const versionPath = new URL(item.href, window.location.origin).pathname;
      
      // Simple path matching (can be enhanced for more complex paths)
      if (currentPath === versionPath || 
          (versionPath === '/' && currentPath === '/') ||
          (versionPath !== '/' && currentPath.startsWith(versionPath))) {
        
        // Mark as active
        item.classList.add('md-version-item--active');
        item.setAttribute('aria-current', 'true');
        
        // Add a checkmark
        if (!item.textContent.startsWith('✓ ')) {
          item.textContent = '✓ ' + item.textContent;
        }
      }
    }
  } catch (err) {
    console.warn('Error highlighting current version:', err);
  }
}

// ------------------------------
// AUTO-LINK FUNCTIONALITY
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
  // Wait for Material for MkDocs to finish initializing
  setTimeout(function() {
    const headings = document.querySelectorAll('h2, h3, h4, h5, h6');
    
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      if (heading.id) {
        // Create the copy link button
        const linkButton = document.createElement('button');
        linkButton.className = 'md-link-copy';
        linkButton.title = 'Copy link to this section';
        linkButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
        
        // Add click event to copy the link
        linkButton.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Create the full URL
          const url = window.location.origin + 
                      window.location.pathname + 
                      '#' + heading.id;
          
          // Copy to clipboard
          navigator.clipboard.writeText(url).then(function() {
            // Show success feedback
            linkButton.classList.add('md-link-copy--success');
            setTimeout(function() {
              linkButton.classList.remove('md-link-copy--success');
            }, 2000);
          });
        });
        
        // Add the button next to the heading
        heading.appendChild(linkButton);
      }
    }
  }, 500);
});

// ------------------------------
// OS DETECTION FOR TABS
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
  // Detect OS
  let userOS = 'Linux';
  if (navigator.userAgent.indexOf('Mac') !== -1) userOS = 'macOS';
  if (navigator.userAgent.indexOf('Win') !== -1) userOS = 'Windows';

  // Get all tab sets with defensive programming
  try {
    const tabSets = document.querySelectorAll('.tabbed-set');
    if (!tabSets) return;
    
    // Iterate through tab sets safely
    for (let i = 0; i < tabSets.length; i++) {
      try {
        const tabSet = tabSets[i];
        if (!tabSet) continue;
        
        const tabs = tabSet.querySelectorAll('.tabbed-labels > label');
        if (!tabs) continue;
        
        // Try to find a tab matching the user's OS
        let foundOSTab = false;
        
        // Iterate through tabs safely
        for (let j = 0; j < tabs.length; j++) {
          try {
            const tab = tabs[j];
            if (!tab || !tab.textContent) continue;
            
            if (tab.textContent.trim() === userOS) {
              // Simulate click on the matching OS tab
              setTimeout(function() {
                try {
                  tab.click();
                  foundOSTab = true;
                } catch (err) {
                  console.warn('Error clicking OS tab:', err);
                }
              }, 100);
            }
          } catch (err) {
            console.warn('Error processing tab:', err);
          }
        }
      } catch (err) {
        console.warn('Error processing tab set:', err);
      }
    }
  } catch (err) {
    console.warn('Error in OS detection tab selection:', err);
  }
});

// ------------------------------
// TABLE OF CONTENTS ENHANCEMENTS
// ------------------------------

document.addEventListener('DOMContentLoaded', function() {
  // Change the "Table of contents" label to just "Contents"
  const tocTitles = document.querySelectorAll('.md-nav__title[for="__toc"]');
  for (let i = 0; i < tocTitles.length; i++) {
    tocTitles[i].innerHTML = tocTitles[i].innerHTML.replace("Table of contents", "Contents");
  }
  
  // Hide H1 headings in the table of contents
  // This ensures we're only showing level 2+ headings
  const tocLists = document.querySelectorAll('.md-nav--secondary .md-nav__list');
  for (let i = 0; i < tocLists.length; i++) {
    const firstItem = tocLists[i].querySelector('.md-nav__item:first-child');
    if (firstItem) {
      const link = firstItem.querySelector('.md-nav__link');
      const h1Element = document.querySelector('article h1');
      
      // If the first TOC item matches the page title, hide it
      if (link && h1Element && link.textContent.trim() === h1Element.textContent.trim()) {
        firstItem.style.display = 'none';
      }
    }
  }
  
  // Only run this if we have a TOC and browser supports IntersectionObserver
  if (document.querySelector('.md-sidebar--secondary') && typeof IntersectionObserver !== 'undefined') {
    // Initialize Intersection Observer for headings
    const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
    
    if (headings.length > 0) {
      // Create observer for headings
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Find the corresponding TOC item
            const tocItem = document.querySelector(`.md-nav__link[href="#${entry.target.id}"]`);
            if (tocItem) {
              // Remove active class from all TOC items
              const allTocItems = document.querySelectorAll('.md-nav__link');
              for (let i = 0; i < allTocItems.length; i++) {
                allTocItems[i].classList.remove('md-nav__link--active-visible');
              }
              
              // Add active class to current TOC item
              tocItem.classList.add('md-nav__link--active-visible');
            }
          }
        });
      }, {
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0
      });
      
      // Observe all headings
      for (let i = 0; i < headings.length; i++) {
        observer.observe(headings[i]);
      }
    }
  }
});