require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

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

// async function insertRecipeData() {
//     try {
//         await Recipe.insertMany([
//             {
//                 "name": "Vegetable Fried Rice",
//                 "description": `
//                 Step 1: To a large skillet on medium heat, add oil. Once the oil is heated add carrot and peas, ginger, and garlic. Cook for 2 minutes until the veggies soften a bit.
//                 Step 2: Push the veggies on one side of the skillet and the eggs (beaten). Cook the eggs to scramble.
//                 Step 3: Stir in the cooked rice along with the soy sauce, sriracha, salt, and pepper. Mix the rice, eggs, and veggies all together. Cook on low heat for 3-5 minutes by stirring the rice often.
//                 Step 4: Finally, add the spring onions and turn off the heat. Transfer the veggie fried rice to a bowl and serve.
                
//                 Source: https://www.cookinwithmima.com/vegetable-fried-rice/`,
//                 "email": "Mariam Ezzeddine",
//                 "ingredients": [
//                     "Olive oil - 2 tbsp ",
//                     "Frozen peas and carrots - 1 cup",
//                     "Grated ginger - 1 cup",
//                     "Minced garlic - 1 tsp",
//                     "Whole Eggs - 3",
//                     "Cooked rice - 3 cups",
//                     "Soy sauce - 2 tbsp",
//                     "Sriracha - 1 tsp",
//                     "Salt - 1 tsp",
//                     "Ground black pepper - 1/2 tsp",
//                     "Chopped spring onions - 2 tbsp"
//                 ],
//                 "category": "Chinese",
//                 "image": "fried_rice.jpg"

//             },
//             {
//                 "name": "Chimichanga",
//                 "description": `
//                 Step 1: 
//                 Step 2: 
//                 Step 3: 
                
//                 Source: https://www.youtube.com/watch?v=DDZeKZp75xg&list=PLxXflsw7KieYZBeixCobOF9kixma52eHF&index=8&t=2s`,
//                 "email": "Cooking with Mitisha",
//                 "ingredients": [
//                     "Olive oil - 2 tbsp",
//                     "Onion - 1",
//                     "Bell peppers - 1 and 1/2",
//                     "Finely chopped garlic - 3 cloves",
//                     "Medium Zucchini (peeled and diced) - 1",
//                     "Black beans (rinsed and drained) - 1 can",
//                     "Jalapeno - 1/2 ",
//                     "Taco seasoning - 1 tbsp",
//                     "Cumin powder - 1 tsp",
//                     "Chili powder - 1 tsp",
//                     "Salt and Pepper - as per taste"
//                 ],
//                 "category": "Mexican",
//                 "image": "chimichanga.jpg"

//             },
//             {
//                 "name": "Eggplant Parmigiana",
//                 "description": `
//                 - Prepping Ingredients -
//                     Step 1: Slice eggplants lengthwise
//                     Step 2: Finely dice onions
//                     Step 3: Finely mince garlic

//                 - Baking the Eggplant - 
//                     Step 1: Preheat the oven to 430°F
//                     Step 2: Line 3 large trays with parchment paper
//                     Step 3: Brush eggplant slices with oil on each side
//                     Step 4: Arrange eggplant in a single layer on the trays and bake for about 35 - 45 mins or until it is tender and brown. About half way through, turn the eggplant slices.
//                     Step 5: Remove from the oven and let the eggplant cool
                
//                 - Making the Tomato Sauce -
//                     Step 1: Heat olive oil on a large skillet on medium-high heat. Sautee onions and garlic for 3 minutes or until they are golden brown
//                     Step 2: Pour in the tomato puree, canned tomatoes, water, oregano, and sugar
//                     Step 3: Stir and bring to a simmer
//                     Step 4: Simmer uncovered for 30 - 40 minutes, stirring occasionally until thickened. Half way through, add in the basil stalks
//                     Step 5: The consistency should be a little thicker than a pasta sauce. If it is too thick, add in a little bit of water and cook for a little bit. 
//                     Step 6: Remove the basil stalks and discard them
//                     Step 7: Stir in the salt and black pepper

