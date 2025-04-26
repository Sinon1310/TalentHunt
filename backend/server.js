const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const User = require("./models/users");
const { createTest, getTests, getTestById, createSampleTest, submitTest } = require("./controllers/testController");
const { getDashboardData, createSampleData } = require("./controllers/dashboardController");
const { getProfile, updateProfile, addSkill, removeSkill, addInterest, removeInterest } = require("./controllers/profileController");
const teamRoutes = require('./routes/team.routes');
// const connectDB = require("./connectiondb");

const app = express();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow frontend URLs
    credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
});

const PORT = process.env.PORT || 5002;

 const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB Connected Successfully!");
    } catch (error) {
      console.error("MongoDB Connection Error:", error);
      process.exit(1); // Exit process if connection fails
    }
  };

  connectDB();
   
app.post("/register", async (req, res) => {
    const { name, email, password,role } = req.body;
    try {
        const user = new User({ name, email, password,role });
        await user.save();
        
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Test routes
app.post("/tests", createTest);
app.get("/tests", getTests);
app.get("/tests/:id", getTestById);
app.post("/tests/sample", createSampleTest);
app.post("/tests/submit", submitTest);

// Dashboard routes
app.get("/dashboard", getDashboardData);
app.post("/dashboard/sample", createSampleData);

// Profile routes
app.get("/profile", getProfile);
app.put("/profile", updateProfile);
app.post("/profile/skills", addSkill);
app.delete("/profile/skills/:skillId", removeSkill);
app.post("/profile/interests", addInterest);
app.delete("/profile/interests/:interestId", removeInterest);

// Get specific test by ID
app.get("/tests/:id", async (req, res) => {
    try {
        console.log('Fetching test with ID:', req.params.id);
        const test = await Test.findById(req.params.id);
        if (!test) {
            return res.status(404).json({ error: "Test not found" });
        }
        res.json(test);
    } catch (error) {
        console.error('Error fetching test:', error);
        res.status(500).json({ error: error.message });
    }
});

// Create sample test
app.post("/tests/sample", async (req, res) => {
    try {
        console.log('Creating sample test...');
        // First, check if a test already exists
        const existingTest = await Test.findOne({ title: "HTML Form Validation" });
        if (existingTest) {
            console.log('Sample test already exists');
            return res.status(200).json(existingTest);
        }

        const sampleTest = new Test({
            title: "HTML Form Validation",
            description: "Create a form with validation using HTML and JavaScript",
            problemStatement: "Create an HTML form with the following requirements:\n1. Name field (required)\n2. Email field (required, must be valid email)\n3. Password field (required, min 8 characters)\n4. Submit button\n5. Add JavaScript validation for all fields\n6. Show error messages below each field if validation fails",
            testCases: [
                {
                    input: "Valid form submission",
                    expectedOutput: "Form submitted successfully",
                    points: 25
                },
                {
                    input: "Empty name field",
                    expectedOutput: "Name is required",
                    points: 25
                },
                {
                    input: "Invalid email",
                    expectedOutput: "Please enter a valid email",
                    points: 25
                },
                {
                    input: "Short password",
                    expectedOutput: "Password must be at least 8 characters",
                    points: 25
                }
            ],
            maxScore: 100,
            language: "html"
        });
        await sampleTest.save();
        console.log('Sample test created successfully');
        res.status(201).json(sampleTest);
    } catch (error) {
        console.error('Error creating sample test:', error);
        res.status(500).json({ error: error.message });
    }
});

// Team routes
app.use('/api/teams', teamRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});