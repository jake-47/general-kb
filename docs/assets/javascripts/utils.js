/**
 * SiteTracker Documentation - Utility functions
 * 
 * This file contains common utility functions used across the SiteTracker documentation JavaScript.
 * It provides error handling and defensive programming techniques.
 */

// Fix for missing data-md-component=header error
// This runs immediately to patch any missing elements before other scripts run
(function() {
  // Check if we need to add missing attributes to elements
  const header = document.querySelector('header.md-header');
  if (header && !header.hasAttribute('data-md-component')) {
    header.setAttribute('data-md-component', 'header');
    console.log('Fixed missing data-md-component attribute on header');
  }
  
  // Add fallback for array methods if they might be missing
  if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      
      for (var i = 0; i < length; i++) {
        var value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    };
  }
  
  if (!Array.prototype.map) {
    Array.prototype.map = function(callback) {
      if (this == null) {
        throw new TypeError('Array.prototype.map called on null or undefined');
      }
      if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
      }
      var T = arguments[1];
      var A = new Array(this.length);
      var k = 0;
      while (k < this.length) {
        if (k in this) {
          A[k] = callback.call(T, this[k], k, this);
        }
        k++;
      }
      return A;
    };
  }
  
  // Polyfill for Array.from
  if (!Array.from) {
    Array.from = function(arrayLike) {
      var result = [];
      if (arrayLike) {
        for (var i = 0; i < arrayLike.length; i++) {
          result.push(arrayLike[i]);
        }
      }
      return result;
    };
  }
})();

/**
 * Safely query DOM elements with better error handling
 * @param {string} selector - CSS selector to find elements
 * @param {HTMLElement} parent - Parent element to start the search from (optional)
 * @returns {HTMLElement|null} - The found element or null if not found
 */
function safeQuerySelector(selector, parent = document) {
  try {
    if (!parent) return null;
    return parent.querySelector(selector);
  } catch (err) {
    console.warn(`Error finding element "${selector}":`, err.message);
    return null;
  }
}

/**
 * Safely query multiple DOM elements with better error handling
 * @param {string} selector - CSS selector to find elements
 * @param {HTMLElement} parent - Parent element to start the search from (optional)
 * @returns {Array} - Array of found elements or empty array if none found
 */
function safeQuerySelectorAll(selector, parent = document) {
  try {
    if (!parent) return [];
    const elements = parent.querySelectorAll(selector);
    if (!elements) return [];
    
    // Convert NodeList to Array without using Array.from for better compatibility
    var result = [];
    for (var i = 0; i < elements.length; i++) {
      result.push(elements[i]);
    }
    return result;
  } catch (err) {
    console.warn(`Error finding elements "${selector}":`, err.message);
    return [];
  }
}

/**
 * Safely add an event listener to an element
 * @param {HTMLElement} element - Element to add the event listener to
 * @param {string} eventType - Type of event to listen for
 * @param {Function} handler - Event handler function
 */
function safeAddEventListener(element, eventType, handler) {
  if (!element) return;
  try {
    element.addEventListener(eventType, handler);
  } catch (err) {
    console.warn(`Error adding ${eventType} event listener:`, err.message);
  }
}

/**
 * Safe version of Array prototype methods for possibly null values
 * @param {any} possibleArray - Value that might be an array
 * @param {string} method - Name of array method to call
 * @param {Array} args - Arguments to pass to the method
 * @returns {Array} - Result of method or empty array if input is not an array
 */
function safeArrayMethod(possibleArray, method, ...args) {
  if (!possibleArray || typeof possibleArray[method] !== 'function') {
    console.warn(`Cannot call ${method} on non-array:`, possibleArray);
    return Array.isArray(possibleArray) ? possibleArray : [];
  }
  
  try {
    return possibleArray[method](...args);
  } catch (err) {
    console.warn(`Error calling ${method}:`, err.message);
    return Array.isArray(possibleArray) ? possibleArray : [];
  }
}