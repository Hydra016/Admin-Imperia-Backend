const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String, 
        require: true
    },
    time: {
        type: String,
        require: true
    },
    portions: {
        type: Number,
        require: true
    },
    ingredients: {
        type: [String],
        require: true
    },
    instructions: {
        type: String,
        require: true
    },
    image: {
        type: [String],
        require: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Recipe', recipeSchema);