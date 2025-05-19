/**
 * Version Dropdown Toggle Script for SiteTracker Knowledge Base
 * 
 * This script enhances the existing dropdown menu for version selection in the internal Knowledge Base.
 * It adds click functionality while preserving the hover effect, and loads versions dynamically.
 */

// Initialize when the document is ready
document.addEventListener('DOMContentLoaded', function() {
  // Only run on internal documentation
  if (window.DOCS_ENV && window.DOCS_ENV.isInternal === true) {
    console.log("Setting up version dropdown for internal documentation");
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
    
    console.log("Version dropdown enhanced successfully");
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
    
    versionItems.forEach(function(item) {
      // Skip the management link
      if (item.classList.contains('md-version-item-special')) {
        return;
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
    });
  } catch (err) {
    console.warn('Error highlighting current version:', err);
  }
}