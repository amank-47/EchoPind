import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">🌱</div>
            <span className="logo-text">EchoPind</span>
          </Link>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" className="nav-link">
              <span className="nav-icon">🏠</span>
              Village Home
            </Link>
            <Link to="/learn" className="nav-link">
              <span className="nav-icon">🎮</span>
              Learn & Play
            </Link>
            <Link to="/ai-features" className="nav-link">
              <span className="nav-icon">🤖</span>
              AI Assistant
            </Link>
            <Link to="/leaderboard" className="nav-link">
              <span className="nav-icon">🏆</span>
              Leaderboard
            </Link>
            <Link to="/community" className="nav-link">
              <span className="nav-icon">🌍</span>
              Community
            </Link>
            <Link to="/achievements" className="nav-link">
              <span className="nav-icon">⭐</span>
              Badges
            </Link>
          </nav>

          {/* User Actions */}
          <div className="user-actions">
            <div className="eco-points">
              <span className="points-icon">🍃</span>
              <span className="points-count">1,250</span>
            </div>
            <div className="user-profile">
              <img src="/api/placeholder/32/32" alt="Profile" className="profile-pic" />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;