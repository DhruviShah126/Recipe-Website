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
        const indian = await Recipe.find({'category': 'Indian'}).limit(limitNum);
        const dessert = await Recipe.find({'category': 'Dessert'}).limit(limitNum);
        const food = { latest, mexican, indian, dessert };

        res.render('home', {title: 'Recipes - Home Page', categories, food});
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
        // let count = await Recipe.find().countDocuments();
        // let random = Math.floor(Math.random() * count);
        // let recipe = await Recipe.findOne().skip(random).exec(); 
        res.render('share-recipe', {title: 'Share a Recipe'});
    } catch(error) {
        res.status(500).send({message: error.message || "Error Occurred"});
    }
}

// async function insertCategoryData() {
//     try {
//         await Category.insertMany([
//             {
//                 "name": "Chinese",
//                 "image": "chinese_food.jpg"
//             },
//             {
//                 "name": "Indian",
//                 "image": "indian_food.jpg"
//             },
//             {
//                 "name": "Italian",
//                 "image": "italian_food.jpg"
//             },
//             {
//                 "name": "Mexican",
//                 "image": "mexican_food.jpg"
//             },
//             {
//                 "name": "Thai",
//                 "image": "thai_food.jpg"
//             },
//             {
//                 "name": "Desserts",
//                 "image": "desserts.jpg"
//             }
//         ]);
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// async function insertRecipeData() {
//     try {
//         await Recipe.insertMany([
//             {
//                 "name": "Crunchwrap Supreme",
//                 "description": `
//                 * Note: this recipe makes 4 portions *

//                 - Prepping the Ingredients -
//                     Step 1: Cut the lettuce into thin rectangular strips
//                     Step 2: Dice the tomatoes
//                     Step 3: Dice the jalapenos into circles

//                 - Preparing the Refried Beans -
//                     Step 1: Drain your can of black beans
//                     Step 2: Mash your beans (you should still have some whole beans left but they shoudl be mostly mashed)
//                     Step 3: Place a pan on medium heat and add 1 tbsp olive oil
//                     Step 4: Add in the minced garlic and sautee
//                     Step 5: Add in the black beans
//                     Step 6: Add in the ground cumin
//                     Step 7: Add in the paprika and mix

//                 - Assembling the Crunchwrap -
//                     Step 1: Take 1 extra large tortilla and place your refried beans in the center in a circle about as big as your crunchy tostada
//                     Step 2: Spread nacho cheese over this refried bean layer
//                     Step 3: Place 1 crunchy tostada on top of the nacho cheese
//                     Step 4: Spread sour cream on top of the tostada
//                     Step 5: Add a layer of sliced lettuce
//                     Step 6: Sprinkle the diced tomatoes on top
//                     Step 7: Sprinkle some jalapenos on top
//                     Step 8: Sprinkle some shredded cheese on top
//                     Step 9: Place 1 mini flour tortilla on top
//                     Step 10: Fold the extra large tortilla in from all sides into the center to make a hexagonal like shape
               
//                 - Cooking the Crunchwrap -
//                     Step 1: Place a little bit of oil in a pan on medium high heat
//                     Step 2: Place your crunchwrap on the pan with the folded side down
//                     Step 3: Cook on each side until golden brown 

//                 Serve with any condiments of your choosing

//                 Source: https://www.youtube.com/watch?v=P8Ph1Q2ewsw&list=PLxXflsw7KieYZBeixCobOF9kixma52eHF&index=25`,
//                 "email": "Bhavna's Kitchen & Living",
//                 "ingredients": [
//                     "Black beans - 1 can ",
//                     "Olive oil - 1 tbsp",
//                     "Minced garlic - tbsp",
//                     "Ground cumin - 1/2 tbsp",
//                     "Paprika - 1 tbsp",
//                     "Extra large tortillas - 4",
//                     "Mini flour tortillas - 4",
//                     "Crunchy tostadas - 4",
//                     "Jalapeno - 1",
//                     "Colby monterey jack shredded cheese - as much as you'd like",
//                     "Lettuce - as much as you'd like", 
//                     "Tomato - as much as you'd like",
//                     "Sour cream - as much as you'd like",
//                     "Nacho Cheese - as much as you'd like",
//                 ],
//                 "category": "Mexican",
//                 "image": "crunchwrap.png"
//             },
//             {
//                 "name": "Elote",
//                 "description": `
//                 * Note: this recipe makes 8 pieces of elote *

