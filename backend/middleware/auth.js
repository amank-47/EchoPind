const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate JWT tokens
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : null;

    if (!token) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Invalid token or user not found'
      });
    }

    // Add user to request object
    req.user = {
      userId: user._id,
      email: user.email,
      userType: user.userType,
      fullName: user.fullName,
      isActive: user.isActive
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Invalid token'
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Token expired'
      });
    } else {
      console.error('Authentication error:', error);
      return res.status(500).json({
        error: 'Internal server error',
        message: 'Authentication failed'
      });
    }
  }
};

// Middleware to authorize based on user types
const authorize = (...userTypes) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'User not authenticated'
      });
    }

    if (!userTypes.includes(req.user.userType)) {
      return res.status(403).json({
        error: 'Access forbidden',
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

// Middleware to verify refresh token
const verifyRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Refresh token is required'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    // Find user with this refresh token
    const user = await User.findByRefreshToken(refreshToken);
    if (!user || !user.isActive) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Invalid refresh token'
      });
    }

    req.user = user;
    req.refreshToken = refreshToken;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Invalid refresh token'
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Access denied',
        message: 'Refresh token expired'
      });
    } else {
      console.error('Refresh token verification error:', error);
      return res.status(500).json({
        error: 'Internal server error',
        message: 'Token verification failed'
      });
    }
  }
};

// Optional authentication middleware (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : null;

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (user && user.isActive) {
      req.user = {
        userId: user._id,
        email: user.email,
        userType: user.userType,
        fullName: user.fullName,
        isActive: user.isActive
      };
    } else {
      req.user = null;
    }

    next();
  } catch (error) {
    // If there's an error, just set user to null and continue
    req.user = null;
    next();
  }
};

module.exports = {
  authenticateToken,
  authorize,
  verifyRefreshToken,
  optionalAuth
};