const express = require('express'); // helps manage servers and routes for web applications
const expressLayouts = require('express-ejs-layouts'); //lets us embed JS code in HTML
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express(); // initializes new express application 
const port = process.env.PORT || 3000; // the left part of the or is used when you are hosting it on somewhere that is not local host

require('dotenv').config(); // used to store database details

app.use(express.urlencoded({extended:true})); // allows us to pass url encoded bodies (extended: true means we will use qs library instead of queryString library)
app.use(express.static('public')); // allows files to be looked up and access publically 
app.use(expressLayouts);
app.use(cookieParser('VegetarianEatsSecure'));
app.use(session({
    secret: 'VegetarianEatsSession',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set('layout','./layouts/main'); // where the main layout will be for our custom layouts
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js'); //
app.use('/', routes);

app.listen(port,() => console.log(`Server listening on port ${port}`));
