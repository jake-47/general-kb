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
      // Hide all internal tabs and content
      const internalTabs = Array.from(document.querySelectorAll('.tabbed-labels > label'))
        .filter(tab => {
          const text = tab.textContent.trim().toLowerCase();
          return text.includes('internal') || text.includes('staff only') || text.includes('team only');
        });
      
      internalTabs.forEach(tab => {
        // Hide the tab itself
        tab.style.display = 'none';
        
        // Find index of this tab in its parent's children
        const index = Array.from(tab.parentNode.children).indexOf(tab);
        
        // Hide corresponding content
        const tabContents = tab.closest('.tabbed-set').querySelectorAll('.tabbed-content');
        if (tabContents[index]) {
          tabContents[index].style.display = 'none';
        }
      });
      
      // Also hide any elements with internal-only class
      document.querySelectorAll('.internal-only').forEach(el => {
        el.style.display = 'none';
      });
    }
    
    // If we hid all tabs in a set and there's only one tab left, make it active
    document.querySelectorAll('.tabbed-set').forEach(tabSet => {
      const visibleTabs = tabSet.querySelectorAll('.tabbed-labels > label:not([style*="display: none"])');
      if (visibleTabs.length === 1) {
        // Simulate click on the only visible tab
        setTimeout(() => {
          visibleTabs[0].click();
        }, 100);
      }
    });
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