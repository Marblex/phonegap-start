
//slide-in menu
jQuery(document).ready(function($) {
	$('.toggle-menu').jPushMenu();
});

function addIngredient(){
	var ingsFormDiv = document.getElementById("ingredientsForm");

	if(numIngs < 8){

		ingID = numIngs + 1;

		ingsFormDiv.innerHTML = ingsFormDiv.innerHTML + '<input type="text" placeholder="Ingredient ' + ingID + '" id="ingredient' + ingID + '"=></input>';

		numIngs ++;
	}
	else{
		alert('You can only enter up to 8 ingredients.');
	}

}


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

function pageLoad(){
	onBodyLoad();
	showMyRecipes();
}
		 
// called when the application loads
function onBodyLoad(){

	numIngs = 3;
		 
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
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS AllRecipes(RecipeID INTEGER PRIMARY KEY AUTOINCREMENT, RecipeName TEXT NOT NULL, RecipeType TEXT NOT NULL, Ingredient1 TEXT NOT NULL, Ingredient2 TEXT NOT NULL, Ingredient3 TEXT NOT NULL)',[],nullHandler,errorHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS MyRecipes(MyRecipeID INTEGER PRIMARY KEY AUTOINCREMENT, MyRecipeName TEXT NOT NULL, MyRecipeType TEXT NOT NULL, MyIngredient1 TEXT NOT NULL, MyIngredient2 TEXT NOT NULL, MyIngredient3 TEXT NOT NULL)',[],nullHandler,errorHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Results(ResultsRecipeID INTEGER PRIMARY KEY AUTOINCREMENT, ResultsRecipeName TEXT NOT NULL, ResultsRecipeType TEXT NOT NULL, ResultsIngredient1 TEXT NOT NULL, ResultsIngredient2 TEXT NOT NULL, ResultsIngredient3 TEXT NOT NULL, ResultsMissingIngredients,NumMissingIngredients)',[],nullHandler,errorHandler);

	},errorHandler,successCallBack);

	populateDB();
 
}


function DropDB(){
	db.transaction(function(tx){
		tx.executeSql( 'DROP TABLE AllRecipes',nullHandler,nullHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS AllRecipes(RecipeID INTEGER PRIMARY KEY AUTOINCREMENT, RecipeName TEXT NOT NULL, RecipeType TEXT NOT NULL, Ingredient1 TEXT NOT NULL, Ingredient2 TEXT NOT NULL, Ingredient3 TEXT NOT NULL)',[],nullHandler,errorHandler);
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
		          	$('#lbRecipes').append('<br>' + row.RecipeName + ' ' + row.RecipeType + ' ' + row.Ingredient1 + ' ' + row.Ingredient2 + ' ' + row.Ingredient3 + ' ');
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
	
 	var newRecipeName = document.getElementById("newRecipeName").value;
 	var newIngredient1 = document.getElementById("newIngredient1").value;
 	var newIngredient2 = document.getElementById("newIngredient2").value;
 	var newIngredient3 = document.getElementById("newIngredient3").value;

 	if (document.getElementById('newNone').checked){
		newRecipeType = 'none';
	}
	if (document.getElementById('newVegetarian').checked){
		newRecipeType = 'vegetarian';
	}
	if (document.getElementById('newVegan').checked){
		userRecipeType = 'vegan';
	}
	if (document.getElementById('newGlutenFree').checked){
		userRecipeType = 'glutenFree';
	}

	// this is the section that actually inserts the values into the User table
	db.transaction(function(transaction) {
		transaction.executeSql('INSERT INTO AllRecipes(RecipeName, RecipeType, Ingredient1, Ingredient2, Ingredient3) VALUES (?,?,?,?,?)',[newRecipeName,newRecipeType,newIngredient1,newIngredient2,newIngredient3],nullHandler,errorHandler);
	});

	// this calls the function that will show what is in the User table in the database
	ListDBValues();
		 
	return false;
		 
}



function find() {

	var userIngredient1 = document.getElementById("ingredient1").value;
    var userIngredient2 = document.getElementById("ingredient2").value;
    var userIngredient3 = document.getElementById("ingredient3").value;

	if (document.getElementById('numExtraIngsOne').checked) {
		extraIngredients = 1;
	}
	if (document.getElementById('numExtraIngsTwo').checked) {
		extraIngredients = 2;
	}
	if (document.getElementById('numExtraIngsThree').checked) {
		extraIngredients = 3;
	}
	if (document.getElementById('numExtraIngsFour').checked) {
		extraIngredients = 4;
	}

	var userRecType;

	if (document.getElementById('allRecs').checked){
		userRecType = 'all';
	}
	if (document.getElementById('vegetarian').checked){
		userRecType = 'vegetarian';
	}
	if (document.getElementById('vegan').checked){
		userRecType = 'vegan';
	}
	if (document.getElementById('glutenFree').checked){
		userRecType = 'glutenFree';
	}

    div = document.getElementById("results");
    div.innerHTML = ("");
    

    document.getElementById("background").style.padding="70px 0px 0px 0px";

	$(".content").hide();

	if (!window.openDatabase) {
  		alert('Databases are not supported in this browser.');
  		return;
 	}

 	db.transaction(function(tx){
		tx.executeSql( 'DELETE FROM Results',nullHandler,nullHandler);
	},errorHandler,successCallBack);

	// this line clears out any content in the #lbUsers element on the page so that the next few lines will show updated
	// content and not just keep repeating lines
 	$('#lbRecipes').html('');
 
	// this next section will select all the content from the User table and then go through it row by row
	// appending the UserId  FirstName  LastName to the  #lbUsers element on the page
 	db.transaction(function(transaction) {
 		//transaction.executeSql('DELETE FROM Results');
   		transaction.executeSql('SELECT * FROM AllRecipes;', [], function(transaction, result) {
      		if (result != null && result.rows != null) {
        		for (var i = 0; i < result.rows.length; i++) {
          			var row = result.rows.item(i);
          			
          			var recipeName = row.RecipeName
          			var ingredient1 = row.Ingredient1
			   	 	var ingredient2 = row.Ingredient2
			  		var ingredient3 = row.Ingredient3
			  		var recType = row.RecipeType

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

					var numMissingIngs = missingIngredients.length;

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

					if(userRecType == 'all' || userRecType == recType || recType == 'vegan' && userRecType == 'vegetarian'){

						if(match == numOfIngredients){
							missingIngredients = "none";
							addToResultsDB(row, missingIngredients, numMissingIngs);
						}

						if(extraIngredients > 0){
							if(match == numOfIngredients - 1){
								addToResultsDB(row, missingIngredients, numMissingIngs);
							}
						}

						if (extraIngredients > 1){
							if(match == numOfIngredients - 2){
								addToResultsDB(row, missingIngredients, numMissingIngs);
							}
						}

					}
        		}

        		showResults();

      		}
     	},errorHandler);
 	},errorHandler,nullHandler);

	document.getElementById("hidden").style.display = 'block';
}


function addToResultsDB(row, missingIngredients, numMissingIngs){
	
	db.transaction(function(transaction){
		transaction.executeSql('INSERT INTO Results(ResultsRecipeName, ResultsRecipeType, ResultsIngredient1, ResultsIngredient2, ResultsIngredient3, ResultsMissingIngredients,NumMissingIngredients) VALUES (?,?,?,?,?,?,?)',[row.RecipeName,row.RecipeType,row.Ingredient1,row.Ingredient2,row.Ingredient3,missingIngredients,numMissingIngs],nullHandler,errorHandler);
	},errorHandler,successCallBack);

}


function sortResults(){

	div.innerHTML = ("");

	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM Results ORDER BY NumMissingIngredients ASC', [], function(transaction, result) {
			if (result != null && result.rows != null) {
		        for (var i = 0; i < result.rows.length; i++) {
		        	var row = result.rows.item(i);
					div.innerHTML = div.innerHTML + '<div class="searchResult"> <div class="recipeNames">' + row.ResultsRecipeName + '</div><a href="#" class="addButton" onclick="addToMyRecipes(' + row.ResultsRecipeID + ')">+</a>(Additional ingredients needed: ' + row.ResultsMissingIngredients + ')<br><br><br><br></div>'
		        }
			}
		},errorHandler);
	},errorHandler,nullHandler);

}

