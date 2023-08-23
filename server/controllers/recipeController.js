require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

/*
    PATH: /
*/
exports.homePage = async(req, res) => {
    try {
        const limitNum = 5;
        const categories = await Category.find({}).limit(limitNum);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNum);
        const mexican = await Recipe.find({'category': 'Mexican'}).limit(limitNum);
        const chinese = await Recipe.find({'category': 'Chinese'}).limit(limitNum);
        const italian = await Recipe.find({'category': 'Italian'}).limit(limitNum);
        const indian = await Recipe.find({'category': 'Indian'}).limit(limitNum);
        const dessert = await Recipe.find({'category': 'Dessert'}).limit(limitNum);
        const food = { latest, mexican, indian, chinese, italian, dessert };

        res.render('home', {title: 'Recipes - Home Page', categories, food});
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }
}

/*
    PATH: /about
*/
exports.aboutPage = async(req, res) => {
    try {
        res.render('about', {title: 'Recipes - About Page'});
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }
}

/*
    PATH: /categories
*/
exports.allCategories = async(req, res) => {
    try {
        const numCategories = 10;
        const categories = await Category.find({}).limit(numCategories);
        res.render('categories', {title: 'Recipes - All Categories', categories});
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }
}

/*
    PATH: /categories/:id
*/
exports.specificCategory = async(req, res) => {
    try {
        let categoryId = req.params.id;
        const categoryById = await Recipe.find({'category': categoryId});
        res.render('categories', {title: 'Category', categoryById});
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }
}

/*
    PATH: /recipe/:id
*/
exports.specificRecipe = async(req, res) => {
    try {
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        res.render('recipe', {title: 'Recipe', recipe});
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }
}

/*
    PATH: /search
*/
exports.searchForRecipe = async(req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        let recipe = await Recipe.find({$text: {$search: searchTerm, $diacriticSensitive: true}});
        res.render('search', {title: 'Search', recipe});
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }
}

/*
    PATH: /latest-recipes
*/
exports.viewLatest = async(req, res) => {
    try {
        const limitNum = 20;
        const recipe = await Recipe.find({}).sort({ _id: -1}).limit(limitNum);
        res.render('view-latest', {title: 'View Latest', recipe});
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }
}

/*
    PATH: /random-recipe
*/
exports.randomRecipe = async(req, res) => {
    try {
        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = await Recipe.findOne().skip(random).exec(); 
        res.render('random-recipe', {title: 'View Latest', recipe});
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }
}

/*
    PATH: /share-recipe
*/
exports.shareRecipe = async(req, res) => {
    try {
        const infoErrorsObj = req.flash('infoErrors');
        const infoSubmitObj = req.flash('infoSubmit');
        res.render('share-recipe', {title: 'Share a Recipe', infoErrorsObj, infoSubmitObj});
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }
}

/*
    PATH: /share-recipe
*/
exports.shareRecipeOnPost = async(req, res) => {
    try {
        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if (!req.files || Object.keys(req.files).length === 0) {
            console.log('No file was uploaded');
        } else {
            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;
            uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
            imageUploadFile.mv(uploadPath, function(err) {
                if(err) return res.status(500).send(err);
            })
        }

        const newRecipe = new Recipe({
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients,
            category: req.body.category,
            image: newImageName,
            email: 'test',
        });
        await newRecipe.save();
        req.flash('infoSubmit', 'Your recipe has been shared!')
        res.redirect('/share-recipe');
    } catch(error) {
        req.flash('infoErrors', error)
        res.redirect('/share-recipe');
    }
}