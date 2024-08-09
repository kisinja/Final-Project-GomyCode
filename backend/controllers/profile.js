const Profile = require('../models/Profile');

// Create Profile
const createProfile = async (req, res) => {
    const user_id = req.user._id;

    try {
        const profile = new Profile({
            user_id,
        });

        await profile.save();
        res.status(201).json({ profile });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
};

// Get Profile By User ID
const getProfileByUserId = async (req, res) => {
    const user_id = req.user._id;

    try {
        const profile = await Profile.findOne({ user_id });

        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.status(200).json({ profile });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
};

// Update Profile
const updateProfile = async (req, res) => {
    const userId = req.user._id;

    try {
        const profile = await Profile.findOne({ user_id: userId });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        const { bio, profile_pic, location, website } = req.body;
        profile.bio = bio;
        profile.profile_pic = profile_pic;
        profile.location = location;
        profile.website = website;

        await profile.save();

        res.status(200).json({ profile });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
};

module.exports = {
    createProfile,
    getProfileByUserId,
    updateProfile,
};