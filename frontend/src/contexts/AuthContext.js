import React, { createContext, useState, useEffect, useContext } from 'react';
import { authAPI, tokenManager } from '../services/api';

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

        // Check if we have tokens in localStorage
        const accessToken = tokenManager.getAccessToken();
        if (!accessToken) {
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Verify token with the server
        const { valid, user: userData } = await authAPI.verifyToken();
        
        if (valid) {
          // Get full user data
          const { user: currentUser } = await authAPI.getCurrentUser();
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          // Try refresh token
          const refreshed = await authAPI.refreshToken();
          if (refreshed) {
            const { user: refreshedUser } = await authAPI.getCurrentUser();
            setUser(refreshedUser);
            setIsAuthenticated(true);
          } else {
            // Refresh failed, logout
            setIsAuthenticated(false);
            setUser(null);
            tokenManager.removeTokens();
          }
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

  // Login function
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);

      const { success, data, status } = await authAPI.login(credentials);
      
      if (success) {
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true, user: data.user };
      } else {
        setError(data.message || 'Login failed');
        return { 
          success: false, 
          message: data.message || 'Login failed', 
          status 
        };
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
      return { success: false, message: err.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);

      const { success, data, status } = await authAPI.register(userData);
      
      if (success) {
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true, user: data.user };
      } else {
        setError(data.message || 'Registration failed');
        return { 
          success: false, 
          message: data.message || 'Registration failed',
          status,
          details: data.details
        };
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed');
      return { success: false, message: err.message || 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      await authAPI.logout();
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