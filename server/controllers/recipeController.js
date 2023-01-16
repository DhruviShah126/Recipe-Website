exports.homePage = async(req, res) => {
    res.render('home', {title: 'Recipes - Home Page'});
}