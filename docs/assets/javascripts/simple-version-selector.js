/**
 * Simple Version Selector for SiteTracker Documentation
 * This script adds a compact version selector next to the version number
 * for internal documentation only.
 * 
 * NOTE: The version number shown in both builds is the same and comes from JIRA.
 * This dropdown is only for selecting previous versions in the internal build.
 */

// Main initialization function with fallbacks
function initVersionSelector() {
  // Only add the version selector to internal documentation
  if (window.DOCS_ENV && window.DOCS_ENV.isInternal === true) {
    console.log("Adding version selector to internal documentation");
    
    // Wait for a moment to ensure the DOM is fully loaded and Material theme has completed setup
    setTimeout(function() {
      addVersionSelector();
    }, 500);
  } else {
    console.log("Not adding version selector to external documentation");
  }
}

// Try to initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initVersionSelector);

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  console.log("DOM already loaded, initializing version selector");
  initVersionSelector();
}

/**
 * Add a compact version selector next to the version number
 */
function addVersionSelector() {
  // Add required CSS
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .md-version-number {
      display: inline-flex;
      align-items: center;
      white-space: nowrap;
      font-size: 0.7rem;
      margin-right: 1rem;
      cursor: pointer;
      position: relative;
      color: var(--md-default-fg-color--light);
    }
    
    .md-version-number::after {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: 0.3rem;
      vertical-align: middle;
      border-top: 0.3rem solid;
      border-right: 0.3rem solid transparent;
      border-bottom: 0;
      border-left: 0.3rem solid transparent;
      opacity: 0.7;
    }
    
    .md-version-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      display: none;
      min-width: 10rem;
      padding: 0.5rem 0;
      margin: 0.125rem 0 0;
      font-size: 0.8rem;
      color: var(--md-default-fg-color);
      text-align: left;
      list-style: none;
      background-color: var(--md-default-bg-color);
      background-clip: padding-box;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 0.25rem;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
    }
    
    .md-version-dropdown.show {
      display: block;
    }
    
    .md-version-dropdown a {
      display: block;
      padding: 0.25rem 1.5rem;
      clear: both;
      font-weight: 400;
      color: var(--md-default-fg-color);
      text-align: inherit;
      white-space: nowrap;
      background-color: transparent;
      border: 0;
      text-decoration: none;
    }
    
    .md-version-dropdown a:hover, .md-version-dropdown a:focus {
      color: var(--md-accent-fg-color);
      text-decoration: none;
      background-color: var(--md-default-bg-color--lightest);
    }
    
    .md-version-dropdown .active {
      font-weight: bold;
      color: var(--md-accent-fg-color);
    }
  `;
  document.head.appendChild(styleElement);
  
  // Create the version number and dropdown container
  const versionContainer = document.createElement('div');
  versionContainer.className = 'md-version-number';
  // Get version from DOCS_ENV if available, or use default
  const version = (window.DOCS_ENV && window.DOCS_ENV.version) ? window.DOCS_ENV.version : 'v3.5';
  versionContainer.textContent = version;
  
  // Create the dropdown menu
  const dropdown = document.createElement('div');
  dropdown.className = 'md-version-dropdown';
  dropdown.id = 'version-dropdown';
  
  // Add versions
  const versions = [
    { value: 'latest', label: 'Latest Release' },
    { value: 'stable', label: 'Stable Release' },
    { value: '2023.3', label: 'December 2023 Release (v3.4)' },
    { value: '2023.2', label: 'August 2023 Release (v3.3)' },
    { value: '2023.1', label: 'March 2023 Release (v3.2)' }
  ];
  
  // Safe version iteration using standard for loop
  for (let i = 0; i < versions.length; i++) {
    try {
      const version = versions[i];
      if (!version) continue;
      
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = version.label || 'Unknown version';
      link.setAttribute('data-version', version.value || '');
      
      if (version.value === 'latest') {
        link.className = 'active';
      }
      
      link.addEventListener('click', function(e) {
        try {
          e.preventDefault();
          const versionValue = this.getAttribute('data-version');
          
          if (versionValue === 'version-management') {
            // Navigate to the version management documentation
            window.location.href = '/internal/version-management/';
          } else {
            // In production, this would navigate to the selected version
            alert('In production, this would navigate to version: ' + versionValue);
          }
        } catch (err) {
          console.warn('Error handling version click:', err);
        }
      });
      
      dropdown.appendChild(link);
    } catch (err) {
      console.warn('Error creating version link:', err);
    }
  }
  
  // Add special link for version management
  const managementLink = document.createElement('a');
  managementLink.href = '#';
  managementLink.textContent = '✓ Version Management';
  managementLink.setAttribute('data-version', 'version-management');
  managementLink.style.borderTop = '1px solid rgba(0,0,0,0.1)';
  managementLink.style.marginTop = '0.5rem';
  managementLink.style.paddingTop = '0.5rem';
  managementLink.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = '/internal/version-management/';
  });
  dropdown.appendChild(managementLink);
  
  // Add toggle functionality
  versionContainer.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });
  
  // Close dropdown when clicking elsewhere
  document.addEventListener('click', function() {
    dropdown.classList.remove('show');
  });
  
  // Add the dropdown to the container
  versionContainer.appendChild(dropdown);
  
  // Insert into the DOM
  const checkAndInsert = function() {
    // Different approach - insert directly after the site title, which is more reliable
    const siteTitle = document.querySelector('.md-header__title') || 
                      document.querySelector('.md-header-nav__title');
    
    if (siteTitle) {
      // Insert after the site title
      if (siteTitle.parentNode) {
        siteTitle.parentNode.insertBefore(versionContainer, siteTitle.nextSibling);
        console.log('Version selector added after title');
        return true;
      }
    }
    
    // Fallback using more generic selectors
    const header = document.querySelector('.md-header') || 
                   document.querySelector('header');
    
    if (header) {
      // Just append to the header as a last resort
      header.appendChild(versionContainer);
      console.log('Version selector added to header (fallback)');
      return true;
    }
    
    // If we can't find either, try to add it to the body with absolute positioning
    if (document.body) {
      document.body.appendChild(versionContainer);
      // Add some absolute positioning
      versionContainer.style.position = 'absolute';
      versionContainer.style.top = '10px';
      versionContainer.style.right = '120px';
      versionContainer.style.zIndex = '1000';
      console.log('Version selector added to body (emergency fallback)');
      return true;
    }
    
    return false;
  };
  
  // Try immediately
  if (!checkAndInsert()) {
    // If not successful, try again after DOM is fully loaded
    window.addEventListener('load', function() {
      if (!checkAndInsert()) {
        // If still not successful, try with a delay
        setTimeout(checkAndInsert, 500);
      }
    });
  }
}