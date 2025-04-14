const Competition = require('../models/competition');
const TeamRequest = require('../models/teamRequest');
const MentorMessage = require('../models/mentorMessage');

// Get dashboard data
const getDashboardData = async (req, res) => {
    try {
        // Using a placeholder user ID since authentication is not implemented yet
        const userId = '000000000000000000000000';

        // Get competitions
        const competitions = await Competition.find({
            'participants.userId': userId,
            'participants.status': 'accepted'
        }).select('title date status teamMembers mentorAssigned');

        // Get team requests
        const teamRequests = await TeamRequest.find({
            userId: userId,
            status: 'pending'
        }).select('name role skills competition');

        // Get mentor messages
        const mentorMessages = await MentorMessage.find({
            userId: userId
        }).select('mentor message time read');

        // Calculate stats
        const stats = {
            activeCompetitions: competitions.length,
            teamRequests: await TeamRequest.countDocuments({ status: 'pending' }),
            mentorMessages: await MentorMessage.countDocuments({ read: false })
        };

        res.json({
            competitions,
            teamRequests,
            mentorMessages,
            stats
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({
            error: 'Failed to fetch dashboard data',
            details: error.message
        });
    }
};

// Create sample data
const createSampleData = async (req, res) => {
    try {
        // Using a placeholder user ID since authentication is not implemented yet
        const userId = '000000000000000000000000';

        // First, check if sample data already exists
        const existingCompetitions = await Competition.findOne();
        if (existingCompetitions) {
            return res.json({
                message: "Sample data already exists",
                competitions: await Competition.find(),
                teamRequests: await TeamRequest.find(),
                mentorMessages: await MentorMessage.find()
            });
        }

        // Create sample competitions
        const competitions = await Competition.insertMany([
            {
                title: "Annual Hackathon 2025",
                date: "Oct 15-17, 2025",
                status: "Registered",
                teamMembers: 3,
                mentorAssigned: true,
                participants: [{ userId, status: 'accepted' }]
            },
            {
                title: "Design Challenge",
                date: "Nov 5-7, 2025",
                status: "Team Incomplete",
                teamMembers: 2,
                mentorAssigned: false,
                participants: [{ userId, status: 'accepted' }]
            }
        ]);

        // Create sample team requests
        const teamRequests = await TeamRequest.insertMany([
            {
                name: "Sarah Dmello",
                role: "UI/UX Designer",
                skills: ["Figma", "User Research", "Prototyping"],
                competition: "Design Challenge",
                userId
            },
            {
                name: "Michael Johnson",
                role: "Backend Developer",
                skills: ["Node.js", "MongoDB", "Express"],
                competition: "Annual Hackathon 2025",
                userId
            }
        ]);

        // Create sample mentor messages
        const mentorMessages = await MentorMessage.insertMany([
            {
                mentor: "Dr. Joseph",
                message: "I've reviewed your project proposal. Let's schedule a meeting to discuss the technical approach.",
                time: "2 hours ago",
                userId
            },
            {
                mentor: "Prof. Prachi Patil",
                message: "Your team's progress looks good. I've shared some resources that might help with the UI design.",
                time: "Yesterday",
                userId
            }
        ]);

        res.json({
            message: "Sample data created successfully",
            competitions,
            teamRequests,
            mentorMessages
        });
    } catch (error) {
        console.error('Error creating sample data:', error);
        res.status(500).json({
            error: 'Failed to create sample data',
            details: error.message
        });
    }
};

module.exports = {
    getDashboardData,
    createSampleData
}; 