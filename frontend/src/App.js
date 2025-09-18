import React, { useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import StudentDashboard from './components/StudentDashboard';
import Logo from './components/Logo';
import { initializeSelectionPrevention } from './preventSelection';
import { useScrollToTop } from './hooks/useScrollToTop';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { userAPI } from './services/api';

// Loading spinner component
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a4d3a 0%, #2d5a3d 25%, #1e3a2e 50%, #0f2419 100%)',
    color: 'white'
  }}>
    <div style={{ textAlign: 'center' }}>
      <Logo size="large" showText={true} clickable={false} />
      <div style={{ 
        marginTop: '2rem', 
        fontSize: '1.2rem',
        opacity: 0.8 
      }}>
        Loading EchoPind...
      </div>
    </div>
  </div>
);

function AppContent() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  // Initialize selection prevention on component mount
  useEffect(() => {
    initializeSelectionPrevention();
  }, []);

  // Scroll to top when authentication state changes
  useScrollToTop(isAuthenticated, { behavior: 'smooth' });

  // Function to update user profile data
  const updateUserProfile = async (profileData) => {
    try {
      const { success, data } = await userAPI.updateProfile(profileData);
      if (!success) {
        console.error('Profile update failed:', data.message);
        alert(data.message || 'Failed to update profile');
      }
      // The user state will be updated automatically by the API call
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleReturnToLanding = async () => {
    await logout();
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      {!isAuthenticated ? (
        <LandingPage />
      ) : (
        <>
          {(user.type === 'student' || user.userType === 'student') && (
            <StudentDashboard 
              user={user} 
              onLogout={logout} 
              onReturnToLanding={handleReturnToLanding}
              onUpdateProfile={updateUserProfile}
            />
          )}
          {(user.type === 'teacher' || user.userType === 'teacher') && (
            <div style={{ 
              background: 'linear-gradient(135deg, #1a4d3a 0%, #2d5a3d 25%, #1e3a2e 50%, #0f2419 100%)',
              minHeight: '100vh',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              position: 'relative'
            }}>
              {/* Header with Logo */}
              <div style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem'
              }}>
                <Logo 
                  size="medium" 
                  onClick={() => handleReturnToLanding()} 
                />
              </div>
              
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                textAlign: 'center', 
                padding: '2rem' 
              }}>
                <Logo size="extra-large" showText={false} clickable={false} style={{ marginBottom: '2rem' }} />
                <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '3rem', color: '#86efac', marginBottom: '1rem' }}>
                  👨‍🏫 Teacher Dashboard
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#d1d5db', marginBottom: '2rem' }}>
                  Welcome, {user?.fullName || user?.name}! The teacher portal is coming soon.
                </p>
                <button 
                  onClick={logout}
                  style={{
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '25px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
          {(user.type === 'admin' || user.userType === 'admin') && (
            <div style={{ 
              background: 'linear-gradient(135deg, #1a4d3a 0%, #2d5a3d 25%, #1e3a2e 50%, #0f2419 100%)',
              minHeight: '100vh',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              position: 'relative'
            }}>
              {/* Header with Logo */}
              <div style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem'
              }}>
                <Logo 
                  size="medium" 
                  onClick={() => handleReturnToLanding()} 
                />
              </div>
              
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                textAlign: 'center', 
                padding: '2rem' 
              }}>
                <Logo size="extra-large" showText={false} clickable={false} style={{ marginBottom: '2rem' }} />
                <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '3rem', color: '#a855f7', marginBottom: '1rem' }}>
                  👨‍💼 Admin Dashboard
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#d1d5db', marginBottom: '2rem' }}>
                  Welcome, {user?.fullName || user?.name}! The admin portal is coming soon.
                </p>
                <button 
                  onClick={logout}
                  style={{
                    background: 'linear-gradient(135deg, #a855f7, #9333ea)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '25px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Main App component wrapped with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
