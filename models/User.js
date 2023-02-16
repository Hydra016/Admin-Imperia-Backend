const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 6,
    },
    email: {
        type: String,
        require: true,
        min: 6
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    avatar: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)