const mongoose = require('mongoose');

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
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'mentor'],
        required: true
    },
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
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
