const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: '',
    },
    profile_pic: {
        type: String,
        default: '',
    },
    location: {
        type: String,
        default: '',
    },
    website: {
        type: String,
        default: '',
    },
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);