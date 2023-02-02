require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

exports.homePage = async(req, res) => {
    try {
        const numCategories = 5;
        const categories = await Category.find({}).limit(numCategories);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(numCategories);

        const food = { latest };

        res.render('home', {title: 'Recipes - Home Page', categories, food});
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
//                 * Note: this recipe makes 4 portions *
//
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
//                     "Chopped spring onions - 2 tbsp",
//                 ],
//                 "category": "Chinese",
//                 "image": "fried_rice.jpg"
//
//             },
//             {
//                 "name": "Chimichanga",
//                 "description": `
//                  - Preparing the Filling -      
//                      Step 1: Take a pan and heat some oil on it
//                      Step 2: Add finely chopped garlic and jalapeno and roast it
//                      Step 3: Add 1 tsp of cumin powder and mix
//                      Step 4: Add chopped zucchini and bell peppers and mix
//                      Step 5: Add chopped onions and salt 
//                      Step 6: Cover the pan and cook for 2 minutes or until vegetables are soft
//                      Step 7: Add cumin powder, taco seasoning, and oregno and mix
//                      Step 8: Add in the black beans and mix
//                      Step 9: Add in 1 tsp of chilli powder and mix
//                      Step 10: Cover the pan and let it cook for 1 minute
//                      Step 11: Uncover and cook for 1 more minute
//
//                 - Making the Sealing Paste -
//                      Step 1: Add all purpose flour to a small bowl
//                      Step 2: Add in water until you get a consistency that it a little bit thinner than a paste but not too liquidy
//
//                 - Assembling -
//                     Step 1: Grab a tortilla and place your filling in the center
//                     Optional: If you want to add rice, you can place the rice first and then add your filling on top of it
//                     Step 2: Sprinkle on as much cheese as you'd like
//                     Step 3: Fold your toritilla. You want to fold it hotdog style from each end first and then fold it up hamburger style
//                     Step 4: At the end of the tortilla, spread the all purpose flour paste to help seal the chimichanga together
//                     Step 5: Repeat steps 1 - 4 to make as many chimichangas as you like
//                 
//                 - Frying -
//                     Step 1: In a large pan, heat up enough oil to fry your chimichangas
//                     Step 2: Make sure there are no holes in your chimichanga
//                     Step 3: Place in your chimichanga for a could of seconds unti it turns golden brown
//                     Step 4: Flip the chimichanga and fry on the other side until golden brown
//                     Step 5: Repeat steps 2 - 4 for all of your chimichangas
//
//                 - Plating -
//                 You can serve these with sour cream, guacamole, hot sauces, enchilada sauces, rice, or any other side of your choice
//
//                 Source: https://www.youtube.com/watch?v=DDZeKZp75xg&list=PLxXflsw7KieYZBeixCobOF9kixma52eHF&index=8&t=2s`,
//                 "email": "Cooking with Mitisha",
//                 "ingredients": [
//                     "Olive oil - 2 tbsp",
//                     "Onion - 1",
//                     "Bell peppers - 1 and 1/2",
//                     "Finely chopped garlic - 3 cloves",
//                     "Medium Zucchini (peeled and diced) - 1",
//                     "Black beans (rinsed and drained) - 1 can",
//                     "Fresh Jalapeno Pepper - 1/2 ",
//                     "Taco seasoning - 1 tbsp",
//                     "Cumin powder - 2 tsp",
//                     "Chili powder - 1 tsp",
//                     "Salt and Pepper - as per taste",
//                     "Large Tortillas - 1 bag or as many as you want to make",
//                     "Shredded Cheese",
//                     "All-purpose flour - 1 tbsp",
//                 ],
//                 "category": "Mexican",
//                 "image": "chimichanga.jpg"
//
//             },
//             {
//                 "name": "Eggplant Parmigiana",
//                 "description": `
//                 * Note: this recipe makes 8 - 10 portions *
//
//                 - Prepping Ingredients -
//                     Step 1: Slice eggplants lengthwise
//                     Step 2: Finely dice onions
//                     Step 3: Finely mince garlic
//
//                 - Baking the Eggplant - 
//                     Step 1: Preheat the oven to 430°F
//                     Step 2: Line 3 large trays with parchment paper
//                     Step 3: Brush eggplant slices with oil on each side
//                     Step 4: Arrange eggplant in a single layer on the trays and bake for about 35 - 45 mins or until it is tender and brown. About half way through, turn the eggplant slices.
//                     Step 5: Remove from the oven and let the eggplant cool
//               
//                 - Making the Tomato Sauce -
//                     Step 1: Heat olive oil on a large skillet on medium-high heat. Sautee onions and garlic for 3 minutes or until they are golden brown
//                     Step 2: Pour in the tomato puree, canned tomatoes, water, oregano, and sugar
//                     Step 3: Stir and bring to a simmer
//                     Step 4: Simmer uncovered for 30 - 40 minutes, stirring occasionally until thickened. Half way through, add in the basil stalks
//                     Step 5: The consistency should be a little thicker than a pasta sauce. If it is too thick, add in a little bit of water and cook for a little bit. 
//                     Step 6: Remove the basil stalks and discard them
//                     Step 7: Stir in the salt and black pepper
//
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
//
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
//                     "Black pepper - 1/4 tsp",
//                 ],
//                 "category": "Italian",
//                 "image": "eggplant_parmesan.jpg"
//             },
//             {
//                 "name": "Pav Bhaji",
//                 "description": `
//                 * Note: this recipes makes 4 portions *
//
//                 - Prepping Ingredients -
//                     Step 1: Boil and mash your potatoes
//                     Step 2: Finely chop your tomatoes
//                     Step 3: Finely chop your bell pepper
//                     Step 4: Finely chop your cilantro
//                     Step 5: Finely chop your onion
//               
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
//               
//                 - Prepping the Pav -
//                     Step 1: Add a little bit of butter in the pan
//                     Step 2: Place your pav and roast it until golden brown
//                     Step 3: Serve with bhaji
//
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
//
//             },
//             {
//                 "name": "Vegan Pad Thai",
//                 "description": `
//                  * Note: This recipe makes 1 portion of noodles *
//
//                 - Preparing the tofu -
//                     Step 1: Preheat oven to 375°F
//                     Step 2: Dry the tofu with a paper towel
//                     Step 3: Slice the tofu into rectangular strips
//                     Step 4: Line a baking sheet with parchment paper
//                     Step 5: Place the tofu strips on the baking sheet 
//                     Step 6: Bake in the oven for 25 minutes
//
//                 - Prepping the ingredients -
//                     Step 1: Soak the noodles in room temperature water for 15 minutes
//                     Step 2: While the noodles are soaking, cut the broccoli into bite sized pieces
//                     Step 3: Cut the carrots into thinly sliced rectangular strips
//                     Step 4: Cut the shallots into thin slices
//                     Step 5: Cut the Chinese chives into 1.5 inch pieces
//
//                 - Combining everything -
//                     Step 1: On medium heat, place some olive oil on a pan and place it on the stove
//                     Step 2: Add the shallots and sautee for 2 mintues
//                     Step 3: Add the broccoli and carrots and sautee for 2 minutes
//                     Step 4: Add the tofu and sautee for 1 minute
//                     Step 5: Place these sauteed vegetables aside
//                     Step 6: Turn down the heat to medium
//                     Step 7: In a pan (you can use the same pan) add the cane sugar, tamarind paste, lime juice, soy sauce, and water and stir
//                     Step 8: Keep stirring until the tamarind paste is fully dissolved
//                     Step 9: Add the chives, sauteed veggies, and noodles
//                     Step 10: Stir the noodles into the sauce for 3 - 5 minutes
//                     Step 11: Add the bean sprouts
//                     Step 12: Turn off the heat and stir
//                     Step 13: Place everything on a plate, top with peanuts and serve alongside a lime wedge               
//
//                 Source: https://www.youtube.com/watch?v=1CNavd3G_Qs`,
//                 "email": "Wil Yeung",
//                 "ingredients": [
//                     "Extra firm tofu - 1/2 lb",
//                     "Rice noodles - 1/4 lb",
//                     "Broccoli - 1 cup",
//                     "Shallot - 1",
//                     "Chinese chives - 1/2 cup",
//                     "Tamarind paste - 2 tbsp"
//                     "Cane sugar - 2 tbsp",
//                     "Lime juice - 2 tbsp ",
//                     "Soy sauce - 3 tbsp",
//                     "Water - 1 cup",
//                     "Bean Sprouts - 1 handful",
//                     "Peanuts - 2 tbsp",
//                     "Lime Wedge"
//                     "Olive oil",
//                 ],
//                 "category": "Thai",
//                 "image": "pad_thai.png"
//
//             },
//         ]);
//     } catch (error) {
//         console.log('err', + error)
//     }
// }
//
// insertRecipeData();