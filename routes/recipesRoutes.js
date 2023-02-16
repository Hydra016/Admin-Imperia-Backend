const express = require('express');
const router = express.Router();
const { getAllRecipes, postRecipe } = require('../controllers/recipesController');
const upload = require('../middlewares/upload')

router.get('/',  getAllRecipes)
router.post('/create', upload.array('image[]', 12),postRecipe)

module.exports = router;