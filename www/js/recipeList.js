
function populateDB(){
	db.transaction(function(transaction) {

		transaction.executeSql("INSERT OR IGNORE INTO AllRecipes(RecipeID, RecipeName, RecipeType, RecipeRating, RecipeDescription, Ingredient1, Ingredient2, Ingredient3, Ingredient4, Ingredient5, Ingredient6, Ingredient7, Ingredient8, OpIngredient1, OpIngredient2, OpIngredient3) VALUES ('1','Tuna Pasta','all','4','This is the description of tuna pasta','tuna','pasta','mayonaise','sweetcorn','pepper','water','oil','stock','salt','basil','cinnamon')");
		transaction.executeSql("INSERT OR IGNORE INTO AllRecipes(RecipeID, RecipeName, RecipeType, RecipeRating, RecipeDescription, Ingredient1, Ingredient2, Ingredient3, OpIngredient1) VALUES ('2','Cheesy Pasta','vegetarian','2','This is the description of cheesy pasta','cheese','pasta','pepper','herbs')");
		transaction.executeSql("INSERT OR IGNORE INTO AllRecipes(RecipeID, RecipeName, RecipeType, RecipeRating, RecipeDescription, Ingredient1, Ingredient2, Ingredient3, OpIngredient1) VALUES ('3','Tomato Pasta','vegan','4','This is the description of tomato pasta','tomatoes','pasta','basil','puree')");
		
	},errorHandler,nullHandler);
}