

function populateDB(){
	db.transaction(function(transaction) {


		transaction.executeSql('INSERT OR IGNORE INTO AllRecipes(RecipeID, RecipeName, Ingredient1, Ingredient2, Ingredient3) VALUES ("1","Tuna Pasta","tuna","pasta","mayo")');

		transaction.executeSql('INSERT OR IGNORE INTO AllRecipes(RecipeID, RecipeName, Ingredient1, Ingredient2, Ingredient3) VALUES ("2","Cheesy Pasta","cheese","pasta","pepper")');
		
		transaction.executeSql('INSERT OR IGNORE INTO AllRecipes(RecipeID, RecipeName, Ingredient1, Ingredient2, Ingredient3) VALUES ("3","Tomato Pasta","tomatoes","pasta","basil")');
		

	},errorHandler,nullHandler);
}