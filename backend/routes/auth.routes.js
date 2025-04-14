const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/user_operations');

// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await mongoose.model('User').findOne({ email });
        // ...existing login logic...
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Register route
router.post("/register", async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
