const express = require('express');
const router = express.Router();
const { getAllRecipes, postRecipe, getSingleRecipe, deleteRecipe } = require('../controllers/recipesController');
const upload = require('../middlewares/upload')

router.get('/',  getAllRecipes)
router.get('/:id', getSingleRecipe)
router.delete('/:id', deleteRecipe)
router.post('/create', postRecipe)

module.exports = router;