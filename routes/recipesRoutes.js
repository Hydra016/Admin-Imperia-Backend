const express = require('express');
const router = express.Router();
const { getAllRecipes, postRecipe, getSingleRecipe, deleteRecipe, getRecipeById } = require('../controllers/recipesController');
const upload = require('../middlewares/upload')
const verifyToken = require('../middlewares/verifyToken');

router.get('/', getAllRecipes)
router.get('/:id', getSingleRecipe)
router.get('/myRecipes/:id', getRecipeById)
router.delete('/:id', deleteRecipe)
router.post('/create', postRecipe)

module.exports = router;