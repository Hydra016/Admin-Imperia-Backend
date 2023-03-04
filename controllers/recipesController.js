const Recipes = require('../models/Recipe');
const { postRecipeValidation } = require('../helpers/validation');

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
    try {
        const recipe = await Recipes.findById(id);
        res.status(200).json({ success: true, data: recipe })
    } catch(err) {
        res.status(200).json({ success: false, msg: err })
    }
}

const deleteRecipe = async (req, res) => {
    const { id, userId } = req.query;

    try {
        let recipes = await Recipes.findByIdAndDelete(id);
        recipes = await Recipes.find({ userId: userId });
        res.status(200).json({ success: true, data: recipes, results: recipes.length })
    } catch (err){
        res.status(200).json({ success: false, msg: err })
    }

}

const postRecipe = async (req, res) => {
    const { error } = postRecipeValidation(req.body);
    const  { name, description, time, portions, ingredients, instructions, image, userId } = req.body;

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
        image,
        userId
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

const getRecipeById = async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await Recipes.find({ userId: id });
        res.status(200).json({ success: true, data: recipe })
    } catch(err) {
        res.status(200).json({ success: false, msg: err })
    }
}


module.exports = {
    getAllRecipes,
    postRecipe,
    getSingleRecipe,
    deleteRecipe,
    getRecipeById
}