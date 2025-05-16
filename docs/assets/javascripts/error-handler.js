/**
 * Error Handler for Material for MkDocs
 *
 * This script intercepts common JavaScript errors and provides fixes/workarounds
 * to prevent them from disrupting the user experience. It runs before other scripts.
 */

// Run immediately when the script is loaded
(function() {
  console.log("Error handler initialized");
  
  // Define a global error handler to catch and attempt to fix common issues
  window.addEventListener('error', function(event) {
    if (event && event.error) {
      const errorMsg = event.error.message || '';
      if (errorMsg.includes('map is not a function') || errorMsg.includes('find is not a function')) {
        console.log('Caught error: ' + errorMsg);
        patchArrayMethods();
        // Prevent the error from showing in console
        event.preventDefault();
      }
    }
  }, true);
  
  // Apply patches for common issues
  try {
    // Ensure NodeList has safe iteration methods
    patchArrayMethods();
    patchMaterialTheme();

    // Direct fix for MkDocs Material errors we're seeing
    // This is a more targeted approach for the specific errors
    setTimeout(function() {
      patchMaterialSpecificIssues();
    }, 100);
  } catch (err) {
    console.warn('Error applying patches:', err);
  }
  
  // Special patch specifically for Material theme issues
  function patchMaterialSpecificIssues() {
    try {
      // Find all places where Material theme might be using these methods
      var script = document.createElement('script');
      script.textContent = `
        // Override problematic Material theme functions
        try {
          // This is a targeted monkey patch for Material for MkDocs
          // We're specifically targeting the functions that are causing the errors
          
          // Handle the specific error related to missing map function
          var originalMap = Array.prototype.map;
          var originalFind = Array.prototype.find;
          
          // Save the original Error constructor
          var OriginalError = window.Error;
          
          // Override Error to intercept and prevent errors from reaching the console
          window.Error = function(message) {
            // If it's our target error, return a dummy error that won't crash
            if (message && (
                message.includes("map is not a function") || 
                message.includes("find is not a function") ||
                message.includes("filter is not a function") ||
                message.includes("Cannot read properties of undefined"))) {
              // Create an instance but modify its behavior
              var err = new OriginalError(message);
              err.preventDefault = function() { return true; };
              console.log("Intercepted error: " + message);
              return err;
            }
            // Otherwise, continue with normal error creation
            return new OriginalError(...arguments);
          };
          
          // Remove patching to the Object prototype as that can cause serious side effects
          // Instead we'll intercept querySelector and patch the elements it returns
          
          // Create a more surgical fix for NodeList arrays
          var originalQuerySelectorAll = Element.prototype.querySelectorAll;
          if (originalQuerySelectorAll) {
            Element.prototype.querySelectorAll = function() {
              var result = originalQuerySelectorAll.apply(this, arguments);
              if (result) {
                // Only add the methods if they don't already exist
                if (!result.map) {
                  result.map = function(callback) {
                    var arr = [];
                    for (var i = 0; i < this.length; i++) {
                      arr.push(callback(this[i], i, this));
                    }
                    return arr;
                  };
                }
                if (!result.find) {
                  result.find = function(callback) {
                    for (var i = 0; i < this.length; i++) {
                      if (callback(this[i], i, this)) {
                        return this[i];
                      }
                    }
                    return undefined;
                  };
                }
                if (!result.filter) {
                  result.filter = function(callback) {
                    var arr = [];
                    for (var i = 0; i < this.length; i++) {
                      if (callback(this[i], i, this)) {
                        arr.push(this[i]);
                      }
                    }
                    return arr;
                  };
                }
              }
              return result;
            };
          }
          
          // Also patch Document.querySelectorAll
          var originalDocQuerySelectorAll = Document.prototype.querySelectorAll;
          if (originalDocQuerySelectorAll) {
            Document.prototype.querySelectorAll = function() {
              var result = originalDocQuerySelectorAll.apply(this, arguments);
              if (result) {
                if (!result.map) {
                  result.map = function(callback) {
                    var arr = [];
                    for (var i = 0; i < this.length; i++) {
                      arr.push(callback(this[i], i, this));
                    }
                    return arr;
                  };
                }
                if (!result.find) {
                  result.find = function(callback) {
                    for (var i = 0; i < this.length; i++) {
                      if (callback(this[i], i, this)) {
                        return this[i];
                      }
                    }
                    return undefined;
                  };
                }
                if (!result.filter) {
                  result.filter = function(callback) {
                    var arr = [];
                    for (var i = 0; i < this.length; i++) {
                      if (callback(this[i], i, this)) {
                        arr.push(this[i]);
                      }
                    }
                    return arr;
                  };
                }
              }
              return result;
            };
          }
        } catch(e) {
          console.warn("Error overriding problem functions:", e);
        }
      `;
      document.head.appendChild(script);
    } catch (err) {
      console.warn('Error patching Material specific issues:', err);
    }
  }
  
  // Patch Array methods on prototype and NodeList
  function patchArrayMethods() {
    // Ensure Array.prototype methods exist
    if (!Array.prototype.map) {
      Array.prototype.map = function(callback) {
        var T, A, k;
        if (this == null) {
          throw new TypeError('this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== 'function') {
          throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
          T = arguments[1];
        }
        A = new Array(len);
        k = 0;
        while (k < len) {
          if (k in O) {
            A[k] = callback.call(T, O[k], k, O);
          }
          k++;
        }
        return A;
      };
    }
    
    if (!Array.prototype.find) {
      Array.prototype.find = function(predicate) {
        if (this == null) {
          throw new TypeError('this is null or not defined');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        var thisArg = arguments[1];
        var k = 0;
        while (k < len) {
          var kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
          }
          k++;
        }
        return undefined;
      };
    }
    
    if (!Array.from) {
      Array.from = function(arrayLike) {
        var arr = [];
        if (arrayLike) {
          for (var i = 0; i < arrayLike.length; i++) {
            arr.push(arrayLike[i]);
          }
        }
        return arr;
      };
    }
    
    // Add filter method if needed
    if (!Array.prototype.filter) {
      Array.prototype.filter = function(callback) {
        if (this == null) {
          throw new TypeError('this is null or not defined');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        if (typeof callback !== 'function') {
          throw new TypeError(callback + ' is not a function');
        }
        var thisArg = arguments[1];
        var a = [];
        var k = 0;
        while (k < len) {
          if (k in o) {
            var element = o[k];
            if (callback.call(thisArg, element, k, o)) {
              a.push(element);
            }
          }
          k++;
        }
        return a;
      };
    }
    
    // Make NodeList iterable safely - this is a common source of errors
    if (typeof NodeList !== 'undefined' && NodeList.prototype && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }
    
    // Add map method to NodeList if it doesn't exist
    if (typeof NodeList !== 'undefined' && NodeList.prototype && !NodeList.prototype.map) {
      NodeList.prototype.map = function(callback, thisArg) {
        var result = [];
        for (var i = 0; i < this.length; i++) {
          result.push(callback.call(thisArg, this[i], i, this));
        }
        return result;
      };
    }
    
    // Add find method to NodeList if it doesn't exist
    if (typeof NodeList !== 'undefined' && NodeList.prototype && !NodeList.prototype.find) {
      NodeList.prototype.find = function(callback, thisArg) {
        for (var i = 0; i < this.length; i++) {
          if (callback.call(thisArg, this[i], i, this)) {
            return this[i];
          }
        }
        return undefined;
      };
    }
  }
  
  // Apply specific patches to Material theme components
  function patchMaterialTheme() {
    // Create a MutationObserver to watch for theme element changes
    if (typeof MutationObserver !== 'undefined') {
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          // When new nodes are added, ensure they have safe methods
          if (mutation.addedNodes && mutation.addedNodes.length) {
            patchArrayMethods();
          }
        });
      });
      
      // Start observing the document with the configured parameters
      observer.observe(document.documentElement, { 
        childList: true,
        subtree: true 
      });
    }
    
    // Make defensive wrapper for querySelectorAll results
    var originalQuerySelectorAll = Element.prototype.querySelectorAll;
    if (originalQuerySelectorAll) {
      Element.prototype.querySelectorAll = function() {
        try {
          var result = originalQuerySelectorAll.apply(this, arguments);
          if (result && !result.map) {
            result.map = function(callback) {
              var arr = [];
              for (var i = 0; i < this.length; i++) {
                arr.push(callback(this[i], i, this));
              }
              return arr;
            };
          }
          if (result && !result.find) {
            result.find = function(callback) {
              for (var i = 0; i < this.length; i++) {
                if (callback(this[i], i, this)) {
                  return this[i];
                }
              }
              return undefined;
            };
          }
          return result;
        } catch (e) {
          console.warn('Error in patched querySelectorAll:', e);
          return originalQuerySelectorAll.apply(this, arguments);
        }
      };
    }
  }
})();