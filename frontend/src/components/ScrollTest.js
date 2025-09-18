import React from 'react';
import { useScrollToTopNow } from '../hooks/useScrollToTop';

const ScrollTest = () => {
  const scrollToTop = useScrollToTopNow({ behavior: 'smooth' });
  
  // Force enable scrolling
  React.useEffect(() => {
    const forceScrolling = () => {
      document.documentElement.style.overflowY = 'auto';
      document.body.style.overflowY = 'auto';
      document.documentElement.style.height = 'auto';
      document.body.style.height = 'auto';
    };
    
    forceScrolling();
  }, []);

  const testScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * 2,
      left: 0,
      behavior: 'smooth'
    });
  };

  const testScrollToPosition = (position) => {
    window.scrollTo({
      top: position,
      left: 0,
      behavior: 'smooth'
    });
  };
  
  const checkScrollStatus = () => {
    console.log('=== Scroll Debug Info ===');
    console.log('Window scroll Y:', window.scrollY || window.pageYOffset);
    console.log('Document height:', document.documentElement.scrollHeight);
    console.log('Window height:', window.innerHeight);
    console.log('Body overflow-y:', getComputedStyle(document.body).overflowY);
    console.log('HTML overflow-y:', getComputedStyle(document.documentElement).overflowY);
    console.log('Body height:', getComputedStyle(document.body).height);
    console.log('HTML height:', getComputedStyle(document.documentElement).height);
    console.log('Can scroll?', document.documentElement.scrollHeight > window.innerHeight);
    console.log('=======================');
  };
  
  const forceScrollUp = () => {
    console.log('Force scroll up using direct DOM manipulation');
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scroll(0, 0);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '20px', 
      right: '20px', 
      zIndex: 9999,
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '1rem',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Scroll Tests</h4>
      <button 
        onClick={scrollToTop}
        style={{ 
          background: '#22c55e', 
          border: 'none', 
          padding: '0.5rem', 
          borderRadius: '5px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '0.8rem'
        }}
      >
        Scroll to Top
      </button>
      <button 
        onClick={testScrollDown}
        style={{ 
          background: '#3b82f6', 
          border: 'none', 
          padding: '0.5rem', 
          borderRadius: '5px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '0.8rem'
        }}
      >
        Scroll Down
      </button>
      <button 
        onClick={() => testScrollToPosition(500)}
        style={{ 
          background: '#f59e0b', 
          border: 'none', 
          padding: '0.5rem', 
          borderRadius: '5px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '0.8rem'
        }}
      >
        Scroll to 500px
      </button>
      <button 
        onClick={forceScrollUp}
        style={{ 
          background: '#ef4444', 
          border: 'none', 
          padding: '0.5rem', 
          borderRadius: '5px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '0.8rem'
        }}
      >
        Force Scroll Up
      </button>
      <button 
        onClick={checkScrollStatus}
        style={{ 
          background: '#8b5cf6', 
          border: 'none', 
          padding: '0.5rem', 
          borderRadius: '5px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '0.8rem'
        }}
      >
        Debug Info
      </button>
      <div style={{ fontSize: '0.7rem', marginTop: '0.5rem' }}>
        Current scroll: {Math.round(window.pageYOffset || window.scrollY)}px
      </div>
    </div>
  );
};

export default ScrollTest;