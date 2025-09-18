const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

// Validation middleware for profile updates
const profileUpdateValidation = [
  body('fullName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be between 2 and 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .optional()
    .trim(),
  body('address')
    .optional()
    .trim(),
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date'),
  body('studentId')
    .optional()
    .trim(),
  body('school')
    .optional()
    .trim(),
  body('grade')
    .optional()
    .trim()
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

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authenticateToken, async (req, res) => {
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
    console.error('Get profile error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authenticateToken, profileUpdateValidation, handleValidationErrors, async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      dateOfBirth,
      studentId,
      school,
      grade,
      profilePhoto
    } = req.body;

    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        error: 'User Not Found',
        message: 'User not found'
      });
    }

    // Check if email is being changed and if it already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          error: 'Update Failed',
          message: 'Email already exists'
        });
      }
    }

    // Update fields
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;
    if (dateOfBirth) user.dateOfBirth = new Date(dateOfBirth);
    if (studentId !== undefined) user.studentId = studentId;
    if (school !== undefined) user.school = school;
    if (grade !== undefined) user.grade = grade;
    if (profilePhoto !== undefined) user.profilePhoto = profilePhoto;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
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
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      error: 'Update Failed',
      message: 'Internal server error during profile update'
    });
  }
});

// @route   GET /api/user/all
// @desc    Get all users (Admin only)
// @access  Private (Admin)
router.get('/all', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const userType = req.query.userType;
    const search = req.query.search;

    // Build filter object
    const filter = {};
    if (userType && ['student', 'teacher', 'admin'].includes(userType)) {
      filter.userType = userType;
    }
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { school: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    
    const users = await User.find(filter)
      .select('-refreshTokens')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limit);

    res.json({
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/user/:id/status
// @desc    Update user status (Admin only)
// @access  Private (Admin)
router.put('/:id/status', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const { isActive } = req.body;
    const userId = req.params.id;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'isActive must be a boolean value'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: 'User Not Found',
        message: 'User not found'
      });
    }

    user.isActive = isActive;
    await user.save();

    // If deactivating user, remove all their refresh tokens
    if (!isActive) {
      await user.removeAllRefreshTokens();
    }

    res.json({
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
        isActive: user.isActive
      }
    });

  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      error: 'Update Failed',
      message: 'Internal server error during status update'
    });
  }
});

// @route   DELETE /api/user/account
// @desc    Delete user account
// @access  Private
router.delete('/account', authenticateToken, async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Password is required to delete account'
      });
    }

    const user = await User.findById(req.user.userId).select('+password');
    if (!user) {
      return res.status(404).json({
        error: 'User Not Found',
        message: 'User not found'
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Delete Failed',
        message: 'Invalid password'
      });
    }

    // Delete user
    await User.findByIdAndDelete(req.user.userId);

    res.json({
      message: 'Account deleted successfully'
    });

  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      error: 'Delete Failed',
      message: 'Internal server error during account deletion'
    });
  }
});

module.exports = router;