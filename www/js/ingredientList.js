
function populateIngredientList(){
	db.transaction(function(transaction) {

		transaction.executeSql('INSERT OR IGNORE INTO Ingredients(IngredientID, IngredientName, IngredientRating) VALUES ("1","tuna","4.0")');
		transaction.executeSql('INSERT OR IGNORE INTO Ingredients(IngredientID, IngredientName, IngredientRating) VALUES ("2","pasta","3.0")');
		transaction.executeSql('INSERT OR IGNORE INTO Ingredients(IngredientID, IngredientName, IngredientRating) VALUES ("3","mayo","2.0")');
		transaction.executeSql('INSERT OR IGNORE INTO Ingredients(IngredientID, IngredientName, IngredientRating) VALUES ("4","cheese","1.0")');
		transaction.executeSql('INSERT OR IGNORE INTO Ingredients(IngredientID, IngredientName, IngredientRating) VALUES ("5","pepper","3.0")');
		transaction.executeSql('INSERT OR IGNORE INTO Ingredients(IngredientID, IngredientName, IngredientRating) VALUES ("6","tomatoes","5.0")');
		transaction.executeSql('INSERT OR IGNORE INTO Ingredients(IngredientID, IngredientName, IngredientRating) VALUES ("7","basil","3.0")');
		transaction.executeSql('INSERT OR IGNORE INTO Ingredients(IngredientID, IngredientName, IngredientRating) VALUES ("8","chocolate","1.0")');
		transaction.executeSql('INSERT OR IGNORE INTO Ingredients(IngredientID, IngredientName, IngredientRating) VALUES ("9","chicken","5.0")');
		transaction.executeSql('INSERT OR IGNORE INTO Ingredients(IngredientID, IngredientName, IngredientRating) VALUES ("10","salmon","5.0")');
		transaction.executeSql('INSERT OR IGNORE INTO Ingredients(IngredientID, IngredientName, IngredientRating) VALUES ("11","flour","3.0")');
		transaction.executeSql('INSERT OR IGNORE INTO Ingredients(IngredientID, IngredientName, IngredientRating) VALUES ("12","egg","3.0")');
		transaction.executeSql('INSERT OR IGNORE INTO Ingredients(IngredientID, IngredientName, IngredientRating) VALUES ("13","sugar","1.0")');
		transaction.executeSql('INSERT OR IGNORE INTO Ingredients(IngredientID, IngredientName, IngredientRating) VALUES ("14","apple","5.0")');
		transaction.executeSql('INSERT OR IGNORE INTO Ingredients(IngredientID, IngredientName, IngredientRating) VALUES ("15","banana","5.0")');
		transaction.executeSql('INSERT OR IGNORE INTO Ingredients(IngredientID, IngredientName, IngredientRating) VALUES ("16","orange","5.0")');



	},errorHandler,nullHandler);
}