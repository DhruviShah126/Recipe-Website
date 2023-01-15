const express = require('express'); // helps manage servers and routes for web applications
const expressLayouts = require('express-ejs-layouts'); //lets us embed JS code in HTML

const app = express(); // initializes new express application 
const port = process.env.PORT || 3000; // the left part of the or is used when you are hosting it on somewhere that is not local host

require('dotenv').config(); // used to store database details

app.use(express.urlencoded({extended:true})); // allows us to pass url encoded bodies (extended: true means we will use qs library instead of queryString library)
app.use(express.static('public')); // allows files to be looked up and access publically 
app.use(expressLayouts);

app.set('layout','./layouts/main'); // where the main layout will be for our custom layouts

const routes = require('./server/routes/recipeRoutes.js'); //
app.use('/', routes);

app.listen(port,() => console.log(`Server listening on port ${port}`));
