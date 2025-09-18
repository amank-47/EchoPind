const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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

// API request wrapper with automatic token handling
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const accessToken = tokenManager.getAccessToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  };

  // Add authorization header if token exists
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    // Handle token expiry
    if (response.status === 401 && data.message === 'Token expired') {
      const refreshSuccess = await refreshAccessToken();
      if (refreshSuccess) {
        // Retry the original request with new token
        config.headers.Authorization = `Bearer ${tokenManager.getAccessToken()}`;
        const retryResponse = await fetch(url, config);
        return await retryResponse.json();
      } else {
        // Refresh failed, redirect to login
        tokenManager.removeTokens();
        window.location.href = '/';
        return { error: 'Session expired' };
      }
    }

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Refresh access token
const refreshAccessToken = async () => {
  const refreshToken = tokenManager.getRefreshToken();
  
  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });

    if (response.ok) {
      const data = await response.json();
      tokenManager.setTokens(data.tokens.accessToken, data.tokens.refreshToken);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
    return false;
  }
};

// Authentication API calls
export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      tokenManager.setTokens(data.tokens.accessToken, data.tokens.refreshToken);
      tokenManager.setUser(data.user);
    }
    
    return { success: response.ok, data, status: response.status };
  },

  // Login user
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      tokenManager.setTokens(data.tokens.accessToken, data.tokens.refreshToken);
      tokenManager.setUser(data.user);
    }
    
    return { success: response.ok, data, status: response.status };
  },

  // Logout user
  logout: async () => {
    const refreshToken = tokenManager.getRefreshToken();
    
    try {
      await apiRequest('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken })
      });
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      tokenManager.removeTokens();
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      return await apiRequest('/auth/me');
    } catch (error) {
      console.error('Get current user failed:', error);
      throw error;
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      return await apiRequest('/auth/verify');
    } catch (error) {
      console.error('Token verification failed:', error);
      return { valid: false };
    }
  },

  // Refresh token
  refreshToken: async () => {
    return await refreshAccessToken();
  }
};

// User API calls
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    return await apiRequest('/user/profile');
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenManager.getAccessToken()}`
      },
      body: JSON.stringify(profileData)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      tokenManager.setUser(data.user);
    }
    
    return { success: response.ok, data, status: response.status };
  }
};

// Health check
export const healthAPI = {
  check: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'ERROR', message: 'Backend not reachable' };
    }
  }
};

export default { authAPI, userAPI, healthAPI, tokenManager };