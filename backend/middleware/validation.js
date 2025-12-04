const { body, validationResult } = require('express-validator');

// Validation rules for user registration
const validateRegister = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    
    body('role')
        .isIn(['student', 'mentor'])
        .withMessage('Role must be either student or mentor')
];

// Validation rules for user login
const validateLogin = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

// Validation rules for password reset request
const validateForgotPassword = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail()
];

// Validation rules for password reset
const validateResetPassword = [
    body('token')
        .notEmpty()
        .withMessage('Reset token is required'),
    
    body('newPassword')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

// Validation rules for profile update
const validateProfileUpdate = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    
    body('bio')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Bio must not exceed 500 characters'),
    
    body('skills')
        .optional()
        .isArray()
        .withMessage('Skills must be an array'),
    
    body('skills.*.name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Skill name is required'),
    
    body('skills.*.level')
        .optional()
        .isIn(['beginner', 'intermediate', 'advanced', 'expert'])
        .withMessage('Skill level must be beginner, intermediate, advanced, or expert'),
    
    body('interests')
        .optional()
        .isArray()
        .withMessage('Interests must be an array'),
    
    body('interests.*.name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Interest name is required'),
    
    body('interests.*.category')
        .optional()
        .isIn(['technical', 'business', 'design', 'other'])
        .withMessage('Interest category must be technical, business, design, or other')
];

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

module.exports = {
    validateRegister,
    validateLogin,
    validateForgotPassword,
    validateResetPassword,
    validateProfileUpdate,
    handleValidationErrors
};
