// Environment-based access control for internal content
document.addEventListener('DOMContentLoaded', function() {
  // Function to determine if we're in an internal environment
  function isInternalEnvironment() {
    // Check for environment via:
    // 1. Hostname check (most reliable)
    // 2. URL parameters (for testing)
    // 3. Local flag (for development)
    
    const hostname = window.location.hostname;
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if we're on an internal domain
    if (hostname.includes('internal.') || 
        hostname.includes('int.') || 
        hostname.includes('dev.') ||
        hostname.endsWith('internal') ||
        hostname === 'localhost' ||
        hostname === '127.0.0.1') {
      return true;
    }
    
    // Check for environment param (useful for testing)
    if (urlParams.get('env') === 'internal') {
      return true;
    }
    
    // Default to external environment
    return false;
  }
  
  // Handle internal content visibility based on environment
  function handleInternalContent() {
    const isInternal = isInternalEnvironment();
    
    // Add a class to the body to indicate environment
    document.body.classList.add(isInternal ? 'internal-env' : 'external-env');
    
    if (!isInternal) {
      // Hide all internal tabs and content - with defensive checks
      try {
        // Safely convert NodeList to Array with fallback
        const tabElements = document.querySelectorAll('.tabbed-labels > label');
        const internalTabs = tabElements ? Array.from(tabElements) : [];
        
        // Safely filter the array
        const filteredTabs = internalTabs.filter(tab => {
          if (!tab || !tab.textContent) return false;
          const text = tab.textContent.trim().toLowerCase();
          return text.includes('internal') || text.includes('staff only') || text.includes('team only');
        });
        
        // Process each tab with defensive checks
        filteredTabs.forEach(tab => {
          if (!tab || !tab.style) return;
          
          // Hide the tab itself
          tab.style.display = 'none';
          
          // Find index with defensive checks
          if (!tab.parentNode || !tab.parentNode.children) return;
          const children = Array.from(tab.parentNode.children);
          const index = children.indexOf(tab);
          
          // Hide corresponding content with defensive checks
          const tabSet = tab.closest('.tabbed-set');
          if (!tabSet) return;
          
          const contentElements = tabSet.querySelectorAll('.tabbed-content');
          const tabContents = contentElements ? Array.from(contentElements) : [];
          
          if (tabContents && tabContents[index]) {
            tabContents[index].style.display = 'none';
          }
        });
      } catch (err) {
        console.warn('Error hiding internal tabs:', err);
      }
      
      // Also hide any elements with internal-only class
      try {
        const internalElements = document.querySelectorAll('.internal-only');
        if (internalElements) {
          Array.from(internalElements).forEach(el => {
            if (el && el.style) {
              el.style.display = 'none';
            }
          });
        }
      } catch (err) {
        console.warn('Error hiding internal-only elements:', err);
      }
    }
    
    // If we hid all tabs in a set and there's only one tab left, make it active
    try {
      const tabSets = document.querySelectorAll('.tabbed-set');
      if (tabSets) {
        Array.from(tabSets).forEach(tabSet => {
          if (!tabSet) return;
          
          const visibleTabElements = tabSet.querySelectorAll('.tabbed-labels > label:not([style*="display: none"])');
          const visibleTabs = visibleTabElements ? Array.from(visibleTabElements) : [];
          
          if (visibleTabs.length === 1 && visibleTabs[0]) {
            // Simulate click on the only visible tab
            setTimeout(() => {
              try {
                if (typeof visibleTabs[0].click === 'function') {
                  visibleTabs[0].click();
                }
              } catch (err) {
                console.warn('Error clicking tab:', err);
              }
            }, 100);
          }
        });
      }
    } catch (err) {
      console.warn('Error processing tab sets:', err);
    }
  }
  
  // Add environment indicator in header - disabled as requested
  function addEnvironmentIndicator() {
    // Environment indicator has been removed as requested
    return;
  }
  
  // Initialize environment-based controls
  handleInternalContent();
  addEnvironmentIndicator();
});