//                 - Making the Cheese Mixture -
//                     Step 1: In a small bowl, mix sour cream, mayonnaise, feta or cotija cheese, chili powder, garlic powder, cumin, and salt

//                 - Cooking the Corn -
//                     Step 1: Heat a grill to medium high
//                     Step 2: Peel the outer layers of the corn down and away from the cob but be sure to keep them attached to the corn
//                     Step 3: use string to twine to tie the outer layers of the corn to the corn handle
//                     Step 4: Rub oil on each corn and make sure each corn is evenly coated
//                     Step 5: Place the corn on the grill and cook for about 12 - 15 minutes or until the corn has blackened a bit on all sides

//                 - Assembling the Elote -
//                     Step 1: Place the cooked corn on a baking sheet
//                     Step 2: Using a spoon, coat the corn evenly with the cheese mixture
//                     Step 3 (optional): Squeeze some lime on the corn and add some cilantro leaves

//                 Source: https://www.acouplecooks.com/elote-mexican-street-corn/`,
//                 "email": "Sonja Overhiser",
//                 "ingredients": [
//                     "Corn - 8 ears",
//                     "Vegetable oil - 1 tbsp",
//                     "Sour cream - 1/2 cup",
//                     "Mayonnaise - 2 tbsp",
//                     "Crumbled cotija or feta cheese - 1/2 cup",
//                     "Chili powder - 1/2 tsp",
//                     "Garlic powder - 1/4 tsp",
//                     "Cumin - 1/4 tsp",
//                     "Salt - 1/4 tsp",
//                     "Lime wedges - for garnish (optional)",
//                     "Cilantro - for garnish (optional)"
//                 ],
//                 "category": "Mexican",
//                 "image": "elote.png"
//             },
//             {
//                 "name": "Mexican Bean Stew",
//                 "description": `
//                 * Note: this recipe makes 4 portions *
//                 * This image is from this recipe's website *

//                 - Preparing the ingredients -
//                     Step 1: Finely mince the garlic
//                     Step 2: Finely chop the onions
//                     Step 3: Finely mince the jalapeno

//                 - Making the Stew -
//                     Step 1: Place a pan on medium heat and add the oil to it
//                     Step 2: Add the minced garlic, chopped onion, and chopped jalapeno to the pan and sautee it together
//                     Step 3: Once the veggies have turned golden brown, add cumin, paprika, oregano, and black pepper and mix for 30 seconds
//                     Step 4: Add the black beans, chickpeas, corn, crushed tomatoes, vegetable stock, salt, and sugar to the pan
//                     Step 5: Cook everything together for about 10 minutes or until there is a thick sauce like consistency (Make sure to stir occasionally to avoid everything sticking to the bottom of the pan)

//                 You can top the stew with cilantro and serve with a side of brown rice if desired.

//                 Source: https://hurrythefoodup.com/mexican-bean-stew/`,
//                 "email": "Abril Macías",
//                 "ingredients": [
//                     "Vegetable oil - 2 tbsp",
//                     "Garlic - 4 cloves",
//                     "Red onion - 1/2",
//                     "Jalapeno - 1",
//                     "Ground cumin - 1 tsp",
//                     "Paprika - 1 tsp",
//                     "Dried oregano - 1 tsp",
//                     "Black pepper - 1/4 tsp",
//                     "Black beans - 1 can",
//                     "Chickpeas - 1 can",
//                     "Corn - 1 can",
//                     "Crushed tomatoes - 1 can",
//                     "Vegetable broth - 1 cup",
//                     "Salt - 1 tsp",
//                     "Sugar - 1 tsp",
//                     "Fresh cilantro - 1/4 cup - for garnish (optional)",
//                     "Brown rice - 2 cups - to serve with (optional)"
//                 ],
//                 "category": "Mexican",
//                 "image": "mexican_bean_stew.png"
//             },
//             {
//                 "name": "Mexican Rice",
//                 "description": `
//                 * Note: this recipe makes 6 portions *
//                 * This image is from this recipe's website *

//                 - Prepping the ingredients  -
//                     Step 1: Finely mince the garlic
//                     Step 2: Dice the onion
                
