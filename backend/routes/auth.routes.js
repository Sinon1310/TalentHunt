const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const {
    registerUser,
    loginUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
    getCurrentUser,
    logoutUser
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');
const {
    validateRegister,
    validateLogin,
    validateForgotPassword,
    validateResetPassword,
    handleValidationErrors
} = require('../middleware/validation');

// Rate limiting for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
        success: false,
        message: 'Too many authentication attempts, please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

const strictAuthLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests, please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', 
    authLimiter,
    validateRegister,
    handleValidationErrors,
    registerUser
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', 
    authLimiter,
    validateLogin,
    handleValidationErrors,
    loginUser
);

// @route   GET /api/auth/verify-email
// @desc    Verify user email
// @access  Public
router.get('/verify-email', verifyEmail);

// @route   POST /api/auth/forgot-password
// @desc    Request password reset
// @access  Public
router.post('/forgot-password',
    strictAuthLimiter,
    validateForgotPassword,
    handleValidationErrors,
    forgotPassword
);

// @route   POST /api/auth/reset-password
// @desc    Reset password
// @access  Public
router.post('/reset-password',
    strictAuthLimiter,
    validateResetPassword,
    handleValidationErrors,
    resetPassword
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, getCurrentUser);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', protect, logoutUser);

module.exports = router;
