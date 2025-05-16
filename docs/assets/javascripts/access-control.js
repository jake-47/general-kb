// Internal content access control
document.addEventListener('DOMContentLoaded', function() {
  // Function to check if user is authenticated as internal
  function isInternalUser() {
    // You could implement this with:
    // 1. A cookie or localStorage flag set after login
    // 2. An API call to check authentication status
    // 3. A simple password prompt
    
    // For simple password protection example:
    const storedAuth = localStorage.getItem('sitetracker_internal_auth');
    if (storedAuth === 'true') {
      return true;
    }
    return false;
  }

  // Handle internal content visibility
  function handleInternalContent() {
    try {
      // Find all tabs with "Internal Only" or similar labels - with defensive checks
      const tabElements = document.querySelectorAll('.tabbed-labels > label');
      if (!tabElements) return;
      
      const tabArray = Array.from(tabElements);
      if (!tabArray || !tabArray.length) return;
      
      const internalTabs = tabArray.filter(tab => {
        if (!tab || !tab.textContent) return false;
        const text = tab.textContent.trim().toLowerCase();
        return text.includes('internal') || text.includes('staff only') || text.includes('team only');
      });
      
      const internalUser = isInternalUser();
      
      // Handle visibility of internal tabs
      if (internalTabs && internalTabs.length) {
        internalTabs.forEach(tab => {
          if (!tab) return;
          
          if (!internalUser) {
            // Hide the tab itself
            if (tab.style) {
              tab.style.display = 'none';
            }
            
            // Find index with defensive checks
            if (!tab.parentNode || !tab.parentNode.children) return;
            const children = Array.from(tab.parentNode.children);
            const index = children.indexOf(tab);
            
            // Hide corresponding content
            const tabSet = tab.closest('.tabbed-set');
            if (!tabSet) return;
            
            const contentElements = tabSet.querySelectorAll('.tabbed-content');
            if (!contentElements) return;
            
            const tabContents = Array.from(contentElements);
            if (tabContents && tabContents[index]) {
              tabContents[index].style.display = 'none';
            }
          }
        });
      }
      
      // If we hid all tabs in a set and there's only one tab left, make it active
      const tabSets = document.querySelectorAll('.tabbed-set');
      if (!tabSets) return;
      
      Array.from(tabSets).forEach(tabSet => {
        if (!tabSet) return;
        
        const visibleTabElements = tabSet.querySelectorAll('.tabbed-labels > label:not([style*="display: none"])');
        if (!visibleTabElements) return;
        
        const visibleTabs = Array.from(visibleTabElements);
        if (visibleTabs && visibleTabs.length === 1 && visibleTabs[0]) {
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
    } catch (err) {
      console.warn('Error in handleInternalContent:', err);
    }
  }

  // Add login functionality
  function addLoginButton() {
    const header = document.querySelector('.md-header__inner');
    if (!header) return;
    
    const loginContainer = document.createElement('div');
    loginContainer.className = 'md-header__login';
    
    const isAuthenticated = isInternalUser();
    
    if (isAuthenticated) {
      // Add logout button
      loginContainer.innerHTML = `
        <button class="md-header__login-button md-header__login-button--logout">
          Internal View
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M16 13v-2H7V8l-5 4 5 4v-3z M3 3h13c1.1 0 2 .9 2 2v4h2v3h-2v4c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm0 18h13c1.1 0 2-.9 2-2v-4h2v-3h-2V8c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2z"/>
          </svg>
        </button>
      `;
      
      // Add logout functionality
      const logoutButton = loginContainer.querySelector('.md-header__login-button--logout');
      logoutButton.addEventListener('click', function() {
        localStorage.removeItem('sitetracker_internal_auth');
        window.location.reload();
      });
    } else {
      // Add login button
      loginContainer.innerHTML = `
        <button class="md-header__login-button">
          Internal Login
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5m9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
          </svg>
        </button>
      `;
      
      // Add login functionality
      const loginButton = loginContainer.querySelector('.md-header__login-button');
      loginButton.addEventListener('click', function() {
        const password = prompt('Enter internal access password:');
        
        // Replace 'internal_password' with your actual password or implement a better auth system
        if (password === 'internal_password') {
          localStorage.setItem('sitetracker_internal_auth', 'true');
          window.location.reload();
        } else {
          alert('Invalid password');
        }
      });
    }
    
    // Add the login container to the header
    const controlsContainer = document.querySelector('.md-header__controls');
    if (controlsContainer) {
      controlsContainer.parentNode.insertBefore(loginContainer, controlsContainer);
    } else {
      header.appendChild(loginContainer);
    }
  }

  // Initialize access control
  addLoginButton();
  handleInternalContent();
});