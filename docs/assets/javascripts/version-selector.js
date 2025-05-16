/**
 * Version Selector for Internal Documentation
 * 
 * This script provides a simulated version selector for the Sitetracker internal documentation.
 * Since we're not using a full git-based deployment in this environment, this provides
 * a demonstration of how the version selector would work in production.
 */

// Execute when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initVersionSelector();
});

// Initialize again when window loads to handle late-loading DOM elements
window.addEventListener('load', function() {
  initVersionSelector();
});

function initVersionSelector() {
  // Only initialize once
  if (document.querySelector('.md-version')) {
    return;
  }
  
  // Only run on internal documentation
  if (!window.DOCS_ENV || !window.DOCS_ENV.isInternal) {
    return;
  }
  
  // Try multiple times to ensure DOM is ready
  setTimeout(insertVersionSelector, 100);
  setTimeout(insertVersionSelector, 500);
  setTimeout(insertVersionSelector, 1000);
}

function insertVersionSelector() {
  // Don't add multiple version selectors
  if (document.querySelector('.md-version')) {
    return;
  }
  
  // Sample version data - in production this would come from the server
  const versions = [
    { version: 'latest', title: 'Latest Release', aliases: ['latest'] },
    { version: 'stable', title: 'Stable Release', aliases: ['stable'] },
    { version: '2023.3', title: 'December 2023 Release', aliases: [] },
    { version: '2023.2', title: 'August 2023 Release', aliases: [] },
    { version: '2023.1', title: 'March 2023 Release', aliases: [] }
  ];
  
  // Find the header container
  const headerContainer = document.querySelector('.md-header__inner');
  if (!headerContainer) {
    console.warn('Header container not found');
    return;
  }
  
  // Create the version selector container
  const versionContainer = document.createElement('div');
  versionContainer.className = 'md-version';
  
  // Create the selector button
  const selectorButton = document.createElement('button');
  selectorButton.className = 'md-version__current';
  selectorButton.innerHTML = 'Latest Release <span style="margin-left:0.3rem;">▼</span>';
  
  // Create the dropdown menu
  const dropdownMenu = document.createElement('ul');
  dropdownMenu.className = 'md-version__list';
  dropdownMenu.style.display = 'none';
  
  // Add versions to the dropdown with defensive programming
  if (Array.isArray(versions)) {
    for (let i = 0; i < versions.length; i++) {
      try {
        const ver = versions[i];
        if (!ver) continue;
        
        const versionItem = document.createElement('li');
        versionItem.textContent = ver.title || 'Unknown version';
        
        // Click handler - in a real implementation, this would navigate to the selected version
        versionItem.addEventListener('click', function(e) {
          try {
            e.preventDefault();
            e.stopPropagation();
            
            // Update the button text
            if (selectorButton) {
              selectorButton.innerHTML = (ver.title || 'Unknown version') + ' <span style="margin-left:0.3rem;">▼</span>';
            }
            
            // Hide the dropdown
            if (dropdownMenu) {
              dropdownMenu.style.display = 'none';
            }
            
            // Show an alert in this demo
            // In production, this would navigate to the version
            alert('In production, this would load version: ' + (ver.version || 'unknown'));
          } catch (err) {
            console.warn('Error handling version click:', err);
          }
        });
        
        dropdownMenu.appendChild(versionItem);
      } catch (err) {
        console.warn('Error creating version item:', err);
      }
    }
  }
  
  // Toggle dropdown visibility on button click
  selectorButton.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
  });
  
  // Close dropdown when clicking elsewhere
  document.addEventListener('click', function() {
    dropdownMenu.style.display = 'none';
  });
  
  // Append elements to the DOM
  versionContainer.appendChild(selectorButton);
  versionContainer.appendChild(dropdownMenu);
  
  // Try to find a good insertion point
  const searchBar = document.querySelector('.md-search');
  if (searchBar && searchBar.parentNode) {
    // Insert after the search bar
    searchBar.parentNode.insertBefore(versionContainer, searchBar.nextSibling);
  } else {
    // Fallback: Try to insert at the beginning of the header
    const firstChild = headerContainer.firstChild;
    if (firstChild) {
      headerContainer.insertBefore(versionContainer, firstChild);
    } else {
      headerContainer.appendChild(versionContainer);
    }
  }
  
  console.log('Version selector added successfully');
}