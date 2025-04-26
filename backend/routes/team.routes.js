const express = require('express');
const router = express.Router();
const { createTeam, getTeamsByCompetition, getTeamById, getAllTeams, deleteTeam, updateTeamStatus } = require('../controllers/teamController');

// Get all teams
router.get('/', getAllTeams);

// Create a new team (no protection for now)
router.post('/', createTeam);

// Get all teams for a competition
router.get('/competition/:competitionId', getTeamsByCompetition);

// Get team by ID
router.get('/:id', getTeamById);

// Update team status
router.patch('/:id/status', updateTeamStatus);

// Delete/Reject team
router.delete('/:id', deleteTeam);

module.exports = router; 