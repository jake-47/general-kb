// Knowledge Base - Enhanced JavaScript

/**
 * OS Detection and Tab Selection
 * Automatically selects the tab matching the user's operating system
 */
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

/**
 * Enhanced Search Experience
 * Improves search functionality with visual enhancements
 */
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.md-search__input');
  const searchContainer = document.querySelector('.md-search');
  
  if (searchInput && searchContainer) {
    // Flag to track if search is open
    let isSearchOpen = false;
    let searchCloseTimeout;
    
    // Function to close search
    const closeSearch = () => {
      if (!isSearchOpen) return; // Already closed
      
      // Find and click the reset/close button
      const searchToggle = document.querySelector('.md-search__icon[type="reset"]');
      if (searchToggle) {
        searchToggle.click();
      } 
      
      // In case the reset button doesn't work, manually clean up
      document.body.classList.remove('search-focus');
      
      // Hide search results dropdown
      const overlay = document.querySelector('.md-search-result');
      if (overlay && overlay.parentNode) {
        overlay.style.display = 'none';
      }
      
      // Blur the input
      if (searchInput) {
        searchInput.blur();
      }
      
      isSearchOpen = false;
    };
    
    // Handle search opening
    searchInput.addEventListener('focus', function() {
      isSearchOpen = true;
      document.body.classList.add('search-focus');
      clearTimeout(searchCloseTimeout);
    });
    
    // Handle search closing with escape key (Material's default behavior)
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    });
    
    // Handle closing search when clicking outside
    document.addEventListener('click', function(event) {
      // Short delay to ensure we're not catching the same click that opened the search
      setTimeout(() => {
        if (isSearchOpen && !searchContainer.contains(event.target)) {
          // Clicked outside the search container
          closeSearch();
        }
      }, 10);
    });
    
    // Search suggestions
    const enhanceSearch = () => {
      const searchTerm = searchInput.value.toLowerCase();
      if (searchTerm.length > 2) {
        // Add common terms as suggestions
        const suggestions = [
          'api', 'projects', 'configuration', 'mobile', 'fields', 'workflow', 
          'install', 'permissions', 'integration', 'reports'
        ];
        
        const matchingSuggestions = suggestions.filter(
          term => term.includes(searchTerm) && term !== searchTerm
        );
        
        // First 3 matching suggestions
        if (matchingSuggestions.length > 0 && !document.querySelector('.search-suggestions')) {
          const suggestionsContainer = document.createElement('div');
          suggestionsContainer.className = 'search-suggestions';
          suggestionsContainer.innerHTML = `
            <div class="search-suggestions-title">Suggested searches:</div>
            ${(() => {
              let result = '';
              // Safely handle the mapping without using .map()
              const items = matchingSuggestions.slice(0, 3) || [];
              for (let i = 0; i < items.length; i++) {
                result += `<div class="search-suggestion">${items[i]}</div>`;
              }
              return result;
            })()}
          `;
          
          const searchFormWrapper = document.querySelector('.md-search__form');
          if (searchFormWrapper) {
            searchFormWrapper.appendChild(suggestionsContainer);
            
            // Add event listeners to suggestions
            document.querySelectorAll('.search-suggestion').forEach(suggestion => {
              suggestion.addEventListener('click', function() {
                searchInput.value = this.textContent;
                searchInput.dispatchEvent(new Event('input'));
                document.querySelector('.search-suggestions').remove();
              });
            });
          }
        }
      } else {
        // Remove suggestions if search term is too short
        const suggestions = document.querySelector('.search-suggestions');
        if (suggestions) {
          suggestions.remove();
        }
      }
    };
    
    searchInput.addEventListener('input', enhanceSearch);
  }
});

/**
 * Feedback Collection System - Removed as requested
 */

/**
 * Enhanced Code Blocks
 * Improves code blocks with better copy functionality and visual enhancements
 */
