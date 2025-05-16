// Environment configuration loader
document.addEventListener('DOMContentLoaded', function() {
  // Default values in case config isn't available
  if (!window.DOCS_ENV) {
    window.DOCS_ENV = {
      environment: 'development',
      isInternal: false,
      buildDate: new Date().toISOString(),
      buildType: 'external'
    };
  }
  
  // Add environment indicator if this is internal only
  function addEnvironmentBanner() {
    // Only show internal indicator, no development/staging indicators
    if (window.DOCS_ENV.isInternal) {
      const header = document.querySelector('.md-header__inner');
      if (!header) return;
      
      const envIndicator = document.createElement('div');
      envIndicator.className = 'md-header__environment';
      
      // Only show internal label
      let labelText = 'INTERNAL';
      
      envIndicator.innerHTML = `<span class="md-header__env-label">${labelText}</span>`;
      envIndicator.classList.add('env-internal');
      
      // Add the indicator to the header, to the left of the title
      const title = document.querySelector('.md-header__title');
      if (title) {
        title.parentNode.insertBefore(envIndicator, title);
      }
    }
  }
  
  // Modify the page based on environment and build type
  function applyEnvironmentStyles() {
    // Apply body classes
    document.body.classList.add(`env-${window.DOCS_ENV.environment}`);
    document.body.classList.add(window.DOCS_ENV.isInternal ? 'internal-build' : 'external-build');
    
    // In production external builds, hide any internal-only content
    if (window.DOCS_ENV.environment === 'production' && !window.DOCS_ENV.isInternal) {
      // Hide all elements with internal-only class
      document.querySelectorAll('.internal-only').forEach(el => {
        el.style.display = 'none';
      });
      
      // Hide all internal tabs
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
  }
  
  // Initialize
  addEnvironmentBanner();
  applyEnvironmentStyles();
});