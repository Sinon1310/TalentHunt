const mongoose = require('mongoose');

const competitionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Registered', 'Team Incomplete', 'Completed'],
        required: true
    },
    teamMembers: {
        type: Number,
        required: true
    },
    mentorAssigned: {
        type: Boolean,
        default: false
    },
    participants: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        role: String,
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending'
        }
    }]
}, { timestamps: true });

const Competition = mongoose.model('Competition', competitionSchema);

module.exports = Competition; 