document.addEventListener('DOMContentLoaded', function() {
  const preElements = document.querySelectorAll('pre');
  
  preElements.forEach(pre => {
    // Add copy button if it doesn't already have one
    if (!pre.querySelector('.md-clipboard')) {
      const copyButton = document.createElement('button');
      copyButton.className = 'md-clipboard';
      copyButton.title = 'Copy to clipboard';
      copyButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M19 21H8V7h11m0-2H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m-3-4H4c-1.1 0-2 .9-2 2v14h2V3h12V1z"></path>
        </svg>
      `;
      
      copyButton.addEventListener('click', function() {
        const code = pre.querySelector('code').textContent;
        navigator.clipboard.writeText(code).then(() => {
          // Show success indicator
          copyButton.classList.add('md-clipboard--copied');
          copyButton.title = 'Copied!';
          
          // Reset after 3 seconds
          setTimeout(() => {
            copyButton.classList.remove('md-clipboard--copied');
            copyButton.title = 'Copy to clipboard';
          }, 3000);
        });
      });
      
      pre.appendChild(copyButton);
    }
    
    // Add language indicator for code blocks
    const code = pre.querySelector('code');
    if (code && code.className) {
      const match = code.className.match(/language-(\w+)/);
      if (match) {
        const lang = match[1];
        const langBadge = document.createElement('div');
        langBadge.className = 'code-language-badge';
        langBadge.textContent = getLangDisplayName(lang);
        pre.appendChild(langBadge);
      }
    }
  });
  
  // Helper to get nice language display names
  function getLangDisplayName(langCode) {
    const langMap = {
      'js': 'JavaScript',
      'ts': 'TypeScript',
      'py': 'Python',
      'python': 'Python',
      'java': 'Java',
      'csharp': 'C#',
      'cs': 'C#',
      'cpp': 'C++',
      'php': 'PHP',
      'go': 'Go',
      'rb': 'Ruby',
      'ruby': 'Ruby',
      'sh': 'Bash',
      'bash': 'Bash',
      'shell': 'Shell',
      'html': 'HTML',
      'css': 'CSS',
      'scss': 'SCSS',
      'xml': 'XML',
      'json': 'JSON',
      'yaml': 'YAML',
      'yml': 'YAML',
      'markdown': 'Markdown',
      'md': 'Markdown',
      'sql': 'SQL',
      'powershell': 'PowerShell',
      'ps': 'PowerShell',
    };
    
    return langMap[langCode.toLowerCase()] || langCode;
  }
});

/**
 * Table of Contents Enhancement
 * Improves the table of contents with active section highlighting
 */
document.addEventListener('DOMContentLoaded', function() {
  // Only run if we have a TOC
  if (document.querySelector('.md-sidebar--secondary')) {
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
              document.querySelectorAll('.md-nav__link').forEach(item => {
                item.classList.remove('md-nav__link--active-visible');
              });
              
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
      headings.forEach(heading => {
        observer.observe(heading);
      });
    }
  }
});

/**
 * Table of Contents Title Change and Filtering
 * Changes the title of the table of contents to "Contents" and hides H1 headings
 */
document.addEventListener('DOMContentLoaded', function() {
  // Change the "Table of contents" label to just "Contents"
  const tocTitles = document.querySelectorAll('.md-nav__title[for="__toc"]');
  tocTitles.forEach(function(title) {
    title.innerHTML = title.innerHTML.replace("Table of contents", "Contents");
  });
  
  // Hide H1 headings in the table of contents
  // This ensures we're only showing level 2+ headings
  const tocLists = document.querySelectorAll('.md-nav--secondary .md-nav__list');
  tocLists.forEach(function(list) {
    const firstItem = list.querySelector('.md-nav__item:first-child');
    if (firstItem) {
      const link = firstItem.querySelector('.md-nav__link');
      const h1Element = document.querySelector('article h1');
      
      // If the first TOC item matches the page title, hide it
      if (link && h1Element && link.textContent.trim() === h1Element.textContent.trim()) {
        firstItem.style.display = 'none';
      }
    }
  });
  
  // Let MkDocs Material's default collapsible behavior work
  // We removed the custom navigation behavior to allow for dropdown arrows
});

/**
 * Logo configuration is managed by CSS
 */

/**
 * Create Controls Container and Add Global Print Functionality
 * Creates a container for header controls and adds a print button
 */
document.addEventListener('DOMContentLoaded', function() {
  // Create controls container for all header elements
  const headerInner = document.querySelector('.md-header__inner');
  if (headerInner) {
    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'md-header__controls';
    
    // Check if this is the internal build
    const isInternalBuild = document.querySelector('.md-version-indicator') !== null;
    
    // Only create print button for external build
    if (!isInternalBuild) {
      // Create print button
      const printButton = document.createElement('button');
      printButton.className = 'md-header-print-button';
      printButton.title = 'Print this page';
      printButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z"/>
        </svg>
      `;
      
      // Add print functionality
      printButton.addEventListener('click', function() {
        window.print();
      });
      
      // Add print button to container
      controlsContainer.appendChild(printButton);
    }
    
    // Move theme toggle to the controls container
    const themeToggle = document.querySelector('.md-header__option');
    
    // Add controls container to header
    headerInner.appendChild(controlsContainer);
    
    // Now move the theme toggle into our container if it exists
    if (themeToggle) {
      controlsContainer.appendChild(themeToggle);
    }
  }
});

/**
 * Company Branding Enhancement
 * Adds subtle company branding elements
 * Tries to fetch version from GitHub if possible
 */
document.addEventListener('DOMContentLoaded', function() {
  // Add version label in header with version fetched from GitHub
  const fetchVersion = async () => {
    let version = "v1.0";
    try {
      // Try to fetch the latest release version from GitHub
      // In a real implementation, this would hit the GitHub API
      // For this demo, we'll simulate a successful fetch
      // const response = await fetch('https://api.github.com/repos/your-org/your-repo/releases/latest');
      // const data = await response.json();
      // version = data.tag_name;
      
      // Just for demonstration, we'll return a simulated version
      return "v3.5";
    } catch (error) {
      console.warn("Could not fetch version from GitHub", error);
      return version;
    }
  };
  
  // Add version label to the controls container
  fetchVersion().then(version => {
    const controlsContainer = document.querySelector('.md-header__controls');
    if (controlsContainer) {
      const versionLabel = document.createElement('div');
      versionLabel.className = 'st-version-label';
      versionLabel.innerHTML = `<span>${version}</span>`;
      controlsContainer.appendChild(versionLabel);
    }
  });

  // Announcement banner removed as requested
  
  // Version selector is now handled by HTML/CSS templates in partials/version-indicator.html
});

/**
 * Version Selector for Internal Documentation
 * 
 * NOTE: Version selector implementation has been moved to a template-based approach
 * in docs/overrides/partials/version-indicator.html and is embedded in the header
 * through docs/overrides/partials/header.html.
 */
function addVersionSelector_DISABLED() {
  // Create the version selector container
  const versionSelector = document.createElement('div');
  versionSelector.className = 'md-version-selector';
  versionSelector.style.cssText = 'margin-right: 1rem; display: flex; align-items: center;';
  
  // Create the select element
  const select = document.createElement('select');
  select.id = 'version-select';
  select.style.cssText = 'padding: 0.3rem 1.5rem 0.3rem 0.5rem; border-radius: 4px; font-size: 0.7rem; border: 1px solid #ddd; background-color: #f5f5f5; appearance: none; background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 4 5\'%3E%3Cpath fill=\'%23333\' d=\'M2 0L0 2h4zm0 5L0 3h4z\'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.5rem center; background-size: 8px 10px;';
  
  // Add dark mode styling
  const darkStyle = document.createElement('style');
  darkStyle.textContent = `
    [data-md-color-scheme="slate"] #version-select {
      background-color: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.7);
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23adb5bd' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E");
    }
  `;
  document.head.appendChild(darkStyle);
  
  // Try to load versions from versions.json
  fetch('/versions.json')
    .then(response => response.json())
    .then(data => {
      // Add options based on the fetched data
      if (data && data.versions && Array.isArray(data.versions)) {
        data.versions.forEach(function(version) {
          const option = document.createElement('option');
          option.value = version.version;
          option.textContent = version.title;
          select.appendChild(option);
        });
        console.log('Loaded versions from versions.json');
      } else {
        console.warn('Invalid versions.json format');
        console.log('Version selector disabled - using HTML template instead');
      }
    })
    .catch(error => {
      console.warn('Could not load versions.json:', error);
      console.log('Version selector disabled - using HTML template instead');
    });
  
  // Fallback function to add default versions
  function addDefaultVersions_DISABLED() {
    const defaultVersions = [
      { value: 'latest', label: 'Latest Release' },
      { value: 'stable', label: 'Stable Release' },
      { value: '2023.3', label: 'December 2023 Release' },
      { value: '2023.2', label: 'August 2023 Release' },
      { value: '2023.1', label: 'March 2023 Release' }
    ];
    
    defaultVersions.forEach(function(version) {
      const option = document.createElement('option');
      option.value = version.value;
      option.textContent = version.label;
      select.appendChild(option);
    });
  }
  
  // Add event listener
  select.addEventListener('change', function() {
    alert('In production, this would navigate to version: ' + this.value);
  });
  
  // Add to the DOM
  versionSelector.appendChild(select);
  
  // Find where to insert the version selector
  setTimeout(function() {
    const controlsContainer = document.querySelector('.md-header__controls');
    if (controlsContainer) {
      // Insert at the beginning of the controls container
      if (controlsContainer.firstChild) {
        controlsContainer.insertBefore(versionSelector, controlsContainer.firstChild);
      } else {
        controlsContainer.appendChild(versionSelector);
      }
      console.log('Version selector added successfully');
    } else {
      // Fall back to inserting in the header
      const header = document.querySelector('.md-header__inner');
      if (header) {
        // Find a suitable place in the header
        const themeToggle = document.querySelector('.md-header__option');
        if (themeToggle) {
          header.insertBefore(versionSelector, themeToggle);
        } else {
          header.appendChild(versionSelector);
        }
        console.log('Version selector added successfully (fallback)');
      } else {
        console.warn('Could not find suitable location for version selector');
      }
    }
  }, 300);
}