function showResults(){

	resultsText.innerHTML = "You found recipe(s)";

	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM Results', [], function(transaction, result) {
			if (result != null && result.rows != null) {
		        for (var i = 0; i < result.rows.length; i++) {
		        	var row = result.rows.item(i);

					div.innerHTML = div.innerHTML + '<div class="searchResult"> <div class="recipeNames">' + row.ResultsRecipeName + '</div><a href="#" class="addButton" onclick="addToMyRecipes(' + row.ResultsRecipeID + ')">+</a>(Additional ingredients needed: ' + row.ResultsMissingIngredients + ')<br><br><br><br></div>'
		        }
			}
		},errorHandler);
	},errorHandler,nullHandler);
		 
}

function DropResultsDB(){
	db.transaction(function(transaction){
		transaction.executeSql('DROP TABLE Results');
		transaction.executeSql('CREATE TABLE IF NOT EXISTS Results(ResultsRecipeID INTEGER PRIMARY KEY AUTOINCREMENT, ResultsRecipeName TEXT NOT NULL, ResultsRecipeType TEXT NOT NULL, ResultsIngredient1 TEXT NOT NULL, ResultsIngredient2 TEXT NOT NULL, ResultsIngredient3 TEXT NOT NULL, ResultsMissingIngredients)',[],nullHandler,errorHandler);

	})

	showResults();
}


function addToMyRecipes(id){

	db.transaction(function(transaction){
		transaction.executeSql('SELECT * FROM Results WHERE ResultsRecipeID=?', [id], function(transaction, result) {
	      		
      		var row = result.rows.item(0);
      	
  			db.transaction(function(transaction) {
		  		transaction.executeSql('INSERT INTO MyRecipes(MyRecipeName, MyRecipeType, MyIngredient1, MyIngredient2, MyIngredient3) VALUES (?,?,?,?,?)',[row.ResultsRecipeName,row.ResultsRecipeType,row.ResultsIngredient1,row.ResultsIngredient2,row.ResultsIngredient3]);
			});

  			alert("Added to My Recipes");	
		        
		},errorHandler);
	},errorHandler,nullHandler);

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

	myRecipes = document.getElementById("MyRecipes");
	myRecipes.innerHTML = "";

	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM MyRecipes', [], function(transaction, result) {
			if (result != null && result.rows != null) {
		        for (var i = 0; i < result.rows.length; i++) {
		        	var row = result.rows.item(i);

		          	var myRecipeID = row.MyRecipeID

		          	myRecipes.innerHTML = myRecipes.innerHTML + '<div class="searchResult"> <div class="recipeNames">' + row.MyRecipeName + '</div><a href="#" class="addButton" onclick="removeFromMyRecipes(' + myRecipeID + ')">-</a></div><br><br>';
		        }
			}
		},errorHandler);
	},errorHandler,nullHandler);
		 
	MyListDBValues();

}


function removeFromMyRecipes(myRecipeID){

	db.transaction(function(transaction) {
    	transaction.executeSql("DELETE FROM MyRecipes WHERE MyRecipeID=?", [myRecipeID]);
	});
	
	showMyRecipes();

}
















