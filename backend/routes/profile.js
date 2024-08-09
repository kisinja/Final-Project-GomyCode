const express = require('express');

const router = express.Router();

// require Auth middleware
const requireAuth = require('../middleware/requireAuth');

const {
    createProfile,
    getProfileByUserId,
    updateProfile,
} = require('../controllers/profile');

// Apply middleware for all profile routes
router.use(requireAuth);

// Create Profile
router.post('/', createProfile);

// Get Profile By User ID
router.get('/', getProfileByUserId);

// Update Profile
router.put('/', updateProfile);

module.exports = router;