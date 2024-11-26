const express = require('express');
const UserProfileController = require('../controller/UserProfileController');
const {userProfileValidationRules, validateUserProfile} = require('../valitadors/UserProfileValidator');

const router = express.Router();

// Create or Update User Profile
router.post('/profile', userProfileValidationRules(), validateUserProfile, UserProfileController.createOrUpdateProfile);

router.get('/profile', UserProfileController.getAllProfiles);

module.exports = router;
