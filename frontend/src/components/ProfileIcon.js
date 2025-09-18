import React, { useState, useRef, useEffect } from 'react';
import './ProfileIcon.css';

const ProfileIcon = ({ onSignIn, onSignUp, onAboutUs, onRoleBasedSignIn, onRoleBasedSignUp }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [currentAction, setCurrentAction] = useState(null); // 'signin' or 'signup'
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignInClick = () => {
    setIsDropdownOpen(false);
    setCurrentAction('signin');
    setShowRoleSelection(true);
  };

  const handleSignUpClick = () => {
    setIsDropdownOpen(false);
    setCurrentAction('signup');
    setShowRoleSelection(true);
  };

  const handleAboutUs = () => {
    setIsDropdownOpen(false);
    if (onAboutUs) {
      onAboutUs();
    }
  };

  const handleRoleSelect = (role) => {
    setShowRoleSelection(false);
    setCurrentAction(null);
    
    if (currentAction === 'signin' && onRoleBasedSignIn) {
      onRoleBasedSignIn(role);
    } else if (currentAction === 'signup' && onRoleBasedSignUp) {
      onRoleBasedSignUp(role);
    } else {
      // Fallback to original behavior
      if (onSignIn) {
        onSignIn();
      }
    }
  };

  const closeRoleSelection = () => {
    setShowRoleSelection(false);
    setCurrentAction(null);
  };

  const userRoles = [
    {
      type: 'student',
      title: 'Student',
      icon: '👨‍🎓',
      description: 'Join as a student'
    },
    {
      type: 'teacher', 
      title: 'Teacher',
      icon: '👨‍🏫',
      description: 'Join as a teacher'
    },
    {
      type: 'admin',
      title: 'Admin', 
      icon: '👨‍💼',
      description: 'Join as an admin'
    }
  ];

  return (
    <div className="profile-icon-container" ref={dropdownRef}>
      <button 
        className="profile-icon-btn"
        onClick={toggleDropdown}
        aria-label="User profile menu"
      >
        <div className="profile-icon">
          <span className="profile-emoji">👤</span>
        </div>
      </button>

      {isDropdownOpen && (
        <div className="profile-dropdown">
        <div className="profile-dropdown-content">
            <button 
              className="profile-dropdown-item sign-in"
              onClick={handleSignInClick}
            >
              <span className="dropdown-icon">🔑</span>
              Sign In
            </button>
            <button 
              className="profile-dropdown-item sign-up"
              onClick={handleSignUpClick}
            >
              <span className="dropdown-icon">✨</span>
              Sign Up
            </button>
            <button 
              className="profile-dropdown-item about-us"
              onClick={handleAboutUs}
            >
              <span className="dropdown-icon">ℹ️</span>
              About Us
            </button>
          </div>
        </div>
      )}

      {showRoleSelection && (
        <div className="role-selection-modal">
          <div className="role-selection-overlay" onClick={closeRoleSelection}></div>
          <div className="role-selection-content">
            <div className="role-selection-header">
              <h3>
                {currentAction === 'signin' ? '🔑 Sign In As' : '✨ Sign Up As'}
              </h3>
              <p>Choose your role to continue</p>
              <button 
                className="close-btn"
                onClick={closeRoleSelection}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            
            <div className="role-options">
              {userRoles.map((role) => (
                <button
                  key={role.type}
                  className={`role-option ${role.type}`}
                  onClick={() => handleRoleSelect(role.type)}
                >
                  <div className="role-icon">{role.icon}</div>
                  <div className="role-info">
                    <div className="role-title">{role.title}</div>
                    <div className="role-description">{role.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;