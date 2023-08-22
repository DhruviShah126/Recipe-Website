const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController.js');

router.get('/', recipeController.homePage);
router.get('/categories', recipeController.allCategories);
router.get('/recipe/:id', recipeController.exploreRecipes);

module.exports = router;