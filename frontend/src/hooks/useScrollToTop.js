import { useEffect } from 'react';

/**
 * Custom hook to automatically scroll to the top of the page
 * @param {any} dependency - The dependency that triggers scroll to top when changed
 * @param {Object} options - Configuration options
 * @param {string} options.behavior - Scroll behavior ('smooth' or 'auto')
 * @param {number} options.top - Position to scroll to (default: 0)
 * @param {boolean} options.enabled - Whether scrolling is enabled (default: true)
 */
export const useScrollToTop = (dependency, options = {}) => {
  const {
    behavior = 'smooth',
    top = 0,
    enabled = true
  } = options;

  useEffect(() => {
    if (enabled && dependency !== null && dependency !== undefined) {
      console.log('useScrollToTop triggered with dependency:', dependency);
      
      // Try multiple scroll methods for better compatibility
      try {
        // Method 1: Use window.scrollTo
        window.scrollTo({
          top,
          left: 0,
          behavior
        });
        
        // Method 2: Also try document.documentElement.scrollTop as fallback
        if (behavior === 'auto') {
          document.documentElement.scrollTop = top;
          document.body.scrollTop = top;
        }
        
        console.log('Scroll executed successfully');
      } catch (error) {
        console.error('Error during scroll:', error);
        // Fallback method
        document.documentElement.scrollTop = top;
        document.body.scrollTop = top;
      }
    }
  }, [dependency, behavior, top, enabled]);
};

/**
 * Hook to scroll to top immediately without dependency
 * @param {Object} options - Configuration options
 */
export const useScrollToTopNow = (options = {}) => {
  const {
    behavior = 'smooth',
    top = 0
  } = options;

  const scrollToTop = () => {
    console.log('scrollToTop called with options:', { behavior, top });
    
    try {
      // Method 1: Use window.scrollTo
      window.scrollTo({
        top,
        left: 0,
        behavior
      });
      
      // Method 2: Also try document.documentElement.scrollTop as fallback
      if (behavior === 'auto') {
        document.documentElement.scrollTop = top;
        document.body.scrollTop = top;
      }
      
      console.log('Scroll executed successfully');
    } catch (error) {
      console.error('Error during scroll:', error);
      // Fallback method
      document.documentElement.scrollTop = top;
      document.body.scrollTop = top;
    }
  };

  return scrollToTop;
};

export default useScrollToTop;