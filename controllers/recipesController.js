const Recipes = require('../models/Recipe');
const { postRecipeValidation } = require('../helpers/validation');
const fs = require('fs');

const getAllRecipes = async (req, res) => {
    const recipes = await Recipes.find();
    res.status(200).json({ success: true, data: recipes })
}

const postRecipe = async (req, res) => {
    const { error } = postRecipeValidation(req.body);
    const  { name, description, time, portions, ingredients, instructions } = req.body;

    if(error) {
        console.log(error)
        req.files.map((files) => {
            return fs.unlinkSync(files.path)
        })
        return res.status(200).json({ success: false, msg: error.details[0].message })
    } 

    const recipe = new Recipes({
        name,
        description,
        time,
        portions,
        ingredients,
        instructions
    })
    console.log(req.files)
    if(req.files) {
        let filesArray = [];
        req.files.map((files) => {
            return filesArray.push(files.path)
        })
        recipe.image = filesArray
    }
    
    const newRecipe = await recipe.save();
    res.status(200).json({ success: true, data: newRecipe })
}

module.exports = {
    getAllRecipes,
    postRecipe,
}