const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    maxMembers: {
        type: Number,
        required: true,
        min: 2,
        max: 4
    },
    lookingForMembers: {
        type: Boolean,
        default: true
    },
    skills: [{
        type: String,
        trim: true
    }],
    competitionId: {
        type: String,
        required: true
    },
    leader: {
        type: String,
        required: true
    },
    members: [{
        userId: {
            type: String
        },
        role: {
            type: String,
            default: 'member'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team; 