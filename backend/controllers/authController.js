const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/users');

// Configure email transporter
const createEmailTransporter = () => {
    return nodemailer.createTransporter({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation errors',
            errors: errors.array()
        });
    }

    const { name, email, password, role } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        // Create new user
        const user = new User({
            name: name.trim(),
            email: email.toLowerCase(),
            password,
            role
        });

        // Generate email verification token
        const emailVerificationToken = user.generateEmailVerificationToken();
        
        await user.save();

        // Send verification email
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            try {
                const transporter = createEmailTransporter();
                const verificationUrl = `${process.env.CLIENT_URL}/auth/verify-email?token=${emailVerificationToken}`;
                
                await transporter.sendMail({
                    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
                    to: user.email,
                    subject: 'TalentHunt - Verify Your Email',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
                                <h1 style="color: white; margin: 0;">Welcome to TalentHunt!</h1>
                            </div>
                            <div style="padding: 30px; background: #f8f9fa;">
                                <h2 style="color: #333;">Hi ${user.name},</h2>
                                <p style="color: #666; font-size: 16px; line-height: 1.6;">
                                    Thank you for joining TalentHunt! Please verify your email address to complete your registration.
                                </p>
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="${verificationUrl}" 
                                       style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                              color: white; padding: 15px 30px; text-decoration: none; 
                                              border-radius: 8px; font-weight: bold; display: inline-block;">
                                        Verify Email Address
                                    </a>
                                </div>
                                <p style="color: #888; font-size: 14px;">
                                    This link will expire in 24 hours. If you didn't create an account, please ignore this email.
                                </p>
                            </div>
                        </div>
                    `
                });
            } catch (emailError) {
                console.error('Email sending failed:', emailError);
                // Don't fail registration if email fails
            }
        }

        res.status(201).json({
            success: true,
            message: 'Registration successful! Please check your email to verify your account.',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isEmailVerified: user.isEmailVerified
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation errors',
            errors: errors.array()
        });
    }

    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check if account is locked
        if (user.isLocked) {
            return res.status(423).json({
                success: false,
                message: 'Account is temporarily locked due to too many failed login attempts'
            });
        }

        // Verify password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const token = user.generateAuthToken();

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
                profilePicture: user.profilePicture,
                lastLogin: user.lastLogin
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
});

// @desc    Verify email
// @route   GET /api/auth/verify-email
// @access  Public
const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.query;

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Invalid verification token'
            });
        }

        // Check if token matches and hasn't expired
        if (user.emailVerificationToken !== token || 
            !user.emailVerificationExpires || 
            user.emailVerificationExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired verification token'
            });
        }

        // Update user
        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        res.json({
            success: true,
            message: 'Email verified successfully!'
        });

    } catch (error) {
        console.error('Email verification error:', error);
        res.status(400).json({
            success: false,
            message: 'Invalid or expired verification token'
        });
    }
});

// @desc    Request password reset
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No user found with this email address'
            });
        }

        // Generate reset token
        const resetToken = user.generatePasswordResetToken();
        await user.save();

        // Send reset email
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            try {
                const transporter = createEmailTransporter();
                const resetUrl = `${process.env.CLIENT_URL}/auth/reset-password?token=${resetToken}`;
                
                await transporter.sendMail({
                    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
                    to: user.email,
                    subject: 'TalentHunt - Reset Your Password',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
                                <h1 style="color: white; margin: 0;">Password Reset Request</h1>
                            </div>
                            <div style="padding: 30px; background: #f8f9fa;">
                                <h2 style="color: #333;">Hi ${user.name},</h2>
                                <p style="color: #666; font-size: 16px; line-height: 1.6;">
                                    You requested a password reset for your TalentHunt account. Click the button below to create a new password.
                                </p>
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="${resetUrl}" 
                                       style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                              color: white; padding: 15px 30px; text-decoration: none; 
                                              border-radius: 8px; font-weight: bold; display: inline-block;">
                                        Reset Password
                                    </a>
                                </div>
                                <p style="color: #888; font-size: 14px;">
                                    This link will expire in 1 hour. If you didn't request this, please ignore this email.
                                </p>
                            </div>
                        </div>
                    `
                });
            } catch (emailError) {
                console.error('Password reset email failed:', emailError);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to send password reset email'
                });
            }
        }

        res.json({
            success: true,
            message: 'Password reset email sent successfully'
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process password reset request'
        });
    }
});

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Invalid reset token'
            });
        }

        // Check if token matches and hasn't expired
        if (user.passwordResetToken !== token || 
            !user.passwordResetExpires || 
            user.passwordResetExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        // Update password
        user.password = newPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        user.loginAttempts = 0;
        user.lockUntil = undefined;
        await user.save();

        res.json({
            success: true,
            message: 'Password reset successful'
        });

    } catch (error) {
        console.error('Password reset error:', error);
        res.status(400).json({
            success: false,
            message: 'Invalid or expired reset token'
        });
    }
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password -passwordResetToken -emailVerificationToken');
    
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    res.json({
        success: true,
        user
    });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    // In a stateless JWT system, we don't need to do anything server-side
    // The client should remove the token from storage
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
});

module.exports = {
    registerUser,
    loginUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
    getCurrentUser,
    logoutUser
};
