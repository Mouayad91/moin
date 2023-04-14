const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema({
    usernameBased: {
        type: Boolean,
    },
    username: {
        type: String,
    },
    url: {
        type: String,
    },
    displayName: {
        type: String,
    },
    name: {
        type: String,
    },
    host: {
        type: String
    },
})

const ProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    links: {
        type: [platformSchema],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    profilePicture: {
        type: String,
    }
})

const Profile = mongoose.model('Profile', ProfileSchema);

const toDto = (profile) => {
    return { ...profile, password: null }
}

module.exports = { Profile, toDto }