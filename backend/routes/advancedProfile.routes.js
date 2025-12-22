const express = require('express');
const router = express.Router();
const {
    getProfile,
    updateBasicProfile,
    updateDetailedProfile,
    updateSkills,
    updateInterests,
    addPortfolioProject,
    updatePortfolioProject,
    deletePortfolioProject,
    submitSkillsAssessment,
    updateTeamPreferences,
    updateOnboarding,
    getPotentialMatches,
    uploadFiles,
    handleFileUploads
} = require('../controllers/advancedProfileController');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Profile routes
router.get('/', getProfile);
router.put('/basic', updateBasicProfile);
router.put('/detailed', updateDetailedProfile);

// Skills and interests
router.put('/skills', updateSkills);
router.put('/interests', updateInterests);

// Portfolio management
router.post('/portfolio', addPortfolioProject);
router.put('/portfolio/:projectId', updatePortfolioProject);
router.delete('/portfolio/:projectId', deletePortfolioProject);

// Skills assessment
router.post('/skills-assessment', submitSkillsAssessment);

// Team preferences
router.put('/team-preferences', updateTeamPreferences);

// Onboarding
router.put('/onboarding', updateOnboarding);

// Matching
router.get('/matches', getPotentialMatches);

// File uploads
router.post('/upload', uploadFiles, handleFileUploads);

module.exports = router;
