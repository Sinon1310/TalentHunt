const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    updateProfile, 
    getProfile,
    addInterest,
    removeInterest
} = require('../controllers/profileController');

router.route('/').put(protect, updateProfile);
router.route('/:userId').get(getProfile);
router.route('/interests').post(protect, addInterest);
router.route('/interests/:interestId').delete(protect, removeInterest);

module.exports = router; 