//                 - Making the rice -
//                     Step 1: Place a pan on medium heat and add some oil in it
//                     Step 2: Add garlic and onions and sautee for 2-3 minutes
//                     Step 3: Add in the rice and cook for about 2 minutes or until rice looks toasted
//                     Step 4: Add the tomato sauce and vegetable broth and stir
//                     Step 5: Cook everything togethr and bring to a simmer for about 2 minutes
//                     Step 6: Add in corn, carrots, peas, chilli powder, cumin, salt (as per taste), and black pepper (as per taste) and mix
//                     Step 7: Bring everything to a boil
//                     Step 8: Reduce the heat, cover the pan, and let simmer for about 13 - 16 minutes or until rice is thoroughly cooked
//                     Step 9: Add in the tomatoes 
                
//                 Garnish with cilantro if desired and serve. 

//                 Source: https://damndelicious.net/2014/03/12/mexican-rice/`,
//                 "email": "Chungah",
//                 "ingredients": [
//                     "Olive oil - 1 tbsp",
//                     "Garlic - 2 cloves",
//                     "Onion - 1",
//                     "Basmati rice - 1 1/2 cups",
//                     "8-ounce tomato sauce can - 1",
//                     "Vegetable broth - 1 1/2 cups",
//                     "Corn kernels - 1 cup",
//                     "Diced carrots - 1/2 cup",
//                     "Frozen peas - 1/2 cup",
//                     "Roma tomatoes - 2",
//                     "Chili powder - 1/4 tsp",
//                     "Cumin - 1/4 tsp",
//                     "Salt - as per taste",
//                     "Black pepper - as per taste",
//                     "Cilantro - 2 tbsp - for garnish (optional)"
//                 ],
//                 "category": "Mexican",
//                 "image": "mexican_rice.png"
//             },
//             {
//                 "name": "Guacamole",
//                 "description": `
//                 * Note: this recipe makes 4 portions *
//                 * The image is from this recipe's website *

//                 - Prepping the ingredients -
//                     Step 1: Peel and pit the avocadoes
//                     Step 2: Dice the tomatoes
//                     Step 3: Dice the onions
//                     Step 4: Mince the garlic
//                     Step 5: Chop the cilantro

//                 - Making the Guacamole -
//                     Step 1: In a medium sized bowl, mash all of the avocadoes together
//                     Step 2: Squeeze the lime and add its juice into the mashed avocadoes
//                     Step 3: Add in salt and mix
//                     Step 4: Add in the tomatoes, onion, cilantro, garlic (and optionally, the cayenne pepper)
//                     Step 5: Mix everything together

//                 You can also refrigerate this for 1 hour before serving or you can serve right away. Enjoy with some chips or as a side to any dish!

//                 Source: https://www.allrecipes.com/recipe/14231/guacamole/`,
//                 "email": "Maryellen",
//                 "ingredients": [
//                     "Avocadoes - 3",
//                     "Lime - 1",
//                     "Salt - 1 tsp",
//                     "Roma tomatoes - 2",
//                     "Red onion - 1/2 cup",
//                     "Cilantro - 3 tbsp",
//                     "Garlic - 1 tsp",
//                     "Cayenne pepper - 1 pinch (optional)"
//                 ],
//                 "category": "Mexican",
//                 "image": "guacamole.png"
//             },
//             {
//                 "name": "Baked Khichdi",
//                 "description": `
//                 * The image is from this recipe's website *

//                 - Prepping the Ingredients -
//                     Step 1: Mix rice and dal togther in 1 bowl
//                     Step 2: Wash it 2 - 3 times and then let it soak in water for 30 minutes
//                     Step 3: Finely chop the ginger
//                     Step 4: Finely chop the green chilis
//                     Step 5: Dice the potatoes
//                     Step 4: Dice the carrots
//                     Step 6: Cut the french beans into 1 inch pieces
//                     Step 7: Cut the florets into 1 inch pieces

//                 - Making the Khichdi -
//                     Step 1: Place an oven save pan on medium head and add oil to it
//                     Step 2: Once the oil is hot, add cumin seeds, cloves, cinnamon, the dried red chili, and the peppercorns
//                     Step 3: Add the chopped ginger and green chili and sautee
//                     Step 4: Add the potatoes, carrots, salt, and turmeric and half cook them
//                     Step 5: Add the french beans, cauliflower, and peas and mix
//                     Step 6: Remove the water from the soaked rice and dal
//                     Step 7: Add the rice and dal mixture to the pan and mix
//                 *check*    Step 8: Add enough water to cover your dal and rice
//                     Step 9: Place the lid on and cook for about 20 minutes
//                     Step 10: Once the khichdi is cooked, let it sit for 15 minutes
                
