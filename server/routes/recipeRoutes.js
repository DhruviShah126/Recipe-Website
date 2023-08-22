const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController.js');

router.get('/', recipeController.homePage);
router.get('/categories', recipeController.allCategories);
router.get('/categories/:id', recipeController.specificCategory);
router.get('/recipe/:id', recipeController.specificRecipe);

module.exports = router;