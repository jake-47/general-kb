/**
 * Version Selector for Internal Documentation
 * 
 * This script adds a version selector to the internal documentation site
 * to demonstrate how version selection would work in a production environment.
 */

// Execute when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Only run on internal documentation
  if (!window.DOCS_ENV || !window.DOCS_ENV.isInternal) {
    console.log('Not internal documentation - skipping version selector');
    return;
  }
  
  addVersionSelector();
});

// Add version selector to the header
function addVersionSelector() {
  // Fetch versions data from the server
  fetch('/versions.json')
    .then(response => {
      if (!response.ok) {
        // Fall back to hard-coded versions if the file isn't found
        console.warn('Could not load versions.json, using default versions');
        return {
          versions: [
            { version: 'latest', title: 'Latest Release', aliases: ['latest'], default: true },
            { version: 'stable', title: 'Stable Release', aliases: ['stable'] },
            { version: '2023.3', title: 'December 2023 Release', aliases: [] },
            { version: '2023.2', title: 'August 2023 Release', aliases: [] },
            { version: '2023.1', title: 'March 2023 Release', aliases: [] }
          ]
        };
      }
      return response.json();
    })
    .then(data => {
      const versions = data.versions || [];
      createVersionSelector(versions);
    })
    .catch(error => {
      console.error('Error loading versions:', error);
      // Fall back to hard-coded versions
      const versions = [
        { version: 'latest', title: 'Latest Release', aliases: ['latest'], default: true },
        { version: 'stable', title: 'Stable Release', aliases: ['stable'] },
        { version: '2023.3', title: 'December 2023 Release', aliases: [] },
        { version: '2023.2', title: 'August 2023 Release', aliases: [] },
        { version: '2023.1', title: 'March 2023 Release', aliases: [] }
      ];
      createVersionSelector(versions);
    });
}

// Create the version selector with the provided versions
function createVersionSelector(versions) {
  if (!versions || versions.length === 0) {
    console.warn('No versions provided for version selector');
    return;
  }
  
  // Create the version selector container
  const versionSelector = document.createElement('div');
  versionSelector.className = 'md-version-selector';
  versionSelector.style.cssText = `
    position: absolute;
    top: 0.4rem;
    right: 5.5rem;
    z-index: 3;
    margin: 0.3rem;
  `;
  
  // Create the selector
  const select = document.createElement('select');
  select.id = 'version-selector';
  select.style.cssText = `
    padding: 0.4rem 1.8rem 0.4rem 0.8rem;
    border-radius: 4px;
    font-size: 0.7rem;
    border: 1px solid #ddd;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #f5f5f5 url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23333' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") no-repeat right 0.5rem center;
    background-size: 0.6em;
    min-width: 10rem;
    color: #333;
  `;
  
  // Add dark mode support
  const darkModeStyles = document.createElement('style');
  darkModeStyles.textContent = `
    [data-md-color-scheme="slate"] #version-selector {
      background-color: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.7);
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23adb5bd' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E");
    }
  `;
  document.head.appendChild(darkModeStyles);
  
  // Find default version (using safe array methods)
  let defaultVersion = versions[0];
  // Safely use find if it's available
  if (Array.isArray(versions) && typeof versions.find === 'function') {
    const foundVersion = versions.find(v => v.default === true);
    if (foundVersion) {
      defaultVersion = foundVersion;
    }
  } else {
    // Fallback if find is not available
    for (let i = 0; i < versions.length; i++) {
      if (versions[i] && versions[i].default === true) {
        defaultVersion = versions[i];
        break;
      }
    }
  }
  
  // Add versions to the dropdown with defensive checks
  if (Array.isArray(versions)) {
    for (let i = 0; i < versions.length; i++) {
      const ver = versions[i];
      if (!ver) continue;
      
      try {
        const option = document.createElement('option');
        option.value = ver.version || '';
        option.textContent = ver.title || 'Unknown version';
        
        if (defaultVersion && ver.version === defaultVersion.version) {
          option.selected = true;
        }
        
        select.appendChild(option);
      } catch (err) {
        console.warn('Error creating version option:', err);
      }
    }
  }
  
  // Handle version selection
  select.addEventListener('change', function() {
    const selectedVersion = this.value;
    alert(`In production, this would navigate to version: ${selectedVersion}`);
  });
  
  // Add to the DOM
  versionSelector.appendChild(select);
  
  // Allow multiple attempts to find the header (in case of late loading)
  const tryAppendToHeader = () => {
    // Find the appropriate place to insert the selector
    const header = document.querySelector('.md-header__inner');
    if (header) {
      header.appendChild(versionSelector);
      console.log('Version selector added successfully');
      return true;
    }
    return false;
  };
  
  // Try immediately
  if (!tryAppendToHeader()) {
    // If not successful, try again after a short delay
    setTimeout(() => {
      if (!tryAppendToHeader()) {
        console.warn('Could not find header to add version selector');
      }
    }, 500);
  }
}