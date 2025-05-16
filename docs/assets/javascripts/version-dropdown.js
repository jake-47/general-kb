/**
 * Version Dropdown Toggle Script for SiteTracker Knowledge Base
 * 
 * This script adds a dropdown menu for version selection in the internal Knowledge Base.
 * It creates and manages a dropdown menu when the version indicator is clicked.
 */

// Initialize when the document is ready
document.addEventListener('DOMContentLoaded', function() {
  // Only run on internal documentation
  if (window.DOCS_ENV && window.DOCS_ENV.isInternal === true) {
    console.log("Setting up version dropdown for internal documentation");
    setupVersionDropdown();
  }
});

/**
 * Sets up the version dropdown menu
 */
function setupVersionDropdown() {
  try {
    // Find the version indicator 
    const versionIndicator = document.querySelector('.md-version-indicator');
    
    if (!versionIndicator) {
      console.log("Version indicator not found. This is expected in external builds.");
      return;
    }
  
    // Create dropdown element
    const dropdown = document.createElement('div');
    dropdown.className = 'md-version-dropdown';
    dropdown.style.cssText = `
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
    `;
  
    // Add versions
    const versions = [
      { url: '/', title: 'Latest Release (v3.5)' },
      { url: '/v3.4/', title: 'Stable Release (v3.4)' },
      { url: '/v3.4/', title: 'December 2023 Release (v3.4)' },
      { url: '/v3.3/', title: 'August 2023 Release (v3.3)' },
      { url: '/v3.2/', title: 'March 2023 Release (v3.2)' }
    ];
    
    // Add version items to dropdown
    for (let i = 0; i < versions.length; i++) {
      try {
        const version = versions[i];
        if (!version) continue;
        
        const item = document.createElement('a');
        item.href = version.url || '#';
        item.textContent = version.title || 'Unknown Version';
        item.className = 'md-version-item';
        item.style.cssText = `
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
        `;
        
        // Add hover effects
        item.addEventListener('mouseover', function() {
          this.style.backgroundColor = 'var(--md-default-bg-color--lightest)';
          this.style.color = 'var(--md-accent-fg-color)';
        });
        
        item.addEventListener('mouseout', function() {
          this.style.backgroundColor = 'transparent';
          this.style.color = 'var(--md-default-fg-color)';
        });
        
        dropdown.appendChild(item);
      } catch (err) {
        console.warn('Error creating version item:', err);
      }
    }
  
    // Add management link
    try {
      const managementLink = document.createElement('a');
      managementLink.href = '/internal/version-management/';
      managementLink.textContent = '✓ Version Management';
      managementLink.className = 'md-version-item md-version-item-special';
      managementLink.style.cssText = `
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
        border-top: 1px solid rgba(0,0,0,0.1);
        margin-top: 0.5rem;
        padding-top: 0.5rem;
      `;
      
      // Add hover effects
      managementLink.addEventListener('mouseover', function() {
        this.style.backgroundColor = 'var(--md-default-bg-color--lightest)';
        this.style.color = 'var(--md-accent-fg-color)';
      });
      
      managementLink.addEventListener('mouseout', function() {
        this.style.backgroundColor = 'transparent';
        this.style.color = 'var(--md-default-fg-color)';
      });
      
      dropdown.appendChild(managementLink);
    } catch (err) {
      console.warn('Error adding management link:', err);
    }
    
    // Add dropdown to the DOM
    versionIndicator.style.position = 'relative';
    versionIndicator.appendChild(dropdown);
    
    // Toggle dropdown on click
    versionIndicator.addEventListener('click', function(e) {
      try {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
      } catch (err) {
        console.warn('Error toggling dropdown:', err);
      }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
      try {
        dropdown.style.display = 'none';
      } catch (err) {
        console.warn('Error closing dropdown:', err);
      }
    });
    
  } catch (err) {
    console.warn('Error setting up version dropdown:', err);
  }
}