const Test = require('../models/test');
const axios = require('axios');

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions';
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

// Create a new test
const createTest = async (req, res) => {
    try {
        console.log('Creating new test:', req.body);
        const test = new Test(req.body);
        await test.save();
        console.log('Test created successfully:', test._id);
        res.status(201).json(test);
    } catch (error) {
        console.error('Error creating test:', error);
        res.status(400).json({ 
            error: 'Failed to create test',
            details: error.message 
        });
    }
};

// Get all tests
const getTests = async (req, res) => {
    try {
        console.log('Fetching all tests');
        const tests = await Test.find().select('-submissions');
        console.log(`Found ${tests.length} tests`);
        res.json(tests);
    } catch (error) {
        console.error('Error fetching tests:', error);
        res.status(500).json({ 
            error: 'Failed to fetch tests',
            details: error.message 
        });
    }
};

// Get test by ID
const getTestById = async (req, res) => {
    try {
        console.log('Fetching test by ID:', req.params.id);
        const test = await Test.findById(req.params.id);
        if (!test) {
            console.log('Test not found:', req.params.id);
            return res.status(404).json({ error: 'Test not found' });
        }
        console.log('Test found:', test._id);
        res.json(test);
    } catch (error) {
        console.error('Error fetching test:', error);
        res.status(500).json({ 
            error: 'Failed to fetch test',
            details: error.message 
        });
    }
};

// Create sample test
const createSampleTest = async (req, res) => {
    try {
        console.log('Checking for existing sample test');
        const existingTest = await Test.findOne({ title: "HTML Form Validation" });
        
        if (existingTest) {
            console.log('Sample test already exists');
            return res.status(200).json(existingTest);
        }

        console.log('Creating sample test');
        const sampleTest = new Test({
            title: "HTML Form Validation",
            description: "Create a form with validation using HTML and JavaScript",
            problemStatement: `Create an HTML form with the following requirements:
1. Name field (required)
2. Email field (required, must be valid email)
3. Password field (required, min 8 characters)
4. Submit button
5. Add JavaScript validation for all fields
6. Show error messages below each field if validation fails`,
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
        console.log('Sample test created successfully:', sampleTest._id);
        res.status(201).json(sampleTest);
    } catch (error) {
        console.error('Error creating sample test:', error);
        res.status(500).json({ 
            error: 'Failed to create sample test',
            details: error.message 
        });
    }
};

// Submit test
const submitTest = async (req, res) => {
    try {
        const { testId, code, userId } = req.body;
        console.log('Submitting test:', { testId, userId });

        const test = await Test.findById(testId);
        if (!test) {
            console.log('Test not found:', testId);
            return res.status(404).json({ error: 'Test not found' });
        }

        // For now, we'll just save the submission without actual evaluation
        const submission = {
            userId: userId || '000000000000000000000000', // Placeholder if no userId
            code,
            score: test.maxScore // Placeholder score
        };

        test.submissions.push(submission);
        await test.save();
        
        console.log('Test submitted successfully');
        res.json({
            message: 'Test submitted successfully',
            score: submission.score,
            maxScore: test.maxScore
        });
    } catch (error) {
        console.error('Error submitting test:', error);
        res.status(500).json({ 
            error: 'Failed to submit test',
            details: error.message 
        });
    }
};

module.exports = {
    createTest,
    getTests,
    getTestById,
    createSampleTest,
    submitTest
}; 