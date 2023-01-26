const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController.js');

router.get('/', recipeController.homePage);
router.get('/categories', recipeController.allCategories);

module.exports = router;