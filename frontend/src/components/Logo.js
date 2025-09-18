import React from 'react';
import './Logo.css';

const Logo = ({ 
  size = 'medium', 
  showText = true, 
  clickable = true, 
  onClick,
  className = ''
}) => {
  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    } else if (clickable) {
      // Default behavior - go to home
      window.location.href = '/';
    }
  };

  const LogoSVG = () => (
    <svg 
      className={`echopind-logo ${size}`}
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="logoGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </radialGradient>
      </defs>
      
      {/* Circular background with gradient */}
      <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" />
      
      {/* Tree trunk */}
      <path
        d="M 48 60 L 48 75 L 52 75 L 52 60 Z"
        fill="white"
      />
      
      {/* Tree branches and leaves */}
      <g fill="white">
        {/* Main tree structure */}
        <path d="M 50 25 L 45 35 L 55 35 Z" />
        <path d="M 50 30 L 43 42 L 57 42 Z" />
        <path d="M 50 35 L 40 50 L 60 50 Z" />
        <path d="M 50 40 L 38 58 L 62 58 Z" />
        
        {/* Individual leaves around the tree */}
        <ellipse cx="35" cy="45" rx="4" ry="7" transform="rotate(-20 35 45)" />
        <ellipse cx="65" cy="45" rx="4" ry="7" transform="rotate(20 65 45)" />
        <ellipse cx="42" cy="30" rx="3" ry="6" transform="rotate(-30 42 30)" />
        <ellipse cx="58" cy="30" rx="3" ry="6" transform="rotate(30 58 30)" />
        <ellipse cx="38" cy="38" rx="3.5" ry="6.5" transform="rotate(-40 38 38)" />
        <ellipse cx="62" cy="38" rx="3.5" ry="6.5" transform="rotate(40 62 38)" />
        <ellipse cx="45" cy="25" rx="2.5" ry="5" transform="rotate(-15 45 25)" />
        <ellipse cx="55" cy="25" rx="2.5" ry="5" transform="rotate(15 55 25)" />
        
        {/* Top leaves */}
        <ellipse cx="50" cy="20" rx="3" ry="5" />
        <ellipse cx="47" cy="22" rx="2" ry="4" transform="rotate(-25 47 22)" />
        <ellipse cx="53" cy="22" rx="2" ry="4" transform="rotate(25 53 22)" />
        
        {/* Side leaves */}
        <ellipse cx="32" cy="52" rx="3" ry="5" transform="rotate(-45 32 52)" />
        <ellipse cx="68" cy="52" rx="3" ry="5" transform="rotate(45 68 52)" />
        <ellipse cx="40" cy="55" rx="2.5" ry="4.5" transform="rotate(-25 40 55)" />
        <ellipse cx="60" cy="55" rx="2.5" ry="4.5" transform="rotate(25 60 55)" />
      </g>
    </svg>
  );

  return (
    <div 
      className={`logo-container ${clickable ? 'clickable' : ''} ${className}`}
      onClick={clickable ? handleClick : undefined}
    >
      <LogoSVG />
      {showText && (
        <span className={`logo-text ${size}`}>
          EchoPind
        </span>
      )}
    </div>
  );
};

export default Logo;