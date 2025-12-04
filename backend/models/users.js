const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        default: 'beginner'
    },
    yearsOfExperience: {
        type: Number,
        default: 0
    },
    lastUsed: {
        type: Date,
        default: Date.now
    }
});

const interestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['technical', 'business', 'design', 'other'],
        default: 'other'
    },
    description: {
        type: String,
        trim: true
    },
    level: {
        type: String,
        enum: ['curious', 'hobbyist', 'enthusiast', 'passionate'],
        default: 'curious'
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['student', 'mentor', 'admin'],
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    lastLogin: Date,
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: Date,
    skills: [{
        name: String,
        level: String,
        _id: mongoose.Schema.Types.ObjectId
    }],
    interests: [{
        name: String,
        category: {
            type: String,
            enum: ['technical', 'business', 'design', 'other']
        },
        level: {
            type: String,
            enum: ['curious', 'hobbyist', 'enthusiast', 'passionate']
        },
        description: String,
        _id: mongoose.Schema.Types.ObjectId
    }],
    bio: {
        type: String,
        trim: true,
        maxLength: 500
    },
    profilePicture: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    preferences: {
        notifications: {
            email: { type: Boolean, default: true },
            push: { type: Boolean, default: true }
        },
        privacy: {
            showEmail: { type: Boolean, default: false },
            showProfile: { type: Boolean, default: true }
        }
    }
}, { timestamps: true });

// Virtual for checking if account is locked
userSchema.virtual('isLocked').get(function() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    if (this.isLocked) {
        throw new Error('Account is temporarily locked due to too many failed login attempts');
    }
    
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    
    if (!isMatch) {
        this.loginAttempts += 1;
        
        // Lock account after 5 failed attempts for 30 minutes
        if (this.loginAttempts >= 5) {
            this.lockUntil = Date.now() + 30 * 60 * 1000; // 30 minutes
        }
        
        await this.save();
        return false;
    }
    
    // Reset login attempts on successful login
    if (this.loginAttempts > 0) {
        this.loginAttempts = 0;
        this.lockUntil = undefined;
        this.lastLogin = new Date();
        await this.save();
    }
    
    return true;
};

// Generate JWT token
userSchema.methods.generateAuthToken = function() {
    const payload = {
        id: this._id,
        email: this.email,
        role: this.role,
        name: this.name
    };
    
    return jwt.sign(payload, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRE || '7d' 
    });
};

// Generate email verification token
userSchema.methods.generateEmailVerificationToken = function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    this.emailVerificationToken = token;
    this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    return token;
};

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    this.passwordResetToken = token;
    this.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
