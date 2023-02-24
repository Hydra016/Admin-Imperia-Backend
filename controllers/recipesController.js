const Recipes = require('../models/Recipe');
const { postRecipeValidation } = require('../helpers/validation');
const fs = require('fs');

const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipes.find();
        res.status(200).json({ success: true, data: recipes })
    } catch (err) {
        res.status(200).json({ success: false, msg: err })
    }
}

const getSingleRecipe = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const recipe = await Recipes.findById(id);
        res.status(200).json({ success: true, data: recipe })
    } catch(err) {
        res.status(200).json({ success: false, msg: err })
    }
}

const deleteRecipe = async (req, res) => {
    const { id } = req.params;

    try {
        await Recipes.deleteOne({ id });
        res.status(200).json({ success: true, msg: 'recipe deleted' })
    } catch (err){
        res.status(200).json({ success: false, msg: err })
    }

}

const postRecipe = async (req, res) => {
    const { error } = postRecipeValidation(req.body);
    const  { name, description, time, portions, ingredients, instructions, image } = req.body;

    if(error) {

        //with multer
        // console.log(error)
        // req.files.map((files) => {
        //     return fs.unlinkSync(files.path)
        // })
        return res.status(200).json({ success: false, msg: error.details[0].message })
    } 

    const recipe = new Recipes({
        name,
        description,
        time,
        portions,
        ingredients,
        instructions,
        image
    })

    //with multer
    // console.log(req.files)
    // if(req.files) {
    //     let filesArray = [];
    //     req.files.map((files) => {
    //         return filesArray.push(files.path)
    //     })
    //     recipe.image = filesArray
    // }
    
    const newRecipe = await recipe.save();
    res.status(200).json({ success: true, data: newRecipe })
}

module.exports = {
    getAllRecipes,
    postRecipe,
    getSingleRecipe,
    deleteRecipe
}