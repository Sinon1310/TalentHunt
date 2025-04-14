const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    problemStatement: {
        type: String,
        required: true
    },
    testCases: [{
        input: String,
        expectedOutput: String,
        points: Number
    }],
    maxScore: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        required: true,
        enum: ['javascript', 'html', 'python']
    },
    submissions: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        code: String,
        score: Number,
        submittedAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true });

const Test = mongoose.model('Test', testSchema);

module.exports = Test; 