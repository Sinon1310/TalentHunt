const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Import routes
const authRoutes = require('./routes/auth.routes');
const teamRoutes = require('./routes/team.routes');
const advancedProfileRoutes = require('./routes/advancedProfile.routes');

// Import controllers
const { createTest, getTests, getTestById, createSampleTest, submitTest } = require("./controllers/testController");
const { getDashboardData, createSampleData } = require("./controllers/dashboardController");
const { getProfile, updateProfile, addSkill, removeSkill, addInterest, removeInterest } = require("./controllers/profileController");

const app = express();

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https:"],
            scriptSrc: ["'self'", "https:"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https:"],
            fontSrc: ["'self'", "https:"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
    crossOriginEmbedderPolicy: false
}));

// Rate limiting
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later'
    }
});

app.use(generalLimiter);

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.CLIENT_URL 
        : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    if (req.method === 'POST' || req.method === 'PUT') {
        console.log('Body:', { ...req.body, password: req.body.password ? '[REDACTED]' : undefined });
    }
    next();
});

const PORT = process.env.PORT || 5002;

// Database connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/profile', advancedProfileRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        success: true, 
        message: 'TalentHunt API is running',
        timestamp: new Date().toISOString()
    });
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