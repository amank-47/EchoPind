import React, { useState, useEffect, useRef } from 'react';
import './StudentDashboard.css';
import Logo from './Logo';
import ProfileSettings from './ProfileSettings';

const StudentDashboard = ({ user, onLogout, onReturnToLanding, onUpdateProfile }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  const studentData = {
    name: user?.fullName || user?.name || 'Student',
    level: 'Eco Champion',
    points: 1250,
    badges: 8,
    treesPlanted: 23,
    co2Saved: '156 kg',
    currentStreak: 7
  };

  const recentAchievements = [
    { icon: '🌱', name: 'Seedling Master', date: '2 days ago' },
    { icon: '♻️', name: 'Recycling Hero', date: '1 week ago' },
    { icon: '💧', name: 'Water Guardian', date: '2 weeks ago' },
    { icon: '⚡', name: 'Energy Saver', date: '1 month ago' }
  ];

  const quickGames = [
    {
      id: 1,
      title: 'EcoQuiz Challenge',
      icon: '🧠',
      description: 'Test your environmental knowledge',
      difficulty: 'Easy',
      points: 50,
      status: 'available'
    },
    {
      id: 2,
      title: 'Sort n Save',
      icon: '♻️',
      description: 'Sort waste into correct bins',
      difficulty: 'Medium',
      points: 75,
      status: 'coming-soon'
    },
    {
      id: 3,
      title: 'Carbon Calculator',
      icon: '👣',
      description: 'Calculate your carbon footprint',
      difficulty: 'Medium',
      points: 100,
      status: 'coming-soon'
    }
  ];

  const weeklyProgress = [
    { day: 'Mon', activities: 3, points: 75 },
    { day: 'Tue', activities: 5, points: 120 },
    { day: 'Wed', activities: 2, points: 50 },
    { day: 'Thu', activities: 4, points: 100 },
    { day: 'Fri', activities: 6, points: 150 },
    { day: 'Sat', activities: 1, points: 25 },
    { day: 'Sun', activities: 3, points: 75 }
  ];

  const aiSuggestions = [
    {
      icon: '🌱',
      title: 'Plant Care Reminder',
      message: 'Your virtual Tulsi plant needs watering! Check the SohnaPind guide.',
      action: 'View Plant'
    },
    {
      icon: '🎯',
      title: 'Weekly Challenge',
      message: 'You\'re close to completing the "Tree Planter" challenge. 3 more activities to go!',
      action: 'View Challenge'
    },
    {
      icon: '📚',
      title: 'Learning Suggestion',
      message: 'Based on your interests, try our new "Renewable Energy" quiz module.',
      action: 'Start Quiz'
    }
  ];

  // Handler functions for profile settings
  const handleProfileSettingsClick = () => {
    setShowProfileSettings(true);
    setShowProfileDropdown(false);
  };

  const handleProfileSave = (profileData) => {
    if (onUpdateProfile) {
      onUpdateProfile(profileData);
    }
    setShowProfileSettings(false);
  };

  const handleProfileClose = () => {
    setShowProfileSettings(false);
  };

  return (
    <div className="student-dashboard">
      {/* Floating leaves animation */}
      <div className="floating-elements">
        <div className="leaf-float" style={{ top: '10%', left: '5%' }}>🍃</div>
        <div className="leaf-float-delayed" style={{ top: '20%', right: '10%' }}>🌿</div>
        <div className="leaf-float" style={{ top: '70%', left: '8%' }}>🌱</div>
        <div className="leaf-float-delayed" style={{ top: '60%', right: '5%' }}>🍂</div>
      </div>

      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <Logo 
              size="medium" 
              onClick={onReturnToLanding} 
            />
            
            <div className="user-info">
              <div className="welcome-message">
                <h2>Welcome back, {studentData.name}! 🌟</h2>
                <p>Ready to make the world greener today?</p>
              </div>
              <div className="user-actions">
                <div className="points-display">
                  <span className="points-icon">🍃</span>
                  <span className="points-count">{studentData.points}</span>
                </div>
                
                {/* Profile Dropdown */}
                <div className="profile-section" ref={profileRef}>
                  <div 
                    className="profile-avatar" 
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  >
                    <div className="avatar-image">
                      👤
                    </div>
                    <div className="avatar-status">🟢</div>
                  </div>
                  
                  {showProfileDropdown && (
                    <div className="profile-dropdown">
                      <div className="dropdown-header">
                        <div className="dropdown-avatar">👤</div>
                        <div className="dropdown-info">
                          <h4>{studentData.name}</h4>
                          <p>{user?.email}</p>
                          <span className="user-level">{studentData.level}</span>
                        </div>
                      </div>
                      
                      <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={handleProfileSettingsClick}>
                          <span className="item-icon">👤</span>
                          <span>Profile Settings</span>
                        </button>
                        <button className="dropdown-item">
                          <span className="item-icon">🎯</span>
                          <span>My Achievements</span>
                        </button>
                        <button className="dropdown-item">
                          <span className="item-icon">📊</span>
                          <span>Progress Report</span>
                        </button>
                        <button className="dropdown-item">
                          <span className="item-icon">⚙️</span>
                          <span>Preferences</span>
                        </button>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item logout-item" onClick={onLogout}>
                          <span className="item-icon">🚪</span>
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="container">
          {/* Quick Stats */}
          <section className="stats-overview">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🏆</div>
                <div className="stat-info">
                  <h3>{studentData.level}</h3>
                  <p>Current Level</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <h3>{studentData.badges}</h3>
                  <p>Badges Earned</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🌳</div>
                <div className="stat-info">
                  <h3>{studentData.treesPlanted}</h3>
                  <p>Trees Planted</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🌍</div>
                <div className="stat-info">
                  <h3>{studentData.co2Saved}</h3>
                  <p>CO₂ Saved</p>
                </div>
              </div>
              <div className="stat-card streak">
                <div className="stat-icon">🔥</div>
                <div className="stat-info">
                  <h3>{studentData.currentStreak} days</h3>
                  <p>Current Streak</p>
                </div>
              </div>
            </div>
          </section>

          {/* Main Dashboard Grid */}
          <div className="dashboard-grid">
            {/* Quick Games */}
            <section className="games-section">
              <div className="section-header">
                <h2>🎮 Quick Games</h2>
                <p>Jump into your favorite eco-games!</p>
              </div>
              <div className="games-grid">
                {quickGames.map(game => (
                  <div key={game.id} className={`game-card ${game.status}`}>
                    <div className="game-header">
                      <div className="game-icon">{game.icon}</div>
                      <span className={`difficulty-badge ${game.difficulty.toLowerCase()}`}>
                        {game.difficulty}
                      </span>
                    </div>
                    <h3>{game.title}</h3>
                    <p>{game.description}</p>
                    <div className="game-stats">
                      <span>⭐ {game.points} points</span>
                    </div>
                    <button 
                      className={`play-btn ${game.status === 'available' ? 'available' : 'disabled'}`}
                      disabled={game.status !== 'available'}
                    >
                      {game.status === 'available' ? 'Play Now' : 'Coming Soon'}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Sohna Pind */}
            <section className="ai-suggestions">
              <div className="section-header">
                <h2>🌱 Sohna Pind</h2>
                <p>Personalized recommendations just for you</p>
              </div>
              <div className="suggestions-list">
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className="suggestion-card">
                    <div className="suggestion-icon">{suggestion.icon}</div>
                    <div className="suggestion-content">
                      <h4>{suggestion.title}</h4>
                      <p>{suggestion.message}</p>
                    </div>
                    <button className="suggestion-action">
                      {suggestion.action}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Progress and Achievements */}
          <div className="bottom-grid">
            {/* Weekly Progress */}
            <section className="progress-section">
              <div className="section-header">
                <h2>📊 This Week's Progress</h2>
                <p>Keep up the great work!</p>
              </div>
              <div className="progress-chart">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="progress-day">
                    <div className="day-label">{day.day}</div>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar-fill" 
                        style={{ height: `${(day.points / 150) * 100}%` }}
                      ></div>
                    </div>
                    <div className="day-stats">
                      <div className="activities">{day.activities}</div>
                      <div className="points">{day.points}pt</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Achievements */}
            <section className="achievements-section">
              <div className="section-header">
                <h2>🏅 Recent Achievements</h2>
                <p>Celebrate your eco-victories!</p>
              </div>
              <div className="achievements-list">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="achievement-item">
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-info">
                      <h4>{achievement.name}</h4>
                      <span className="achievement-date">{achievement.date}</span>
                    </div>
                    <div className="achievement-glow"></div>
                  </div>
                ))}
              </div>
              <button className="view-all-btn">
                View All Achievements
              </button>
            </section>
          </div>

          {/* Quick Actions */}
          <section className="quick-actions">
            <div className="actions-grid">
              <button className="action-card">
                <div className="action-icon">🌱</div>
                <span>Plant Garden</span>
              </button>
              <button className="action-card">
                <div className="action-icon">🎯</div>
                <span>Challenges</span>
              </button>
              <button className="action-card">
                <div className="action-icon">📚</div>
                <span>Learning Hub</span>
              </button>
              <button className="action-card">
                <div className="action-icon">🤖</div>
                <span>AI Assistant</span>
              </button>
              <button className="action-card">
                <div className="action-icon">🌍</div>
                <span>Community</span>
              </button>
              <button className="action-card">
                <div className="action-icon">🏆</div>
                <span>Leaderboard</span>
              </button>
            </div>
          </section>
        </div>
      </main>
      
      {/* Profile Settings Modal */}
      <ProfileSettings 
        user={user}
        isOpen={showProfileSettings}
        onClose={handleProfileClose}
        onSave={handleProfileSave}
      />
    </div>
  );
};

export default StudentDashboard;