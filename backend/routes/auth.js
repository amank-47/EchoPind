const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { verifyRefreshToken, authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('userType')
    .isIn(['student', 'teacher', 'admin'])
    .withMessage('Invalid user type')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Please correct the following errors',
      details: errors.array()
    });
  }
  next();
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerValidation, handleValidationErrors, async (req, res) => {
  try {
    const { fullName, email, password, userType, phone, school, grade } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: 'Registration Failed',
        message: 'User with this email already exists'
      });
    }

    // Create user
    const user = new User({
      fullName,
      email,
      password,
      userType: userType || 'student',
      phone: phone || '',
      school: school || '',
      grade: grade || ''
    });

    await user.save();

    // Generate tokens
    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    // Add refresh token to user
    await user.addRefreshToken(refreshToken);
    await user.updateLastLogin();

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
        phone: user.phone,
        school: user.school,
        grade: user.grade,
        createdAt: user.createdAt
      },
      tokens: {
        accessToken,
        refreshToken,
        expiresIn: process.env.JWT_EXPIRE
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Registration Failed',
      message: 'Internal server error during registration'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', loginValidation, handleValidationErrors, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user with password field included
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        error: 'Login Failed',
        message: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        error: 'Login Failed',
        message: 'Account is deactivated'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Login Failed',
        message: 'Invalid credentials'
      });
    }

    // Generate tokens
    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    // Add refresh token to user
    await user.addRefreshToken(refreshToken);
    await user.updateLastLogin();

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        name: user.fullName, // For compatibility
        email: user.email,
        userType: user.userType,
        type: user.userType, // For compatibility
        phone: user.phone,
        address: user.address,
        dateOfBirth: user.dateOfBirth,
        studentId: user.studentId,
        school: user.school,
        grade: user.grade,
        profilePhoto: user.profilePhoto,
        lastLogin: user.lastLogin
      },
      tokens: {
        accessToken,
        refreshToken,
        expiresIn: process.env.JWT_EXPIRE
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login Failed',
      message: 'Internal server error during login'
    });
  }
});

// @route   POST /api/auth/refresh
// @desc    Refresh access token
// @access  Public
router.post('/refresh', verifyRefreshToken, async (req, res) => {
  try {
    const user = req.user;
    const oldRefreshToken = req.refreshToken;

    // Generate new tokens
    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    // Remove old refresh token and add new one
    await user.removeRefreshToken(oldRefreshToken);
    await user.addRefreshToken(refreshToken);

    res.json({
      message: 'Token refreshed successfully',
      tokens: {
        accessToken,
        refreshToken,
        expiresIn: process.env.JWT_EXPIRE
      }
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      error: 'Token Refresh Failed',
      message: 'Internal server error during token refresh'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (single device)
// @access  Private
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        error: 'Logout Failed',
        message: 'Refresh token is required'
      });
    }

    const user = await User.findById(req.user.userId);
    await user.removeRefreshToken(refreshToken);

    res.json({
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: 'Logout Failed',
      message: 'Internal server error during logout'
    });
  }
});

// @route   POST /api/auth/logout-all
// @desc    Logout user from all devices
// @access  Private
router.post('/logout-all', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    await user.removeAllRefreshTokens();

    res.json({
      message: 'Logout from all devices successful'
    });

  } catch (error) {
    console.error('Logout all error:', error);
    res.status(500).json({
      error: 'Logout Failed',
      message: 'Internal server error during logout'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        error: 'User Not Found',
        message: 'User not found'
      });
    }

    res.json({
      user: {
        id: user._id,
        fullName: user.fullName,
        name: user.fullName, // For compatibility
        email: user.email,
        userType: user.userType,
        type: user.userType, // For compatibility
        phone: user.phone,
        address: user.address,
        dateOfBirth: user.dateOfBirth,
        studentId: user.studentId,
        school: user.school,
        grade: user.grade,
        profilePhoto: user.profilePhoto,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/auth/verify
// @desc    Verify token validity
// @access  Private
router.get('/verify', authenticateToken, (req, res) => {
  res.json({
    valid: true,
    user: req.user
  });
});

module.exports = router;