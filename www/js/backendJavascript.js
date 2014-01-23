
//slide-in menu
jQuery(document).ready(function($) {
	$('.toggle-menu').jPushMenu();
});


// global variables
var db;
var shortName = 'WebSqlDB';
var version = '1.0';
var displayName = 'WebSqlDB';
var maxSize = 65535;
		 
// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
	console.log('Error: ' + error.message + ' code: ' + error.code);
		 
}
		 
// this is called when a successful transaction happens
function successCallBack() {
	//alert("DEBUGGING: success");
		 
}
		 
function nullHandler(){};
		 
// called when the application loads
function onBodyLoad(){
		 
	if (!window.openDatabase) {
	// not all mobile devices support databases  if it does not, the following alert will display
	// indicating the device will not be able to run this application
		alert('Databases are not supported in this browser.');
		return;
	}
		 
	// this line tries to open the database base locally on the device
	// if it does not exist, it will create it and return a database object stored in variable db
	db = openDatabase(shortName, version, displayName,maxSize);
		 
	// this line will try to create the table User in the database just created/openned
	db.transaction(function(tx){
		// Uncomment next line to reset table each time app opens
		//tx.executeSql( 'DROP TABLE User',nullHandler,nullHandler);
		// this line actually creates the table User if it does not exist and sets up the three columns and their types
		// note the UserId column is an auto incrementing column which is useful if you want to pull back distinct rows
		// easily from the table.
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS AllRecipes(RecipeID INTEGER PRIMARY KEY AUTOINCREMENT, RecipeName TEXT NOT NULL, Ingredient1 TEXT NOT NULL, Ingredient2 TEXT NOT NULL, Ingredient3 TEXT NOT NULL)',[],nullHandler,errorHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS MyRecipes(MyRecipeID INTEGER PRIMARY KEY AUTOINCREMENT, MyRecipeName TEXT NOT NULL, MyIngredient1 TEXT NOT NULL, MyIngredient2 TEXT NOT NULL, MyIngredient3 TEXT NOT NULL)',[],nullHandler,errorHandler);

	},errorHandler,successCallBack);

	populateDB();
}


function DropDB(){
	db.transaction(function(tx){
		tx.executeSql( 'DROP TABLE AllRecipes',nullHandler,nullHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS AllRecipes(RecipeID INTEGER PRIMARY KEY AUTOINCREMENT, RecipeName TEXT NOT NULL, Ingredient1 TEXT NOT NULL, Ingredient2 TEXT NOT NULL, Ingredient3 TEXT NOT NULL)',[],nullHandler,errorHandler);
	},errorHandler,successCallBack);

	ListDBValues();
}

function MyDropDB(){
	db.transaction(function(tx){
		tx.executeSql( 'DROP TABLE MyRecipes',nullHandler,nullHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS MyRecipes(MyRecipeID INTEGER PRIMARY KEY AUTOINCREMENT, MyRecipeName TEXT NOT NULL, MyIngredient1 TEXT NOT NULL, MyIngredient2 TEXT NOT NULL, MyIngredient3 TEXT NOT NULL)',[],nullHandler,errorHandler);
	},errorHandler,successCallBack);

	ListDBValues();
}
		 
// list the values in the database to the screen using jquery to update the #lbUsers element
function ListDBValues() {
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
		 
	// this line clears out any content in the #lbUsers element on the page so that the next few lines will show updated
	// content and not just keep repeating lines
	$('#lbRecipes').html('');
		 
	// this next section will select all the content from the User table and then go through it row by row
	// appending the UserId  FirstName  LastName to the  #lbUsers element on the page
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM AllRecipes;', [], function(transaction, result) {
			if (result != null && result.rows != null) {
		        for (var i = 0; i < result.rows.length; i++) {
		          	var row = result.rows.item(i);
		          	$('#lbRecipes').append('<br>' + row.RecipeName+ ' ' + row.Ingredient1+ ' ' + row.Ingredient2+ ' ' + row.Ingredient3+ ' ');
		        }
			}
		},errorHandler);
	},errorHandler,nullHandler);
		 
	return;
		 
}
		 
// this is the function that puts values into the database using the values from the text boxes on the screen
function AddValueToDB() {
	if (!window.openDatabase) {
   		alert('Databases are not supported in this browser.');
   	return;
 	}
		 	
	// this is the section that actually inserts the values into the User table
	db.transaction(function(transaction) {
		transaction.executeSql('INSERT INTO AllRecipes(RecipeName, Ingredient1, Ingredient2, Ingredient3) VALUES (?,?,?,?)',[$('#txRecipeName').val(), $('#txIngredient1').val(), $('#txIngredient2').val(), $('#txIngredient3').val()],nullHandler,errorHandler);
	});

	// this calls the function that will show what is in the User table in the database
	ListDBValues();
		 
	return false;
		 
}