//                 - Baking the Khichdi -
//                     Step 1: Roughly mash everything in the pot with a spoon 
//                     Step 2: Sprinkle ghee, salt, coriander powder, and red chili powder on top
//                     Step 3: Add some cilantro and cheddar cheese 
//                     Step 4: At 350°F, place the pan in the oven for 20 minutes
//                     Step 5: At 400°F, let the khichdi broil for 5 minutes

//                 Source: https://cookingshooking.com/baked-khichdi/`,
//                 "email": "Yaman Agarwal",
//                 "ingredients": [
//                     "Basmati rice - 1 1/2 cup",
//                     "Moong or chana dal (Yellow split gram lentils or split chickpea lentils) - 1 cup",
//                     "Oil - 2 tbsp",
//                     "Cumin seeds - 1/2 tsp",
//                     "Cinnamon - 1 bark",
//                     "Cloves - 1/4 tsp",
//                     "Dried red chilli - 1",
//                     "Peppercorns - 1/4 tsp",
//                     "Ginger - 1 1/2 inch",
//                     "Green chilli - 2",
//                     "Potato - 1",
//                     "Carrot - 1",
//                     "Salt - 1 1/2 tsp",
//                     "Turmeric - 1/2 tsp",
//                     "French beans - 10",
//                     "Cauliflower - 3 florets",
//                     "Peas - 1/4 cup",
//                     "Ghee - 1 tbsp",
//                     "Coriander powder - 1/2 tsp",
//                     "Red chili powder - 1/2 tsp",
//                     "Coriander - 7 stems",
//                     "Water - as needed"
//                 ],
//                 "category": "Indian",
//                 "image": "baked_khichdi.png"
//             },
//             {
//                 "name": "Soya Keema",
//                 "description": `
//                 * The image is from this recipe's youtube video *

//                 - Prepping the Ingredients -
//                     Step 1: Soak the soya granules in hot water for 10 minutes
//                     Step 2: After 10 minutes, strain the soya granules
//                     Step 3: Chop the  onions, green chilli, and coriander leaves

//                 - Making the Keema -
//                     Step 1: On medium heat, add some oil to a pan
//                     Step 2: Add the cloves, cinnamon, cardamom, fennel, cumin seeds, onions and green chilli
//                     Step 3: Sautee everything until it turns golden brown
//                     Step 4: Add ginger garlic paste and sautee for about 2 minutes
//                     Step 5: Add tomato puree and sautee everything for about 2 minutes
//                     Step 6: Add turmeric powder, kashmiri chilli powder, coridaner powder, cumin powder, and salt and mix everything for about 2 minutes
//                     Step 7: Add the soaked soya granules and mix 
//                     Step 8: Add water and mix 
//                     Step 9: Cover and cook for 10 minutes
//                     Step 10: Add garam masala and black pepper powder and mix
//                     Step 11: Add a little bit of butter and kasuri methi and mix
                    
//                     Add coriander leaves for garnish and serve
   
//                 Source: https://www.youtube.com/watch?v=qDgh5REOA-Q&list=PLxXflsw7KieYZBeixCobOF9kixma52eHF&index=20`,
//                 "email": "Hebbars Kitchen",
//                 "ingredients": [
//                     "Oil - 2 tbsp",
//                     "Soya Granules - 1 cup",
//                     "Cinnamon - 1/4 stick",
//                     "Clove - 4 pieces",
//                     "Cardamom - 2 whole",
//                     "Fennel - 1 tsp",
//                     "Cumin seeds - 1 tsp",
//                     "Onion - 2",
//                     "Green chilli - 2",
//                     "Ginger garlic paste - 1 tsp",
//                     "Tomato puree (of 4 large tomatoes) ",
//                     "Turmeric powder - 1/4 tsp",
//                     "Kashmiri chilli powder - 3 tsp",
//                     "Coriander powder - 2 tsp",
//                     "Cumin powder - 1 tsp",
//                     "Salt - 1 tsp",
//                     "Garam masala - 1 tsp",
//                     "Black pepper powder - 1/2 tsp",
//                     "Butter",
//                     "Kasuri methi",
//                     "Coriander leaves",
//                     "Water 1 and 1/2 cups"
//                 ],
//                 "category": "Indian",
//                 "image": "soya_keema.png"
//             },
//             {
//                 "name": "Vegetable Dum Biryani",
//                 "description": `
//                 * The image is from this recipe's youtube video *

