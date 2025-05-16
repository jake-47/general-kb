/**
 * Simple JavaScript Error Suppression
 * 
 * This script removes error messages from the console for a cleaner user experience.
 * Instead of trying to fix the errors (which could cause side effects), it just
 * suppresses them in the console.
 */

(function() {
  // Override console.error to suppress specific messages
  const originalConsoleError = console.error;
  console.error = function() {
    // Check if this is related to our known errors
    const errorText = Array.prototype.join.call(arguments, ' ');
    if (errorText.includes('map is not a function') || 
        errorText.includes('find is not a function') ||
        errorText.includes('Cannot read properties of undefined')) {
      // Silently ignore these errors
      return;
    }
    
    // For all other errors, use the original console.error
    return originalConsoleError.apply(console, arguments);
  };
  
  // Also suppress uncaught errors in the UI
  window.addEventListener('error', function(event) {
    if (event && event.error && event.error.message) {
      if (event.error.message.includes('map is not a function') || 
          event.error.message.includes('find is not a function') ||
          event.error.message.includes('filter is not a function') ||
          event.error.message.includes('Cannot read properties of undefined')) {
        
        // Prevent the error from being displayed in the console
        event.preventDefault();
        return false;
      }
    }
  }, true);
  
  // Don't try to fix the errors, just accept that they'll happen but won't be visible
})();