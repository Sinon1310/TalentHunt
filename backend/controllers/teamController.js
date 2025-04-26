const Team = require('../models/team');
const asyncHandler = require('express-async-handler');

// @desc    Create a new team
// @route   POST /api/teams
// @access  Public (for now)
const createTeam = asyncHandler(async (req, res) => {
    try {
        console.log('Received request to create team:', req.body);
        const { name, description, maxMembers, lookingForMembers, skills, competitionId, userId } = req.body;
        
        if (!name) {
            console.error('No team name provided');
            return res.status(400).json({ error: 'Team name is required' });
        }

        if (!competitionId) {
            console.error('No competitionId provided');
            return res.status(400).json({ error: 'Competition ID is required' });
        }

        if (!userId) {
            console.error('No userId provided');
            return res.status(400).json({ error: 'User ID is required' });
        }
        
        const team = new Team({
            name,
            description,
            maxMembers: parseInt(maxMembers),
            lookingForMembers,
            skills,
            competitionId,
            leader: userId,
            members: [{ userId, role: 'leader' }]
        });

        console.log('Attempting to save team:', team);
        const createdTeam = await team.save();
        console.log('Team created successfully:', createdTeam);

        res.status(201).json(createdTeam);
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({
            error: 'Failed to create team',
            details: error.message
        });
    }
});

// @desc    Get all teams for a competition
// @route   GET /api/teams/competition/:competitionId
// @access  Public
const getTeamsByCompetition = asyncHandler(async (req, res) => {
    try {
        const teams = await Team.find({ competitionId: req.params.competitionId })
            .populate('leader', 'name email')
            .populate('members.userId', 'name email');
        
        res.json(teams);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch teams',
            details: error.message
        });
    }
});

// @desc    Get team by ID
// @route   GET /api/teams/:id
// @access  Public
const getTeamById = asyncHandler(async (req, res) => {
    try {
        const team = await Team.findById(req.params.id)
            .populate('leader', 'name email')
            .populate('members.userId', 'name email');
            
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        
        res.json(team);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch team',
            details: error.message
        });
    }
});

module.exports = {
    createTeam,
    getTeamsByCompetition,
    getTeamById
}; 