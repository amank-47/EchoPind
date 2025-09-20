// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Token management
const TOKEN_KEY = 'echopind_access_token';
const REFRESH_TOKEN_KEY = 'echopind_refresh_token';
const USER_KEY = 'echopind_user';

export const tokenManager = {
  getAccessToken: () => localStorage.getItem(TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  removeTokens: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('echopind_authenticated'); // Legacy cleanup
  },
  setUser: (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }
};

// API request wrapper with automatic token handling (demo mode - no backend)
// eslint-disable-next-line no-unused-vars
const apiRequest = async (endpoint, options = {}) => {
  // In demo mode, return mock data instead of making API calls
  console.log('Demo mode: API call to', endpoint, 'would be made here');
  
  // Return mock success response
  return { 
    success: true, 
    message: 'Demo mode - no backend available',
    data: null 
  };
};

// Refresh access token (demo mode - no backend)
const refreshAccessToken = async () => {
  // In demo mode, always return true since we don't need real tokens
  console.log('Demo mode: Token refresh would happen here');
  return true;
};

// Authentication API calls (demo mode - no backend)
export const authAPI = {
  // Register new user (demo mode)
  register: async (userData) => {
    console.log('Demo mode: Register would happen here');
    return { success: true, data: { user: userData }, status: 200 };
  },

  // Login user (demo mode)
  login: async (credentials) => {
    console.log('Demo mode: Login would happen here');
    return { success: true, data: { user: credentials }, status: 200 };
  },

  // Logout user (demo mode)
  logout: async () => {
    console.log('Demo mode: Logout would happen here');
    tokenManager.removeTokens();
  },

  // Get current user (demo mode)
  getCurrentUser: async () => {
    const user = tokenManager.getUser();
    return { success: true, user };
  },

  // Verify token (demo mode)
  verifyToken: async () => {
    const user = tokenManager.getUser();
    return { valid: !!user, user };
  },

  // Refresh token (demo mode)
  refreshToken: async () => {
    return await refreshAccessToken();
  }
};

// User API calls (demo mode - no backend)
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    const user = tokenManager.getUser();
    return { success: true, user };
  },

  // Update user profile
  updateProfile: async (profileData) => {
    // In demo mode, just update the stored user data
    const currentUser = tokenManager.getUser();
    const updatedUser = { ...currentUser, ...profileData };
    tokenManager.setUser(updatedUser);
    
    return { success: true, data: { user: updatedUser }, status: 200 };
  }
};

// Health check (demo mode - no backend)
export const healthAPI = {
  check: async () => {
    console.log('Demo mode: Health check would happen here');
    return { status: 'OK', message: 'Demo mode - no backend required' };
  }
};

const apiService = { authAPI, userAPI, healthAPI, tokenManager };
export default apiService;