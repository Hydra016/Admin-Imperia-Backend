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
    isSuperUser: {
        type: Boolean,
        require: true
    },
    isAdmin: {
        type: Boolean,
        require: true
    },
    avatar: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)