function find() {

		var userIngredient1 = document.getElementById("ingredient1").value;
	    var userIngredient2 = document.getElementById("ingredient2").value;
	    var userIngredient3 = document.getElementById("ingredient3").value;

	    var extraIngredients = document.getElementById("additionalIngredients").value;

	    div = document.getElementById("results");
	    div.innerHTML = "";

		if (!window.openDatabase) {
	  		alert('Databases are not supported in this browser.');
	  		return;
	 	}
		 
		// this line clears out any content in the #lbUsers element on the page so that the next few lines will show updated
		// content and not just keep repeating lines
	 	$('#lbRecipes').html('');
	 
		// this next section will select all the content from the User table and then go through it row by row
		// appending the UserId  FirstName  LastName to the  #lbUsers element on the page
	 	db.transaction(function(transaction) {
	   		transaction.executeSql('SELECT * FROM AllRecipes;', [], function(transaction, result) {
	      		if (result != null && result.rows != null) {
	        		for (var i = 0; i < result.rows.length; i++) {
	          			var row = result.rows.item(i);
	          			
	          			var recipeName = row.RecipeName
	          			var ingredient1 = row.Ingredient1
				   	 	var ingredient2 = row.Ingredient2
				  		var ingredient3 = row.Ingredient3
					

						var match = 0;

						var missingIngredients = [];


						if(ingredient1 == userIngredient1 || ingredient1 == userIngredient2 || ingredient1 == userIngredient3){
							match ++;
						}
						else{
							missingIngredients.push(row.Ingredient1);
						} 

						if(ingredient2 == userIngredient1 || ingredient2 == userIngredient2 || ingredient2 == userIngredient3){
							match ++;
						}
						else{
							missingIngredients.push(row.Ingredient2);
						} 

						if(ingredient3 == userIngredient1 || ingredient3 == userIngredient2 || ingredient3 == userIngredient3){
							match ++;
						}
						else{
							missingIngredients.push(row.Ingredient3);
						} 


						var numOfIngredients = 0;

						if(ingredient1 != null){
							numOfIngredients ++;
						} 

						if(ingredient2 != null){
							numOfIngredients ++;
						} 

						if(ingredient3 != null){
							numOfIngredients ++;
						} 


						var oneIngredientNeeded = numOfIngredients - 1;     
						var twoIngredientNeeded = numOfIngredients - 2;     


						if(match == numOfIngredients){
							missingIngredients = "none";
							display(row, missingIngredients);

						}
						if(extraIngredients > 0){
							if(match == oneIngredientNeeded){
								display(row, missingIngredients);
							}
						}
						if (extraIngredients > 1){
							if(match == twoIngredientNeeded){
								display(row, missingIngredients);
							}
						}
	        		}
	      		}
	     	},errorHandler);
	 	},errorHandler,nullHandler);
	 
	 	return;
	 
}


function display(row, missingIngredients){
	var id = row.RecipeID
	
	div.innerHTML = div.innerHTML + '<div class="searchResult"> <div class="recipeNames">' + row.RecipeName + '</div><a href="#" class="addButton" onclick="addToMyRecipes(' + id + ')">+</a>(ingredients needed: ' + missingIngredients + ')<br><br><br><br></div></br>'
}


function addToMyRecipes(id){

	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM AllRecipes;', [], function(transaction, result) {
			if (result != null && result.rows != null) {
		        for (var i = 0; i < result.rows.length; i++) {
		          	var row = result.rows.item(i);
		          	
		          	if(row.RecipeID == id){
		          		var MyID = row.RecipeID
          				var newName = row.RecipeName
          				var ing1 = row.Ingredient1
			   	 		var ing2 = row.Ingredient2
			  			var ing3 = row.Ingredient3

			  			db.transaction(function(transaction) {
					  		transaction.executeSql('INSERT INTO MyRecipes(MyRecipeName, MyIngredient1, MyIngredient2, MyIngredient3) VALUES (?,?,?,?)',[newName, ing1, ing2, ing3]);
						});

			  			alert("Added to My Recipes");
			  		}
		        }
			}
		},errorHandler);
	},errorHandler,nullHandler);

	MyListDBValues();

}


function MyListDBValues() {
	
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
		 
	// this line clears out any content in the #lbUsers element on the page so that the next few lines will show updated
	// content and not just keep repeating lines
	$('#MylbRecipes').html('');
		 
	// this next section will select all the content from the User table and then go through it row by row
	// appending the UserId  FirstName  LastName to the  #lbUsers element on the page
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM MyRecipes;', [], function(transaction, result) {
			if (result != null && result.rows != null) {
		        for (var i = 0; i < result.rows.length; i++) {
		          	var row = result.rows.item(i);
		          	$('#MylbRecipes').append('<br>' + row.MyRecipeName+ ' ' + row.MyIngredient1+ ' ' + row.MyIngredient2+ ' ' + row.MyIngredient3+ ' ');
		        }
			}
		},errorHandler);
	},errorHandler,nullHandler);
		 
	return;
		 
}


function showMyRecipes(){

	db = openDatabase(shortName, version, displayName,maxSize);

	myRecipes = document.getElementById("MyRecipes");
	myRecipes.innerHTML = "";

	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM MyRecipes;', [], function(transaction, result) {
			if (result != null && result.rows != null) {
		        for (var i = 0; i < result.rows.length; i++) {
		          	var row = result.rows.item(i);

		          	var myRecipeID = row.MyRecipeID

		          	myRecipes.innerHTML = myRecipes.innerHTML + row.MyRecipeName + '<button onclick="removeFromMyRecipes(' + myRecipeID + ')">Remove from My Recipes</button> <br><br>';
		        }
			}
		},errorHandler);
	},errorHandler,nullHandler);
		 
	return;

}

function removeFromMyRecipes(myRecipeID){

	db.transaction(function(transaction) {
    	transaction.executeSql("DELETE FROM MyRecipes WHERE MyRecipeID=?", [myRecipeID]);
	});
	
	showMyRecipes();

}
















