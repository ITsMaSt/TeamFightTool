// backend/models/User.js
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    puuid: {
        type: String,
        required: true,
        unique: true
    },
    gameName: {
        type: String,
        required: true
    },
    tagLine: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // Optional: z.B. Favoriten, Analyse-Settings etc.
    preferences: {
        darkMode: Boolean,
        favoriteComps: [String]
    }
})

module.exports = mongoose.model('User', UserSchema)
