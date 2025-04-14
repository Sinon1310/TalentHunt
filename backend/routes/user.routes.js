const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser, addSkills } = require('../controllers/user_operations');

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

// Update user
router.put("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);

// Add skills to user
router.post("/skills", async (req, res) => {
    try {
        const { userId, skills } = req.body;
        const updatedUser = await addSkills(userId, skills);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Skills added successfully", skills: updatedUser.skills });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
