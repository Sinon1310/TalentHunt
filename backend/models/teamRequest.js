const mongoose = require('mongoose');

const teamRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true
    },
    skills: [{
        type: String
    }],
    competition: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const TeamRequest = mongoose.model('TeamRequest', teamRequestSchema);

module.exports = TeamRequest; 