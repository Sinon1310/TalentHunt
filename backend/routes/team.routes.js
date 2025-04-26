const express = require('express');
const router = express.Router();
const { createTeam, getTeamsByCompetition, getTeamById } = require('../controllers/teamController');

// Create a new team (no protection for now)
router.post('/', createTeam);

// Get all teams for a competition
router.get('/competition/:competitionId', getTeamsByCompetition);

// Get team by ID
router.get('/:id', getTeamById);

module.exports = router; 