//                 - Prepping the ingredients -
//                     Step 1: Thinly slice the onions
//                     Step 2: Finely chop the green chilis
//                     Step 3: Dice the tomatoes
//                     Step 4: Dice the carrots
//                     Step 5: Chop the french beans
//                     Step 6: Dice the potatoes
//                     Step 7: Chop the cauliflower
//                     Step 8: Finely chop the coriander
//                     Step 9: Finely chop the mint leaves

//                 - Making the saffron water -
//                     Step 1: Add a pinch of saffron to 1/8 cup of water and mix

//                 - Making the marinate -
//                     Step 1: To a bowl, add the curd, salt, ginger garlic paste, tumeric, chili powder, coriander powder, and biryani masala and mix
//                     Step 2: Add the sliced onions, chopped green chilis, diced tomatoes, diced carrots, diced potatoes, chopped green beans, chopped cauliflower florets, green peas, chopped coriander, and chopped mint leaves to the mixture
//                     Step 3: Let this mixture sit for atleast 20 minutes

//                 - Making the rice -
//                     Step 1: Place 2 bowls of rice in a big bowl and wash 2 - 3 times
//                     Step 2: Add some water to the bowl and soak the rice for at least 20 minutes
//                     Step 3: Cook the rice until it is 3/4 of the way done
//                     Step 4: Strain the rice and keep it aside

//                 - Making the biryani -
//                     Step 1: Place a pan on medium heat and add the ghee and oil to it
//                     Step 2: Add the marinate and sautee it for about 5 minutes
//                     Step 3: Place a lid on the pan and cook for 15 minutes or until the mixture no longer seems liquidy
//                     Step 4: Take half of this mixture you just cooked from the pan and place it aside
//                     Step 5: Spread out the remaining mixture on the bottom of the pan so the whole bottom of the pan is covered
//                     Step 6: Take half of your rice and layer it over this mixture
//                     Step 7: Layer the remaining cooked vegetables you set aside earlier on top of this rice layer
//                     Step 8: Layer the remaining rice on top of the vegetables
//                     Step 9: Sprinkle some chopped coriander, chopped mint leaves, biryani masala, and saffron water on top
//                     Step 10: Turn the heat down to low, place a lid on the pan, and cook for about 15 minutes
//                     Step 11: Turn off the stove and let the biryani rest for about 15 minutes

//                 You can serve it with some plain curd or raita on the side!
   
//                 Source: https://www.youtube.com/watch?v=S5Ngh6CFRmc&list=PLxXflsw7KieYZBeixCobOF9kixma52eHF&index=3`,
//                 "email": "Hema Subramanian",
//                 "ingredients": [
//                     "Ghee - 3 tsp",
//                     "Oil - 1 tbsp",
//                     "Curd - 1/2 cup",
//                     "Turmeric powder - 1/4 tsp",
//                     "Chili powder - 2 tsp",
//                     "Coriander powder - 1 tsp",
//                     "Biryani masala - 1 tbsp",
//                     "Cooked basmati rice - 2 cups",
//                     "Salt - 1 tsp",
//                     "Ginger garlic paste - 1 tsp",
//                     "Onion - 2",
//                     "Green chili - 1",
//                     "Tomato - 2",
//                     "Carrot - 1",
//                     "French green beans - a handful",
//                     "Potato - 1",
//                     "Cauliflower florets - 1 cup",
//                     "Green peas - 1/4 cup",
//                     "Coriander leaves - 1 handful",
//                     "Mint leaves - 1 handful",
//                     "Saffron - 1 pinch"
//                 ],
//                 "category": "Indian",
//                 "image": "veg_dum_biryani.png"
//             },
//             {
//                 "name": "Raita",
//                 "description": `
//                 * The image is from this recipe's website *

                
//                 - Prepping the ingredients -
//                     Step 1: Finely dice the onions
//                     Step 2: Dice the cucumber
//                     Step 3: Finely chop the cilantro
//                     Step 4: Finely chop the mint leaves
//                     Step 5: If adding serano, chop that 

