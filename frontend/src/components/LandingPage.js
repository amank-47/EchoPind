import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import Logo from './Logo';
import RevolvingGlobe from './RevolvingGlobe';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { useAuth } from '../contexts/AuthContext';

const LandingPage = () => {
  const { login, register, isLoading, error } = useAuth();
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [registrationData, setRegistrationData] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: 'student',
    phone: '',
    school: '',
    grade: ''
  });
  const [loginError, setLoginError] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  // Scroll to top when login form is shown or hidden
  useScrollToTop(showLoginForm || showRegistrationForm, { behavior: 'smooth' });

  const userTypes = [
    {
      type: 'student',
      title: 'Student',
      icon: '👨‍🎓',
      description: 'Play games, earn badges, and learn sustainably.',
      features: [
        '🎮 Interactive Games',
        '🏆 Achievement System',
        '🤖 AI Assistant'
      ],
      color: 'student'
    },
    {
      type: 'teacher',
      title: 'Teacher',
      icon: '👨‍🏫',
      description: 'Engage students with eco-education tools.',
      features: [
        '📚 Curriculum Integration',
        '📈 Progress Reports',
        '👥 Classroom Management'
      ],
      color: 'teacher'
    },
    {
      type: 'admin',
      title: 'Admin',
      icon: '👨‍💼',
      description: 'Manage platform and institutional programs.',
      features: [
        '🏢 Institution Management',
        '📊 Analytics Dashboard',
        '👥 User Management'
      ],
      color: 'admin'
    }
  ];

  const handleUserTypeSelect = (userType) => {
    setSelectedUserType(userType);
    setRegistrationData(prev => ({ ...prev, userType }));
    setShowLoginForm(true);
    setShowRegistrationForm(false);
    setLoginError('');
    setRegistrationError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!credentials.email || !credentials.password) {
      setLoginError('Please enter both email and password');
      return;
    }

    const result = await login({
      email: credentials.email,
      password: credentials.password
    });

    if (!result.success) {
      setLoginError(result.message || 'Login failed. Please try again.');
    }
    // If successful, authentication context will handle the state change
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegistrationError('');
    
    if (!registrationData.fullName || !registrationData.email || !registrationData.password) {
      setRegistrationError('Please fill in all required fields');
      return;
    }

    if (registrationData.password.length < 6) {
      setRegistrationError('Password must be at least 6 characters long');
      return;
    }

    const result = await register(registrationData);

    if (!result.success) {
      setRegistrationError(result.message || 'Registration failed. Please try again.');
    }
    // If successful, authentication context will handle the state change
  };

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleRegistrationInputChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value
    });
  };

  const goBack = () => {
    setShowLoginForm(false);
    setShowRegistrationForm(false);
    setSelectedUserType(null);
    setCredentials({ email: '', password: '' });
    setRegistrationData({
      fullName: '',
      email: '',
      password: '',
      userType: 'student',
      phone: '',
      school: '',
      grade: ''
    });
    setLoginError('');
    setRegistrationError('');
  };

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
    setShowRegistrationForm(!showRegistrationForm);
    setLoginError('');
    setRegistrationError('');
  };

  const handleProfileSignIn = () => {
    // Show login form section or redirect to sign in
    // For now, we'll scroll to the user selection section
    const userTypesSection = document.querySelector('.user-types-section');
    if (userTypesSection) {
      userTypesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProfileSignUp = () => {
    // Show registration form or redirect to sign up
    // For now, we'll scroll to the user selection section
    const userTypesSection = document.querySelector('.user-types-section');
    if (userTypesSection) {
      userTypesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRoleBasedSignIn = (role) => {
    // Directly navigate to login form for the selected role
    setSelectedUserType(role);
    setShowLoginForm(true);
  };

  const handleRoleBasedSignUp = (role) => {
    // For now, treat signup the same as signin - can be extended later
    // In a real app, this would show a registration form
    setSelectedUserType(role);
    setShowLoginForm(true);
  };

  const handleAboutUs = () => {
    // Scroll to the user types section where student, teacher, admin options are present
    const userTypesSection = document.querySelector('.user-types-section');
    if (userTypesSection) {
      userTypesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartAdventure = () => {
    // Show the user type selection section for login
    const userTypesSection = document.querySelector('.user-types-section');
    if (userTypesSection) {
      userTypesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smart icon positioning algorithm
  const generateIconPositions = () => {
    const icons = [
      // Nature Icons - First Layer
      { emoji: '🍃', class: 'leaf-float' },
      { emoji: '🌿', class: 'leaf-float-delayed' },
      { emoji: '🍂', class: 'leaf-float' },
      { emoji: '🌱', class: 'leaf-float-delayed' },
      { emoji: '🍀', class: 'leaf-float' },
      { emoji: '🌸', class: 'leaf-float-delayed' },
      { emoji: '🌺', class: 'leaf-float' },
      { emoji: '🌻', class: 'leaf-float-delayed' },
      
      // Additional Nature Icons - Second Layer
      { emoji: '🌲', class: 'leaf-float-slow' },
      { emoji: '🦋', class: 'leaf-float-fast' },
      { emoji: '🌳', class: 'leaf-float-slow' },
      { emoji: '🐝', class: 'leaf-float-fast' },
      { emoji: '🌾', class: 'leaf-float-slow' },
      { emoji: '🦜', class: 'leaf-float-fast' },
      
      // Educational Icons - Third Layer
      { emoji: '📚', class: 'icon-float' },
      { emoji: '🎓', class: 'icon-float-delayed' },
      { emoji: '💡', class: 'icon-float' },
      { emoji: '🌍', class: 'icon-float-delayed' },
      { emoji: '⚡', class: 'icon-float' },
      { emoji: '🔬', class: 'icon-float-delayed' },
      { emoji: '🧪', class: 'icon-float' },
      
      // Environmental Icons - Fourth Layer
      { emoji: '♻️', class: 'eco-float' },
      { emoji: '🌊', class: 'eco-float-delayed' },
      { emoji: '☀️', class: 'eco-float' },
      { emoji: '🌙', class: 'eco-float-delayed' },
      { emoji: '⭐', class: 'eco-float' },
      { emoji: '🌈', class: 'eco-float-delayed' },
      { emoji: '☁️', class: 'eco-float' },
      
      // Stars Layer - Fifth Layer
      { emoji: '⭐', class: 'star-float' },
      { emoji: '🌟', class: 'star-float-delayed' },
      { emoji: '✨', class: 'star-float-fast' },
      { emoji: '💫', class: 'star-float' },
      { emoji: '⭐', class: 'star-float-slow' },
      { emoji: '🌟', class: 'star-float-delayed' },
      { emoji: '✨', class: 'star-float' },
      { emoji: '💫', class: 'star-float-fast' },
      { emoji: '⭐', class: 'star-float-delayed' },
      { emoji: '🌟', class: 'star-float-slow' },
      { emoji: '✨', class: 'star-float' },
      { emoji: '💫', class: 'star-float-delayed' },
      { emoji: '⭐', class: 'star-float-fast' },
      { emoji: '🌟', class: 'star-float' },
      { emoji: '✨', class: 'star-float-slow' },
      { emoji: '💫', class: 'star-float-delayed' }
    ];
    
    // Detect screen size for responsive globe radius
    const getScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 480) return 'mobile';
      if (width <= 768) return 'tablet';
      return 'desktop';
    };
    
    const screenSize = getScreenSize();
    
    const positions = [];
    // Adjust parameters based on screen size
    const minDistance = screenSize === 'mobile' ? 8 : screenSize === 'tablet' ? 10 : 12;
    const centerX = 50; // Globe center X
    const centerY = 50; // Globe center Y
    // Responsive globe radius based on globe CSS sizes:
    // Desktop: 400px, Tablet: 300px, Mobile: 250px
    const globeRadius = screenSize === 'mobile' ? 18 : screenSize === 'tablet' ? 20 : 25;
    
    // Define safe zones - avoid center and ensure good distribution
    const zones = [
      // Top zones
      { x: [5, 25], y: [5, 25] },
      { x: [75, 95], y: [5, 25] },
      { x: [25, 45], y: [8, 28] },
      { x: [55, 75], y: [8, 28] },
      
      // Side zones
      { x: [2, 22], y: [35, 55] },
      { x: [78, 98], y: [35, 55] },
      { x: [2, 18], y: [60, 80] },
      { x: [82, 98], y: [60, 80] },
      
      // Bottom zones
      { x: [5, 25], y: [75, 95] },
      { x: [75, 95], y: [75, 95] },
      { x: [25, 45], y: [72, 92] },
      { x: [55, 75], y: [72, 92] },
      
      // Additional scattered zones
      { x: [30, 50], y: [5, 15] },
      { x: [50, 70], y: [5, 15] },
      { x: [10, 30], y: [25, 35] },
      { x: [70, 90], y: [25, 35] },
      { x: [5, 15], y: [85, 95] },
      { x: [85, 95], y: [85, 95] },
      { x: [35, 45], y: [85, 95] },
      { x: [55, 65], y: [85, 95] }
    ];
    
    icons.forEach((icon, index) => {
      let position;
      let attempts = 0;
      const maxAttempts = 100;
      
      do {
        // Pick a random zone, with bias towards zones that match icon index for better distribution
        const zoneIndex = (index + Math.floor(Math.random() * 3)) % zones.length;
        const zone = zones[zoneIndex];
        
        // Generate random position within the zone
        const x = zone.x[0] + Math.random() * (zone.x[1] - zone.x[0]);
        const y = zone.y[0] + Math.random() * (zone.y[1] - zone.y[0]);
        
        // Check distance from globe center
        const distanceFromGlobe = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );
        
        // Check distance from other icons
        const tooClose = positions.some(pos => {
          const distance = Math.sqrt(
            Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2)
          );
          return distance < minDistance;
        });
        
        if (distanceFromGlobe > globeRadius && !tooClose) {
          position = { x, y };
        }
        
        attempts++;
      } while (!position && attempts < maxAttempts);
      
      // Fallback: use a distant corner if we couldn't find a good spot
      if (!position) {
        const corners = [
          { x: 5, y: 5 }, { x: 95, y: 5 }, { x: 5, y: 95 }, { x: 95, y: 95 }
        ];
        position = corners[index % corners.length];
      }
      
      positions.push({ ...position, ...icon });
    });
    
    return positions;
  };
  
  // Generate positions and handle responsive updates
  const [iconPositions, setIconPositions] = useState(() => generateIconPositions());
  
  // Regenerate positions on window resize for responsive behavior
  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIconPositions(generateIconPositions());
      }, 300); // Debounce resize events
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Revolving Globe Background */}
      <RevolvingGlobe />
      
      {/* Smart Floating Icons Animation */}
      <div className="floating-leaves">
        {iconPositions.map((icon, index) => (
          <div 
            key={index}
            className={icon.class}
            style={{ 
              top: `${icon.y}%`, 
              left: `${icon.x}%`,
              position: 'absolute'
            }}
          >
            {icon.emoji}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="landing-header">
        <div className="container">
          <div className="header-content">
            {/* Header is now empty - logo moved to hero section */}
          </div>
        </div>
      </header>

      <main className="landing-main">
        <div className="container">
          {!showLoginForm && !showRegistrationForm ? (
            <>
              {/* Hero Section */}
              <section className="hero-section">
                <div className="hero-content-centered">
                  <div className="hero-logo-section">
                    <Logo size="extra-large" showText={true} clickable={false} />
                  </div>
                  <p className="hero-description">
                    Embark on epic environmental adventures through gamified learning, AI-powered guidance, and community collaboration. Your greatest eco-learning journey awaits in nature's realm.
                  </p>
                  <div className="hero-actions">
                    <button className="btn btn-primary btn-large" onClick={handleStartAdventure}>
                      🎮 Start Adventure
                    </button>
                    <button className="btn btn-secondary btn-large">
                      🎬 Watch Preview
                    </button>
                  </div>
                </div>
              </section>

              {/* User Type Selection */}
              <section className="user-types-section">
                <div className="section-header text-center">
                  <h2>Choose Your Role</h2>
                  <p>Select how you'd like to join our eco-village community</p>
                </div>

                <div className="user-types-grid">
                  {userTypes.map((userType, index) => (
                    <div 
                      key={userType.type}
                      className={`user-type-card ${userType.color}`}
                      onClick={() => handleUserTypeSelect(userType.type)}
                    >
                      <div className="card-header">
                        <div className="user-icon">{userType.icon}</div>
                        <h3>{userType.title}</h3>
                      </div>
                      
                      <p className="user-description">{userType.description}</p>
                      
                      <div className="features-list">
                        {userType.features.map((feature, idx) => (
                          <div key={idx} className="feature-item">
                            {feature}
                          </div>
                        ))}
                      </div>
                      
                      <button className="select-btn">
                        Login as {userType.title}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : showLoginForm ? (
            /* Login Form */
            <section className="login-form-section">
              <div className="login-container">
                <button className="back-btn" onClick={goBack}>
                  ← Back to Selection
                </button>
                
                <div className="login-header">
                  <div className="selected-user-icon">
                    {userTypes.find(u => u.type === selectedUserType)?.icon}
                  </div>
                  <h2>
                    {userTypes.find(u => u.type === selectedUserType)?.title} Login
                  </h2>
                  <p>Enter your credentials to access your EchoPind account</p>
                </div>

                {loginError && (
                  <div className="error-message" style={{
                    background: '#fee2e2',
                    border: '1px solid #f87171',
                    color: '#dc2626',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    {loginError}
                  </div>
                )}

                <form className="login-form" onSubmit={handleLogin}>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={credentials.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <button type="submit" className="login-btn" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login to EchoPind'}
                  </button>
                </form>

                <div className="form-switch">
                  <p>Don't have an account? <button type="button" className="switch-btn" onClick={toggleForm}>Register here</button></p>
                </div>

                <div className="demo-credentials">
                  <h4>For Testing - Demo Credentials:</h4>
                  <p><strong>Email:</strong> test@echopind.com</p>
                  <p><strong>Password:</strong> test123</p>
                  <p><em>You can also register a new account</em></p>
                </div>
              </div>
            </section>
          ) : (
            /* Registration Form */
            <section className="login-form-section">
              <div className="login-container">
                <button className="back-btn" onClick={goBack}>
                  ← Back to Selection
                </button>
                
                <div className="login-header">
                  <div className="selected-user-icon">
                    {userTypes.find(u => u.type === selectedUserType)?.icon}
                  </div>
                  <h2>
                    {userTypes.find(u => u.type === selectedUserType)?.title} Registration
                  </h2>
                  <p>Create your EchoPind account</p>
                </div>

                {registrationError && (
                  <div className="error-message" style={{
                    background: '#fee2e2',
                    border: '1px solid #f87171',
                    color: '#dc2626',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    {registrationError}
                  </div>
                )}

                <form className="login-form" onSubmit={handleRegister}>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={registrationData.fullName}
                      onChange={handleRegistrationInputChange}
                      placeholder="Enter your full name"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="reg-email">Email Address *</label>
                    <input
                      type="email"
                      id="reg-email"
                      name="email"
                      value={registrationData.email}
                      onChange={handleRegistrationInputChange}
                      placeholder="Enter your email"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="reg-password">Password * (minimum 6 characters)</label>
                    <input
                      type="password"
                      id="reg-password"
                      name="password"
                      value={registrationData.password}
                      onChange={handleRegistrationInputChange}
                      placeholder="Enter your password"
                      required
                      minLength="6"
                      disabled={isLoading}
                    />
                  </div>

                  {selectedUserType === 'student' && (
                    <>
                      <div className="form-group">
                        <label htmlFor="school">School</label>
                        <input
                          type="text"
                          id="school"
                          name="school"
                          value={registrationData.school}
                          onChange={handleRegistrationInputChange}
                          placeholder="Enter your school name"
                          disabled={isLoading}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="grade">Grade</label>
                        <input
                          type="text"
                          id="grade"
                          name="grade"
                          value={registrationData.grade}
                          onChange={handleRegistrationInputChange}
                          placeholder="Enter your grade/class"
                          disabled={isLoading}
                        />
                      </div>
                    </>
                  )}

                  <div className="form-group">
                    <label htmlFor="phone">Phone (optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={registrationData.phone}
                      onChange={handleRegistrationInputChange}
                      placeholder="Enter your phone number"
                      disabled={isLoading}
                    />
                  </div>

                  <button type="submit" className="login-btn" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </form>

                <div className="form-switch">
                  <p>Already have an account? <button type="button" className="switch-btn" onClick={toggleForm}>Login here</button></p>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <p>&copy; 2024 EchoPind. Making environmental education fun and accessible for everyone.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;