import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Hero Section - Eco Village */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Welcome to <span className="text-yellow">EchoPind</span>
                <br />
                Your Digital Eco-Village! 🌱
              </h1>
              <p className="hero-description">
                Join our gamified environmental education platform where learning meets fun! 
                Explore, learn, and make a real difference in our virtual eco-village while 
                developing sustainable habits for the real world.
              </p>
              <div className="hero-actions">
                <Link to="/learn" className="btn btn-primary">
                  🎮 Start Learning
                </Link>
                <Link to="/community" className="btn btn-secondary">
                  🌍 Join Community
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="village-scene">
                <div className="mountain">🏔️</div>
                <div className="trees">🌳🌲🌳</div>
                <div className="houses">🏘️</div>
                <div className="river">🌊</div>
                <div className="garden">🌻🌺🌸</div>
                <div className="solar-panels">☀️</div>
                <div className="wind-turbine">💨</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section bg-light-green">
        <div className="container">
          <div className="section-header text-center">
            <h2>Explore Our Eco-Village Features</h2>
            <p>Discover interactive ways to learn about environmental sustainability</p>
          </div>

          <div className="features-grid grid grid-3">
            {/* Gamified Learning */}
            <div className="feature-card card">
              <div className="feature-icon">🎯</div>
              <h3>Gamified Learning</h3>
              <p>Interactive quizzes, challenges, and games that make environmental education fun and engaging.</p>
              <ul className="feature-list">
                <li>🧩 Environmental puzzles</li>
                <li>🏆 Weekly challenges</li>
                <li>📊 Progress tracking</li>
                <li>⚡ Quick quizzes</li>
              </ul>
              <Link to="/learn" className="btn btn-primary">Explore Games</Link>
            </div>

            {/* AI Features */}
            <div className="feature-card card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Learning</h3>
              <p>Get personalized guidance with our SohnaPind plantation assistant and eco-friendly AI chatbot.</p>
              <ul className="feature-list">
                <li>🌱 Plant care guidance</li>
                <li>💬 24/7 AI assistant</li>
                <li>📈 Personalized tips</li>
                <li>🔍 Smart recommendations</li>
              </ul>
              <Link to="/ai-features" className="btn btn-primary">Try AI Assistant</Link>
            </div>

            {/* Community Hub */}
            <div className="feature-card card">
              <div className="feature-icon">🌍</div>
              <h3>Community Action</h3>
              <p>Connect with fellow eco-warriors, report local issues, and collaborate on environmental projects.</p>
              <ul className="feature-list">
                <li>📢 Issue reporting</li>
                <li>🤝 Project collaboration</li>
                <li>💡 Idea sharing</li>
                <li>🎉 Community events</li>
              </ul>
              <Link to="/community" className="btn btn-primary">Join Community</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section section">
        <div className="container">
          <div className="stats-grid grid grid-4">
            <div className="stat-card">
              <div className="stat-icon">👨‍🎓</div>
              <div className="stat-number">15,000+</div>
              <div className="stat-label">Active Learners</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🌱</div>
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Trees Planted (Virtual)</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-number">25,000+</div>
              <div className="stat-label">Challenges Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🌍</div>
              <div className="stat-number">200+</div>
              <div className="stat-label">Schools Connected</div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Preview */}
      <section className="achievements-preview section bg-gradient-green">
        <div className="container">
          <div className="achievements-content">
            <div className="achievements-text">
              <h2 className="text-white">Unlock Amazing Eco-Badges!</h2>
              <p className="text-white">
                Earn special recognition for your environmental achievements and unlock 
                new levels in your eco-learning journey.
              </p>
              <div className="badge-showcase">
                <div className="badge">🌱</div>
                <div className="badge">🌳</div>
                <div className="badge">♻️</div>
                <div className="badge">🏆</div>
                <div className="badge">⭐</div>
              </div>
              <Link to="/achievements" className="btn btn-accent">View All Badges</Link>
            </div>
            <div className="leaderboard-preview">
              <h3 className="text-white">Top Eco-Warriors</h3>
              <div className="top-players">
                <div className="player">
                  <span className="rank">🥇</span>
                  <span className="name">Sarah Green</span>
                  <span className="points">3,250 pts</span>
                </div>
                <div className="player">
                  <span className="rank">🥈</span>
                  <span className="name">Alex Nature</span>
                  <span className="points">2,890 pts</span>
                </div>
                <div className="player">
                  <span className="rank">🥉</span>
                  <span className="name">Maya Earth</span>
                  <span className="points">2,654 pts</span>
                </div>
              </div>
              <Link to="/leaderboard" className="btn btn-secondary">View Leaderboard</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section section">
        <div className="container">
          <div className="cta-content text-center">
            <h2>Ready to Start Your Eco-Journey?</h2>
            <p>Join thousands of students making a difference through fun, interactive environmental education!</p>
            <div className="cta-actions">
              <Link to="/learn" className="btn btn-primary btn-large">
                🚀 Begin Adventure
              </Link>
              <Link to="/ai-features" className="btn btn-accent btn-large">
                🤖 Meet AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;