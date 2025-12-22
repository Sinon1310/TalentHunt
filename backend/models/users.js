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
    },
    // Enhanced profile fields
    profile: {
        university: {
            type: String,
            trim: true
        },
        graduationYear: {
            type: Number,
            min: 2020,
            max: 2030
        },
        major: {
            type: String,
            trim: true
        },
        gpa: {
            type: Number,
            min: 0,
            max: 4.0
        },
        location: {
            city: String,
            country: String,
            timezone: String
        },
        workingStyle: {
            type: String,
            enum: ['individual', 'team-oriented', 'leadership', 'flexible'],
            default: 'flexible'
        },
        availability: {
            type: String,
            enum: ['full-time', 'part-time', 'weekends', 'flexible'],
            default: 'flexible'
        },
        experience: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced', 'expert'],
            default: 'beginner'
        },
        github: String,
        linkedin: String,
        portfolio: String,
        resume: String
    },
    // Portfolio projects
    portfolio: [{
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            maxLength: 1000
        },
        technologies: [String],
        imageUrl: String,
        projectUrl: String,
        githubUrl: String,
        sdgs: [Number], // UN SDG numbers (1-17)
        completedDate: Date,
        featured: {
            type: Boolean,
            default: false
        },
        achievements: [String]
    }],
    // Skills assessment results
    skillsAssessment: {
        completed: {
            type: Boolean,
            default: false
        },
        completedAt: Date,
        scores: {
            technical: {
                type: Number,
                min: 0,
                max: 100
            },
            problemSolving: {
                type: Number,
                min: 0,
                max: 100
            },
            teamwork: {
                type: Number,
                min: 0,
                max: 100
            },
            leadership: {
                type: Number,
                min: 0,
                max: 100
            },
            communication: {
                type: Number,
                min: 0,
                max: 100
            },
            creativity: {
                type: Number,
                min: 0,
                max: 100
            }
        },
        strengths: [String],
        improvementAreas: [String],
        recommendedRoles: [String]
    },
    // Achievement system
    achievements: [{
        type: {
            type: String,
            enum: ['competition', 'project', 'skill', 'team', 'mentor', 'leadership'],
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: String,
        dateEarned: {
            type: Date,
            default: Date.now
        },
        badge: String, // URL to badge image
        points: {
            type: Number,
            default: 0
        }
    }],
    // Team preferences for matching
    teamPreferences: {
        preferredTeamSize: {
            type: Number,
            min: 2,
            max: 10,
            default: 4
        },
        preferredRoles: [String],
        workingHours: {
            start: String, // "09:00"
            end: String    // "17:00"
        },
        communicationStyle: {
            type: String,
            enum: ['frequent', 'moderate', 'minimal'],
            default: 'moderate'
        },
        conflictResolution: {
            type: String,
            enum: ['direct', 'diplomatic', 'collaborative', 'avoiding'],
            default: 'collaborative'
        }
    },
    // Onboarding status
    onboarding: {
        completed: {
            type: Boolean,
            default: false
        },
        currentStep: {
            type: Number,
            default: 0
        },
        stepsCompleted: [String],
        skipOnboarding: {
            type: Boolean,
            default: false
        }
    },
    // Profile completeness tracking
    profileCompleteness: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
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

// Calculate profile completeness
userSchema.methods.calculateProfileCompleteness = function() {
    let completeness = 0;
    const totalFields = 20;
    
    // Basic info (5 points each)
    if (this.name) completeness += 5;
    if (this.email) completeness += 5;
    if (this.bio) completeness += 5;
    if (this.profilePicture) completeness += 5;
    
    // Profile details (3 points each)
    if (this.profile?.university) completeness += 3;
    if (this.profile?.major) completeness += 3;
    if (this.profile?.graduationYear) completeness += 3;
    if (this.profile?.location?.city) completeness += 3;
    if (this.profile?.workingStyle) completeness += 3;
    if (this.profile?.availability) completeness += 3;
    
    // Skills and interests (5 points each)
    if (this.skills && this.skills.length > 0) completeness += 5;
    if (this.interests && this.interests.length > 0) completeness += 5;
    
    // Skills assessment (10 points)
    if (this.skillsAssessment?.completed) completeness += 10;
    
    // Portfolio projects (8 points)
    if (this.portfolio && this.portfolio.length > 0) completeness += 8;
    
    // Team preferences (5 points)
    if (this.teamPreferences?.preferredRoles?.length > 0) completeness += 5;
    
    // Social links (2 points each)
    if (this.profile?.github) completeness += 2;
    if (this.profile?.linkedin) completeness += 2;
    if (this.profile?.portfolio) completeness += 2;
    
    // Achievements (5 points)
    if (this.achievements && this.achievements.length > 0) completeness += 5;
    
    // Onboarding completion (10 points)
    if (this.onboarding?.completed) completeness += 10;
    
    return Math.min(completeness, 100);
};

// Update profile completeness before saving
userSchema.pre('save', function(next) {
    if (this.isModified() && !this.isModified('profileCompleteness')) {
        this.profileCompleteness = this.calculateProfileCompleteness();
    }
    next();
});

// Get matching score with another user
userSchema.methods.getMatchingScore = function(otherUser) {
    let score = 0;
    let factors = 0;
    
    // Skills compatibility (40% weight)
    if (this.skills && otherUser.skills) {
        const mySkills = this.skills.map(s => s.name.toLowerCase());
        const theirSkills = otherUser.skills.map(s => s.name.toLowerCase());
        const commonSkills = mySkills.filter(skill => theirSkills.includes(skill));
        const skillCompatibility = commonSkills.length / Math.max(mySkills.length, theirSkills.length);
        score += skillCompatibility * 40;
        factors += 40;
    }
    
    // Working style compatibility (20% weight)
    if (this.profile?.workingStyle && otherUser.profile?.workingStyle) {
        const compatibility = this.profile.workingStyle === otherUser.profile.workingStyle ? 1 : 0.5;
        score += compatibility * 20;
        factors += 20;
    }
    
    // Experience level compatibility (15% weight)
    if (this.profile?.experience && otherUser.profile?.experience) {
        const experienceLevels = ['beginner', 'intermediate', 'advanced', 'expert'];
        const myLevel = experienceLevels.indexOf(this.profile.experience);
        const theirLevel = experienceLevels.indexOf(otherUser.profile.experience);
        const compatibility = 1 - Math.abs(myLevel - theirLevel) / 3;
        score += compatibility * 15;
        factors += 15;
    }
    
    // Availability compatibility (10% weight)
    if (this.profile?.availability && otherUser.profile?.availability) {
        const compatibility = this.profile.availability === otherUser.profile.availability ? 1 : 0.6;
        score += compatibility * 10;
        factors += 10;
    }
    
    // Interests compatibility (15% weight)
    if (this.interests && otherUser.interests) {
        const myInterests = this.interests.map(i => i.name.toLowerCase());
        const theirInterests = otherUser.interests.map(i => i.name.toLowerCase());
        const commonInterests = myInterests.filter(interest => theirInterests.includes(interest));
        const interestCompatibility = commonInterests.length / Math.max(myInterests.length, theirInterests.length);
        score += interestCompatibility * 15;
        factors += 15;
    }
    
    return factors > 0 ? Math.round((score / factors) * 100) : 0;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
