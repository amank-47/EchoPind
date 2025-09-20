import React, { createContext, useState, useEffect, useContext } from 'react';
import { tokenManager } from '../services/api';

// Create the auth context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if we have user data in localStorage (no backend)
        const savedUser = tokenManager.getUser();
        if (savedUser) {
          setUser(savedUser);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setError('Authentication check failed');
        setIsAuthenticated(false);
        setUser(null);
        tokenManager.removeTokens();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function (demo mode - no backend)
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);

      // Demo login - accept any credentials
      const demoUser = {
        id: '1',
        email: credentials.email,
        name: credentials.email.split('@')[0],
        fullName: credentials.email.split('@')[0],
        type: 'student',
        userType: 'student'
      };

      setUser(demoUser);
      setIsAuthenticated(true);
      tokenManager.setUser(demoUser);
      
      return { success: true, user: demoUser };
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
      return { success: false, message: err.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function (demo mode - no backend)
  const register = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Demo registration - create user from form data
      const demoUser = {
        id: '1',
        email: userData.email,
        name: userData.name || userData.email.split('@')[0],
        fullName: userData.fullName || userData.name || userData.email.split('@')[0],
        type: userData.userType || 'student',
        userType: userData.userType || 'student'
      };

      setUser(demoUser);
      setIsAuthenticated(true);
      tokenManager.setUser(demoUser);
      
      return { success: true, user: demoUser };
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed');
      return { success: false, message: err.message || 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function (demo mode - no backend)
  const logout = async () => {
    try {
      setIsLoading(true);
      // No API call needed in demo mode
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      tokenManager.removeTokens();
      setIsLoading(false);
    }
  };

  // Update user information
  const updateUser = (userData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
    tokenManager.setUser(userData);
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;