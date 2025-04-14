const asyncHandler = require('express-async-handler');
const User = require('../models/users');
const mongoose = require('mongoose');

// @desc    Get user profile
// @route   GET /api/profile/:userId
// @access  Public
const getProfile = asyncHandler(async (req, res) => {
    try {
        // For now, using a placeholder user ID since authentication is not implemented
        const userId = '000000000000000000000000';
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({
            error: 'Failed to fetch profile',
            details: error.message
        });
    }
});

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
    try {
        // For now, using a placeholder user ID since authentication is not implemented
        const userId = '000000000000000000000000';
        
        const { name, bio } = req.body;
        const user = await User.findByIdAndUpdate(
            userId,
            { name, bio },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({
            error: 'Failed to update profile',
            details: error.message
        });
    }
});

// Add a new skill
const addSkill = async (req, res) => {
    try {
        // For now, using a placeholder user ID since authentication is not implemented
        const userId = '000000000000000000000000';
        
        const { name, proficiency, yearsOfExperience } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if skill already exists
        const skillExists = user.skills.some(skill => skill.name.toLowerCase() === name.toLowerCase());
        if (skillExists) {
            return res.status(400).json({ error: 'Skill already exists' });
        }

        user.skills.push({ name, proficiency, yearsOfExperience });
        await user.save();

        res.json(user);
    } catch (error) {
        console.error('Error adding skill:', error);
        res.status(500).json({
            error: 'Failed to add skill',
            details: error.message
        });
    }
};

// Remove a skill
const removeSkill = async (req, res) => {
    try {
        // For now, using a placeholder user ID since authentication is not implemented
        const userId = '000000000000000000000000';
        
        const skillId = req.params.skillId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.skills = user.skills.filter(skill => skill._id.toString() !== skillId);
        await user.save();

        res.json(user);
    } catch (error) {
        console.error('Error removing skill:', error);
        res.status(500).json({
            error: 'Failed to remove skill',
            details: error.message
        });
    }
};

// @desc    Add an interest to user profile
// @route   POST /api/profile/interests
// @access  Private
const addInterest = asyncHandler(async (req, res) => {
    const { name, category, level, description } = req.body;

    if (!name || !category || !level) {
        res.status(400);
        throw new Error('Please provide name, category and level for the interest');
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Check if interest with same name already exists
    const existingInterest = user.interests.find(
        interest => interest.name.toLowerCase() === name.toLowerCase()
    );
    if (existingInterest) {
        res.status(400);
        throw new Error('Interest with this name already exists');
    }

    const newInterest = {
        name,
        category,
        level,
        description: description || ''
    };

    user.interests.push(newInterest);
    await user.save();

    res.status(201).json(newInterest);
});

// @desc    Remove an interest from user profile
// @route   DELETE /api/profile/interests/:interestId
// @access  Private
const removeInterest = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const interest = user.interests.id(req.params.interestId);
    if (!interest) {
        res.status(404);
        throw new Error('Interest not found');
    }

    interest.remove();
    await user.save();

    res.json({ message: 'Interest removed successfully' });
});

module.exports = {
    getProfile,
    updateProfile,
    addSkill,
    removeSkill,
    addInterest,
    removeInterest
}; 