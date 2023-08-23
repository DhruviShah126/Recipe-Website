const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController.js');

router.get('/', recipeController.homePage);
router.get('/about', recipeController.aboutPage);
router.get('/categories', recipeController.allCategories);
router.get('/categories/:id', recipeController.specificCategory);
router.get('/recipe/:id', recipeController.specificRecipe);
router.post('/search', recipeController.searchForRecipe);
router.get('/latest-recipes', recipeController.viewLatest);
router.get('/random-recipe', recipeController.randomRecipe);
router.get('/share-recipe', recipeController.shareRecipe);
router.post('/share-recipe', recipeController.shareRecipeOnPost);

module.exports = router;