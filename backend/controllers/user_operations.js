const User = require('../models/users');

// Create a new user
const createUser = async (userData) => {
    try {
        const user = new User(userData);
        return await user.save();
    } catch (error) {
        throw error;
    }
};

// Get all users
const getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw error;
    }
};

// Get user by ID
const getUserById = async (userId) => {
    try {
        return await User.findById(userId);
    } catch (error) {
        throw error;
    }
};

// Update user
const updateUser = async (userId, updateData) => {
    try {
        return await User.findByIdAndUpdate(userId, updateData, { new: true });
    } catch (error) {
        throw error;
    }
};

// Delete user
const deleteUser = async (userId) => {
    try {
        return await User.findByIdAndDelete(userId);
    } catch (error) {
        throw error;
    }
};

// Add skills to user
const addSkills = async (userId, skills) => {
    try {
        return await User.findByIdAndUpdate(
            userId,
            { $addToSet: { skills: { $each: skills } } },
            { new: true }
        );
    } catch (error) {
        throw error;
    }
};

// Remove skills from user
const removeSkills = async (userId, skills) => {
    try {
        return await User.findByIdAndUpdate(
            userId,
            { $pullAll: { skills: skills } },
            { new: true }
        );
    } catch (error) {
        throw error;
    }
};

// Add grade to user
const addGrade = async (userId, grade) => {
    try {
        return await User.findByIdAndUpdate(
            userId,
            { grade: grade },
            { new: true }
        );
    } catch (error) {
        throw error;
    }
};

// Update grade
const updateGrade = async (userId, newGrade) => {
    try {
        return await User.findByIdAndUpdate(
            userId,
            { grade: newGrade },
            { new: true }
        );
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    addSkills,
    removeSkills,
    addGrade,
    updateGrade
};