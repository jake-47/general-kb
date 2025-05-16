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
  
  // Add environment indicator if this is internal only - DISABLED, now using template-based approach
  function addEnvironmentBanner() {
    // Skip adding environment indicator via JavaScript because we now use a template-based approach
    // in docs/overrides/partials/header.html
    
    // Only handle the removal of "(Internal)" from page titles
    if (window.DOCS_ENV.isInternal) {
      // Process page title modifications
      
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
  }
  
  // Modify the page based on environment and build type
  function applyEnvironmentStyles() {
    // Apply body classes
    document.body.classList.add(`env-${window.DOCS_ENV.environment}`);
    document.body.classList.add(window.DOCS_ENV.isInternal ? 'internal-build' : 'external-build');
    
    // In production external builds, hide any internal-only content
    if (window.DOCS_ENV.environment === 'production' && !window.DOCS_ENV.isInternal) {
      // Hide all elements with internal-only class
      try {
        const internalElements = document.querySelectorAll('.internal-only');
        if (internalElements) {
          for (let i = 0; i < internalElements.length; i++) {
            const el = internalElements[i];
            if (el && el.style) {
              el.style.display = 'none';
            }
          }
        }
      } catch (err) {
        console.warn('Error hiding internal-only elements:', err);
      }
      
      // Hide all internal tabs
      try {
        // Get all tab labels
        const allTabLabels = document.querySelectorAll('.tabbed-labels > label');
        if (!allTabLabels) return;
        
        // Find internal tabs
        const internalTabs = [];
        for (let i = 0; i < allTabLabels.length; i++) {
          const tab = allTabLabels[i];
          if (!tab || !tab.textContent) continue;
          
          const text = tab.textContent.trim().toLowerCase();
          if (text.includes('internal') || text.includes('staff only') || text.includes('team only')) {
            internalTabs.push(tab);
          }
        }
        
        // Process each internal tab
        for (let i = 0; i < internalTabs.length; i++) {
          const tab = internalTabs[i];
          if (!tab || !tab.style) continue;
          
          // Hide the tab itself
          tab.style.display = 'none';
          
          // Find index with defensive checks
          if (!tab.parentNode || !tab.parentNode.children) continue;
          
          // Convert children to array safely
          const children = [];
          for (let j = 0; j < tab.parentNode.children.length; j++) {
            children.push(tab.parentNode.children[j]);
          }
          
          const index = children.indexOf(tab);
          if (index === -1) continue;
          
          // Hide corresponding content
          const tabSet = tab.closest('.tabbed-set');
          if (!tabSet) continue;
          
          const tabContents = tabSet.querySelectorAll('.tabbed-content');
          if (!tabContents || index >= tabContents.length) continue;
          
          const contentTab = tabContents[index];
          if (contentTab && contentTab.style) {
            contentTab.style.display = 'none';
          }
        }
      } catch (err) {
        console.warn('Error hiding internal tabs:', err);
      }
      
      // If we hid all tabs in a set and there's only one tab left, make it active
      try {
        const tabSets = document.querySelectorAll('.tabbed-set');
        if (tabSets) {
          for (let i = 0; i < tabSets.length; i++) {
            const tabSet = tabSets[i];
            if (!tabSet) continue;
            
            const visibleTabs = tabSet.querySelectorAll('.tabbed-labels > label:not([style*="display: none"])');
            if (!visibleTabs || visibleTabs.length !== 1) continue;
            
            // Simulate click on the only visible tab
            setTimeout(function() {
              try {
                if (visibleTabs[0]) {
                  visibleTabs[0].click();
                }
              } catch (err) {
                console.warn('Error clicking tab:', err);
              }
            }, 100);
          }
        }
      } catch (err) {
        console.warn('Error processing tab sets:', err);
      }
    }
  }
  
  // Initialize
  addEnvironmentBanner();
  applyEnvironmentStyles();
});