//                 Mix everything in a bowl and refridgerate until ready to serve
                  
   
//                 Source: https://www.feastingathome.com/raita-recipe/#tasty-recipes-29237-jump-target`,
//                 "email": "Sylvia Fountaine",
//                 "ingredients": [
//                     "Whole milk plain yogurt - 3/4 cup",
//                     "Cucumber - 1/2 cup",
//                     "Onion - 1 tbsp",
//                     "Lemon juice - 2 tsp",
//                     "Olive oil - 1 tbsp",
//                     "Cumin powder - 1/2 tsp",
//                     "Coriander powder - 1/2 tsp",
//                     "Mint - 2 - 3 tbsp",
//                     "Cilantro - 2 - 3 tbsp",
//                     "Salt - 1/4 tsp",
//                     "Black pepper - 1/4 tsp",
//                     "Serano peppers - 1 - 2 tsp(optional)"
//                 ],
//                 "category": "Indian",
//                 "image": "raita.png"
//             },
//             {
//                 "name": "Baingan Bharta",
//                 "description": `
//                 * The image is from https://www.cookwithmanali.com/baingan-bharta/ *

//                 - Prepping the ingredients -
//                     Step 1: Finely chop the onions
//                     Step 2: Finely chop the tomatoes
//                     Step 3: Finely chop the green chili
//                     Step 4: Chop the coriander
                    
//                 - Making the bharta -
//                     Step 1: Brush some oil on the eggplant
//                     Step 2: Roast the eggplant directly over medium heat
//                     Step 3: Once it is fully roasted, let it cool fully (you can run cold water on it or place it in a bowl of cold water to help with this process)
//                     Step 4: Peel off the skin
//                     Step 5: Take a bowl and mash the eggplant in the bowl
//                     Step 6: Place a pan on medium heat and add some oil to it
//                     Step 7: Once the pan is warm, add the chopped green chilis and onions and fry until golden brown
//                     Step 8: Add red chili powder, turmeric powder, garam masala, and salt and mix
//                     Step 9: Add chopped tomatoes and cook until all the vegetables are soft
//                     Step 10: Add the cooked green peas and mashed eggplant and mix
//                     Step 11: Cook everything together for 5 - 7 minutes

//                 You can garnish the bharta with chopped coriander leaves and serve hot
   
//                 Source: https://www.indianfoodforever.com/vegetables/baigan-bharta.html`,
//                 "email": "Indian Food Forever",
//                 "ingredients": [
//                     "Medium Eggplant -  1",
//                     "Cooked green peas - 1/2 cup",
//                     "Onion - 1",
//                     "Tomato - 1",
//                     "Green chili - 1",
//                     "Red chili powder - 1/2 tsp",
//                     "Garam masala - 1/2 tsp",
//                     "Turmeric powder - 1/4 tsp",
//                     "Vegetable oil - 3 tbsp",
//                     "Salt - as per taste",
//                     "Coriander - 1 handful"
//                 ],
//                 "category": "Indian",
//                 "image": "baingan_bharta.png"
//             },
//             {
//                 "name": "Eggless Banana Bread",
//                 "description": `
               
//                 Step 1: Grab a big bowl and a sieve (a strainer that has holes small enough for sifting flour)
//                 Step 2: Add in the flour, baking powder, baking soda and salt into the sieve, sift it all into the big bowl, and set it aside (this will be referred to as your dry ingredients)
//                 Step 3: In a separate bowl, peel and add in the 2 overripe bananas, sugar, oil, and milk and mix until you get a combined mixture that is fully mixed (this will be referred to as your wet ingredients)
//                 Step 4: Add 1/2 of your dry ingredients into your wet ingredients but only fold them in. Do not overmix! You should still see little streaks of your dry ingredients left once you are done with your first half
//                 Step 5: Add in the second 1/2 of your dry ingredients and follow the same instructions as the previous step
//                 Step 6: Add in chopped walnuts and mix everything together
//                 Step 7: Preheat oven to 350°F
//                 Step 8: Line a bread pan (9x5) with parchment paper and pour the batter into the pan
//                 Step 9: Bake for 60 - 70 minutes
//                 Step 10: Poke the center of the bread with toothpick and check to see if the center comes out clean. If it does, you can remove the bread from the oven, otherwise continue baking and checking with the toothpick until the toothpick comes out clean
//                 Step 11: Allow the banana bread to cool fully before cutting it into slices

