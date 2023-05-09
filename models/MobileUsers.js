const mongoose = require('mongoose');

const mobileUserSchema = new mongoose.Schema({
    googleId: String
}, { timestamps: true })

module.exports = mongoose.model('MobileUser', mobileUserSchema)