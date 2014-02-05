

function populateDB(){
	db.transaction(function(transaction) {


		transaction.executeSql('INSERT OR IGNORE INTO AllRecipes(RecipeID, RecipeName, RecipeType, Ingredient1, Ingredient2, Ingredient3) VALUES ("1","Tuna Pasta","all","tuna","pasta","mayo")');

		transaction.executeSql('INSERT OR IGNORE INTO AllRecipes(RecipeID, RecipeName, RecipeType, Ingredient1, Ingredient2, Ingredient3) VALUES ("2","Cheesy Pasta","vegetarian","cheese","pasta","pepper")');
		
		transaction.executeSql('INSERT OR IGNORE INTO AllRecipes(RecipeID, RecipeName, RecipeType, Ingredient1, Ingredient2, Ingredient3) VALUES ("3","Tomato Pasta","vegan","tomatoes","pasta","basil")');
		

	},errorHandler,nullHandler);
}