//                 Cut the banana bread into slices and serve!
   
//                 Source: https://spicesnflavors.com/vegan-banana-bread-recipe/`,
//                 "email": "Sushma Iyer",
//                 "ingredients": [
//                     "All purpose flour -  2 cups",
//                     "Baking powder - 1 1/2 tsp",
//                     "Baking soda - 1/2 tsp",
//                     "Salt - 1/2 tsp",
//                     "Overripe bananas - 2 (They should be almost fully black and have freckles)",
//                     "Sugar - 1 cup",
//                     "Oil - 1/3 cup",
//                     "Milk - 1/4 cup",
//                     "Vanilla - 1 tsp",
//                     "Chopped walnuts - 1/2 cup"
//                 ],
//                 "category": "Dessert",
//                 "image": "banana_bread.jpg"
//             },
//             {
//                 "name": "Eggless Pineapple Upside Down Cake",
//                 "description": `
              
//                 - Prepping the Ingredients -
//                     Step 1: Melt 6 tbsp of butter and let the 1/2 cup of butter soften
//                     Step 2: Drain the pineapple slices from the can and pat them dry 
//                     Step 3: Drain the cherries and  pat them dry

//                 - Preparing the Topping -
//                     Step 1: In a round baking pan (9 - 10"), pour in the 6 tbsp of melter butter and make sure it covers the entire bottom and all sides of the pan
//                     Step 2: Sprinkle the brown sugar evenly over the butter and spread it to cover the whole pan and the sides
//                     Step 3: Arrange the pineapple rings. Start by placing one ring in the center and then put the rest of the rings around it. For the sides, you can cut the rings in hald and place them on the side
//                     Step 4: Place the cherries in the center of the rings
//                     Step 5: Place the pan in the refridgerator while you prepare the batter

//                 - Making the Batter -
//                     Step 1: Preheat oven to 350°F
//                     Step 2: In a bowl, whisk together flour, baking powder, and baking soda
//                     Step 3: in a small bowl, combine the milk and vinegar together and set aside
//                     Step 4: In a large bowl, beat together the sugar and 1/2 cup of softened butter until it is plate and creamy (this should take about 3-4 minutes)
//                     Step 5: Add in the salt and vanilla extract and mix to combine
//                     Step 6: Into the sugar and butter mixture, sift in half of the flour mixture
//                     Step 7: Mix everything to combine
//                     Step 8: Slowly add in the milk and vinegar mizture to this
//                     Step 9: Add in the second half of the flour mixture and combine thoroughly but do not overmix
//                     Step 10: Pour the cake mixture into the pan
//                     Step 11: Bake for 30 minutes
//                     Step 12: Take the pan out of the oven and loosely cover it with foil
//                     Step 13: Place it back in the oven and bake for another 15 - 20 minutes. You can insert a toothpick in the middle to see if it comes out clean. If it does, it is baked properly, otherwise you need to bake it longer
//                     Step 14: Remove from the oven and let it cool in the pan for about 20 minutes
//                     Step 15: Run a thin mettal spatula or knife around the inside rim of the pan to loosen the cake and flip it upside down onto a serving dish

//                 Serve and enjoy!
               
//                 Source: https://mommyshomecooking.com/eggless-pineapple-upside-down-cake/#recipe`,
//                 "email": "Oriana Romero",
//                 "ingredients": [
//                     "Unsalted butter -  6 tbsp + 1/2 cup",
//                     "Brown sugar - 1/2 cup",
//                     "Pineapple rings - 10",
//                     "Maraschino cherries - 15-20",
//                     "All-purpose flour - 2 cups",
//                     "Baking powder - 3 tsp",
//                     "Baking soda - 1/4 tsp",
//                     "Milk - 1 cup",
//                     "Apple cider vinegar or white vinegar - 1 tbsp",
//                     "Sugar - 1 cup",
//                     "Salt - 1/4 tsp",
//                     "Vanilla extract - 1 tsp"
//                 ],
//                 "category": "Dessert",
//                 "image": "pineapple_upside_down_cake.png"
//             },
//             {
//                 "name": "Eggless Blueberry Muffins",
//                 "description": `
              