//                 - Assembling and Baking -
//                     Step 1: Preheat oven to 350°F
//                     Step 2: Place a little bit of tomato sauce at the bottom of the baking pan
//                     Step 3: Place 1/3 of the eggplant slices so they cover the base of the pan
//                     Step 4: Spread 1/3 of the reaminign sauce over this eggplant layer
//                     Step 5: Drizzle with a little bit of olive oil
//                     Step 6: Sprinkle 1/3 of the parmesan cheese over this
//                     Step 7: Sprinkle 1/3 of the basil leaves over the layer
//                     Step 8: Repeat with the next 1/3 of the eggplant, tomato sauce, olive oil, basil, and parmesan cheese
//                     Step 9: Repeat again with the last remaining pieces of eggplant, tomato sauce and olive oil. Do not put basil on this top layer. Place the remaning parmesan and mozzarella
//                     Step 10: Bake for 25 minutes
//                     Step 11: Let it rest for 5 - 10 minutes. Place the rest of the basil leaves on top
//                     Step 12: Serve

//                 Source: https://www.recipetineats.com/eggplant-parmigiana/`,
//                 "email": "Nagi",
//                 "ingredients": [
//                     "Eggplants - 5",
//                     "Olive oil - 1/4 cup",
//                     "Grated parmesan cheese - 1 2/3 cups",
//                     "Basil leaves (keep the stalks of the leaves separately) - 2 cups",
//                     "Shredded mozzarella - 1 1/2 cups",
//                     "Extra virgin olive oil - 1 tbsp",
//                     "Onion - 1",
//                     "Garlic cloves - 5",
//                     "Tomato pureee - 20 oz",
//                     "Canned tomatoes - 14 oz",
//                     "White sugar - 1 1/2 tsp",
//                     "Dried oregano - 1/2 tsp",
//                     "Water - 1 cup",
//                     "Salt - 2/4 tsp",
//                     "Black pepper - 1/4 tsp"
//                 ],
//                 "category": "Italian",
//                 "image": "eggplant_parmesan.jpg"
//             },
//             {
//                 "name": "Pav Bhaji",
//                 "description": `
//                 - Prepping Ingredients -
//                     Step 1: Boil and mash your potatoes
//                     Step 2: Finely chop your tomatoes
//                     Step 3: Finely chop your bell pepper
//                     Step 4: Finely chop your cilantro
//                     Step 5: Finely chop your onion
                
//                 - Making the Bhaji -
//                     Step 1: In a large pan, add 1 tbsp of butter and all of your vegetables (tomatoes, bell peppers, potatoes, peas), 1 tsp of salt and sautee the vegetables
//                     Step 2: Add 1/2 cup of water and mix well
//                     Step 3: Cover and boil for 10 minutes
//                     Step 4: Mash everything in the pan until you get a smooth texture
//                     Step 5: Add 1 tsp of chilli powder, 1/4 tsp of turmeric, 1 tsp of pav bhaji masala, 1 tsp kasuri methi, and 2 tbsp of cilantro leaves and sautee
//                     Step 6: Move the bhaji to the sides to create a hole in the middle
//                     Step 7: Add 1 tbsp of butter, 1/4 tsp of chilli powder, 1/2 tsp of pav bhaji masala, 1 tsp of kasuri methi, 1 tsp of ginger garlic paste, onions, cilantro, and a little bit of lemon juice in the middle 
//                     Step 8: Sautee everything you just added in the center
//                     Step 9: Mix everything together
//                     Step 10: Add 1/2 cup of water to make it more liquid like
//                     Step 11: Mash everything and boil for 5 minutes
                
//                 - Prepping the Pav -
//                     Step 1: Add a little bit of butter in the pan
//                     Step 2: Place your pav and roast it until golden brown
//                     Step 3: Serve with bhaji

//                 Source: https://hebbarskitchen.com/easy-mumbai-style-pav-bhaji-recipe/#Recipe_card_for_mumbai_pav_bhaji_recipe`,
//                 "email": "Hebbars Kitchen",
//                 "ingredients": [
//                     "Butter - 2 tbsp",
//                     "Tomatoes - 3",
//                     "Peas - 1/4 cup",
//                     "Bell pepper - 1/2",
//                     "Potato - 2",
//                     "Salt - 1 tsp",
//                     "Red chilli powder - 1 and 1/4 tsp ",
//                     "Turmeric - 1/4 tsp",
//                     "Pav bhaji masala - 1 and 1/2 tsp",
//                     "Kasuri methi - 2 tsp",
//                     "Cilantro - 3 tbsp",
//                     "Ginger garlic paste - 1 tsp",
//                     "Onion - 1",
//                     "Lemon juice - 1/2",
//                     "Pav - 8",
//                     "Water",
//                 ],
//                 "category": "Indian",
//                 "image": "pav_bhaji.jpg"

//             },
//         ]);
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// insertRecipeData();