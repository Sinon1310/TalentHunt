const mongoose = require('mongoose');

const mentorMessageSchema = new mongoose.Schema({
    mentor: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const MentorMessage = mongoose.model('MentorMessage', mentorMessageSchema);

module.exports = MentorMessage; 