//                 Step 1: In a bowl, add in the plain yogurt and oil and whisk together until thoroughly combined
//                 Step 2: Add in the sugar and whisk
//                 Step 3: Add in the vanilla extract and whisk
//                 Step 4: Add in the all purpose flour and whisk
//                 Step 5: Add in the salt and baking powder and whisk
//                 Step 6: Add in 1/4 cup of milk and whisk
//                 Step 7: Add in 1 tbsp of milk and whisk
//                 Step 8: Fold in the blueberries
//                 Step 10: Grab a cupcake pan and place 6 cupcake liners in 6 molds
//                 Step 11: Fill each cupcake liner eith batter until it is 3/4 full
//                 Step 12: Top each batter off with 1 tsp of sugar
//                 Step 13: Bake at 350°F for 20 - 25 minutes
               
//                 Source: https://www.youtube.com/watch?v=r59WXcjsNxE`,
//                 "email": "Harshita's Kitchen",
//                 "ingredients": [
//                     "Plain yogurt -  2 tbsp",
//                     "Vegetable oil - 2 1/2 tbsp",
//                     "Sugar - 6 tbsp",
//                     "Vanilla extract - 3/4 tsp",
//                     "All purpose flour - 3/4 cup",
//                     "Salt - 1/8 tsp",
//                     "Baking powder - 1 tsp",
//                     "Milk - 1/4 cup + 1 tbsp",
//                     "Blueberries - 1/4 cup"
//                 ],
//                 "category": "Dessert",
//                 "image": "blueberry_muffin.png"
//             },
//             {
//                 "name": "Eggless Marble Cake",
//                 "description": `
              
//                 Step 1: Preheat the oven to 350°F for at least 15 minutes
//                 Step 2: Grab a 0.5 x 5 inch loaf pan and lightly grease it
//                 Step 3: In a big bowl, mix the flour, baking powder, baking soda, and salt and set side
//                 Step 4: In another bowl, mix together milk and vinegar and set aside
//                 Step 5: In a separate bowl, beat the butter and sugar together just until they are mixed
//                 Step 6: Once those ingredients are mixed, add in vanilla extract and beat again just until it is mixed
//                 Step 7: Add in the flour mixture to the milk mixture and beat just until combined
//                 Step 8: In a separate bowl, stir together the cocoa powder, hot water, and espresso powder
//                 Step 9: In a separate small bowl, place 1/3 of the vanilla batter and fold in the cocoa mixture into the batter until it is fully combined
//                 Step 10: Spread 1/3 of the vanilla batter into the loaf pan
//                 Step 11: Place 1/2 of the chocolate batter on top of the vanilla batter (do not mix or spread out)
//                 Step 12: Place 1/3 of the vanilla batter on top of the chocolate batter (do not mix or spread out)
//                 Step 13: Place the remaining chocolate batter on top of the vanilla batter (do not mix or spread out)
//                 Step 14: Place the remaining vanilla batter on top of the chocolate batter
//                 Step 15: Bake at 350°F for 50 - 60 minutes or until a toothpick poked in the center of the load comes out clean
//                 Step 16: Let the loaf fully cool before taking it out of the pan

//                 Remove the cake from the pan and serve.
               
//                 Source: https://mommyshomecooking.com/eggless-marble-cake/#recipe`,
//                 "email": "Oriana Romero",
//                 "ingredients": [
//                     "All-purpose flour -  3 cups",
//                     "Baking powder - 3 tsp",
//                     "Baking soda - 1/4 tsp",
//                     "Salt - 1/2 tsp",
//                     "Milk - 1 and 1/2 cup",
//                     "Apple cider vinegar or white vinegar - 1 and 1/2 tbsp",
//                     "Softended unsalted butter - 3/4 cup",
//                     "Sugar - 1 and 1/2 cups",
//                     "Vanilla extract - 2 tsps",
//                     "Hot water - 1/3 cup",
//                     "Unsweetened cocoa powder - 1/4 cup",
//                     "Instant espresso powder (optional) - 1/2 tsp"
//                 ],
//                 "category": "Dessert",
//                 "image": "marble_cake.png"
//             },
//         ]);
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// insertCategoryData();
// insertRecipeData();