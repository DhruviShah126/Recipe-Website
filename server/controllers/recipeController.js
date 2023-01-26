require('../models/database');
const Category = require('../models/Category');

exports.homePage = async(req, res) => {
    try {
        const numCategories = 5;
        const categories = await Category.find({}).limit(numCategories);

        res.render('home', {title: 'Recipes - Home Page', categories});
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }
}

exports.allCategories = async(req, res) => {
    try {
        const numCategories = 20;
        const categories = await Category.find({}).limit(numCategories);

        res.render('categories', {title: 'Recipes - All Categories', categories});
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }
}