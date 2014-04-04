
//slide-in menu
jQuery(document).ready(function($) {
	$('.toggle-menu').jPushMenu();
});

function addIngredient(){
	var ingsFormDiv = document.getElementById("ingredientsForm");
	var addIngsFormDiv = document.getElementById("addIngredientsForm");
	var content = document.createElement('div');

	if(numIngs < 8){

		ingID = numIngs + 1;

		if(addReady == "index"){

			content.innerHTML = '<input type="text" placeholder="Ingredient ' + ingID + '" id="ingredient' + ingID + '"=></input>'
			ingsFormDiv.appendChild(content);

		}

		if(addReady == "add"){

			content.innerHTML = '<input type="text" placeholder="Ingredient ' + ingID + '" id="newIngredient' + ingID + '"=></input>'
			addIngsFormDiv.appendChild(content);

		}

		numIngs ++;
	}
	else{
		alert('You can only enter up to 8 ingredients.');
	}

}

function addOptionalIngredient(){
	var optionalIngsDiv = document.getElementById("optionalIngredients");
	var newContent = document.createElement('div');

	if(numOptionalIngs < 3){

		opIngID = numOptionalIngs + 1;

		newContent.innerHTML = '<input type="text" placeholder="Optional ingredient ' + opIngID + '" id="newOpIngredient' + opIngID + '"=></input>'
		optionalIngsDiv.appendChild(newContent);

		numOptionalIngs ++;
	}
	else{
		alert('You can only enter up to 3 optional ingredients.');
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

function myRecipesPageLoad(){
	onBodyLoad();
	showMyRecipes();
}
		 
// called when the application loads
function onBodyLoad(){

	numIngs = 3;
	numOptionalIngs = 0;
		 
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
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS AllRecipes(RecipeID INTEGER PRIMARY KEY AUTOINCREMENT, RecipeName, RecipeType, RecipeRating, RecipeDescription, Ingredient1, Ingredient2, Ingredient3, Ingredient4, Ingredient5, Ingredient6, Ingredient7, Ingredient8, OpIngredient1, OpIngredient2, OpIngredient3)',[],nullHandler,errorHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS MyRecipes(MyRecipeID INTEGER PRIMARY KEY AUTOINCREMENT, ForeignRecipeID)',[],nullHandler,errorHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Results(ResultsRecipeID INTEGER PRIMARY KEY AUTOINCREMENT, ResultsMainID, ResultsRecipeRating, ResultsMissingIngredients, NumMissingIngredients)',[],nullHandler,errorHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Ingredients(IngredientID INTEGER PRIMARY KEY AUTOINCREMENT, IngredientName, IngredientRating)',[],nullHandler,errorHandler);

	},errorHandler,successCallBack);

	populateDB();
	populateIngredientList();


}


function DropDB(){
	db.transaction(function(tx){
		tx.executeSql( 'DROP TABLE AllRecipes',nullHandler,nullHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS AllRecipes(RecipeID INTEGER PRIMARY KEY AUTOINCREMENT, RecipeName, RecipeType, RecipeRating, RecipeDescription, Ingredient1, Ingredient2, Ingredient3, Ingredient4, Ingredient5, Ingredient6, Ingredient7, Ingredient8, OpIngredient1, OpIngredient2, OpIngredient3)',[],nullHandler,errorHandler);
	
		tx.executeSql( 'DROP TABLE Ingredients',nullHandler,nullHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Ingredients(IngredientID INTEGER PRIMARY KEY AUTOINCREMENT, IngredientName, IngredientRating)',[],nullHandler,errorHandler);
	
		tx.executeSql( 'DROP TABLE Results',nullHandler,nullHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Results(ResultsRecipeID INTEGER PRIMARY KEY AUTOINCREMENT, ResultsMainID, ResultsRecipeRating, ResultsMissingIngredients, NumMissingIngredients)',[],nullHandler,errorHandler);

		tx.executeSql( 'DROP TABLE MyRecipes',nullHandler,nullHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS MyRecipes(MyRecipeID INTEGER PRIMARY KEY AUTOINCREMENT, ForeignRecipeID)',[],nullHandler,errorHandler);


	},errorHandler,successCallBack);
	
	populateDB();
	populateIngredientList();

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
		          	$('#lbRecipes').append('<br>' + row.RecipeName + ' ' + row.RecipeType + ' ' + row.RecipeRating + ' ' + row.RecipeDescription + ' ' + row.Ingredient1 + ' ' + row.Ingredient2 + ' ' + row.Ingredient3 + ' ' + row.Ingredient4 + ' ' + row.Ingredient5 + ' ' + row.Ingredient6 + ' ' + row.Ingredient7 + ' ' + row.Ingredient8 + ' ' + row.OpIngredient1 + ' ' + row.OpIngredient2 + ' ' + row.OpIngredient3);
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

 	var addIngredientsArray = [];
	var inputFields = 3;


 	var newIngredient1 = document.getElementById("newIngredient1").value;
	if(newIngredient1 !== null){
    	addIngredientsArray.push(newIngredient1);
    }

	var newIngredient2 = document.getElementById("newIngredient2").value;
	if(newIngredient2 !== null){
    	addIngredientsArray.push(newIngredient2);
    }

    var newIngredient3 = document.getElementById("newIngredient3").value;
	if(newIngredient3 !== null){
    	addIngredientsArray.push(newIngredient3);
    }    

    var newIngredient4 = document.getElementById("newIngredient4");
    if(newIngredient4 !== null){
    	newIngredient4 = document.getElementById("newIngredient4").value;
    	addIngredientsArray.push(newIngredient4);
    	inputFields ++;
    }

    var newIngredient5 = document.getElementById("newIngredient5");
	if(newIngredient5 !== null){
    	newIngredient5 = document.getElementById("newIngredient5").value;
    	addIngredientsArray.push(newIngredient5);
    	inputFields ++;
    }

    var newIngredient6 = document.getElementById("newIngredient6");
    if(newIngredient6 !== null){
    	newIngredient6 = document.getElementById("newIngredient6").value;
    	addIngredientsArray.push(newIngredient6);
    	inputFields ++;
    }

    var newIngredient7 = document.getElementById("newIngredient7");
    if(newIngredient7 !== null){
    	newIngredient7 = document.getElementById("newIngredient7").value;
    	addIngredientsArray.push(newIngredient7);
    	inputFields ++;
    }

    var newIngredient8 = document.getElementById("newIngredient8");
    if(newIngredient8 !== null){
    	newIngredient8 = document.getElementById("newIngredient8").value;
    	addIngredientsArray.push(newIngredient8);
    	inputFields ++;
    }

    var newOpIngredient1 = document.getElementById("newOpIngredient1");
    if(newOpIngredient1 !== null){
    	newOpIngredient1 = document.getElementById("newOpIngredient1").value;
    }

    var newOpIngredient2 = document.getElementById("newOpIngredient2");
    if(newOpIngredient2 !== null){
    	newOpIngredient2 = document.getElementById("newOpIngredient2").value;
    }

    var newOpIngredient3 = document.getElementById("newOpIngredient3");
    if(newOpIngredient3 !== null){
    	newOpIngredient3 = document.getElementById("newOpIngredient3").value;
    }

 	var newRecipeName = document.getElementById("newRecipeName").value;
 	var newRecipeDescription = document.getElementById("newRecipeDescription").value;

 	if (document.getElementById('newNone').checked){
		newRecipeType = 'none';
	}
	if (document.getElementById('newVegetarian').checked){
		newRecipeType = 'vegetarian';
	}
	if (document.getElementById('newVegan').checked){
		newRecipeType = 'vegan';
	}
	if (document.getElementById('newGlutenFree').checked){
		newRecipeType = 'glutenFree';
	}


	var newIngredientsArray = [];

	// This removes empty elements of the array by adding non blank elements to a new array.
	for(var d = 0; d < addIngredientsArray.length; d++){

		if(addIngredientsArray[d] == null || addIngredientsArray[d] == ''){			
		}
		else{
			newIngredientsArray.push(addIngredientsArray[d]);
		}

	}

	calculateRecipeRating(newRecipeName,newRecipeType,newRecipeDescription,newIngredientsArray,newOpIngredient1,newOpIngredient2,newOpIngredient3);
		 
}


function calculateRecipeRating(newRecipeName,newRecipeType,newRecipeDescription,newIngredientsArray,newOpIngredient1,newOpIngredient2,newOpIngredient3){

	var totalIngredientsRating = 0;
	var numIngsRating = 0;
	var recipeRating;
	var roundedRecipeRating;


	if(newIngredientsArray[0] == null){
		var newIngredient1 = 'blank';
	}
	else{
		var newIngredient1 = newIngredientsArray[0];
	}
	
	if(newIngredientsArray[1] == null){
		var newIngredient2 = 'blank';
	}
	else{
		var newIngredient2 = newIngredientsArray[1];
	}

	if(newIngredientsArray[2] == null){
		var newIngredient3 = 'blank';
	}
	else{
		var newIngredient3 = newIngredientsArray[2];
	}

	if(newIngredientsArray[3] == null){
		var newIngredient4 = 'blank';
	}
	else{
		var newIngredient4 = newIngredientsArray[3];
	}

	if(newIngredientsArray[4] == null){
		var newIngredient5 = 'blank';
	}
	else{
		var newIngredient5 = newIngredientsArray[4];
	}

	if(newIngredientsArray[5] == null){
		var newIngredient6 = 'blank';
	}
	else{
		var newIngredient6 = newIngredientsArray[5];
	}

	if(newIngredientsArray[6] == null){
		var newIngredient7 = 'blank';
	}
	else{
		var newIngredient7 = newIngredientsArray[6];
	}

	if(newIngredientsArray[7] == null){
		var newIngredient8 = 'blank';
	}
	else{
		var newIngredient8 = newIngredientsArray[7];
	}


	if(newOpIngredient1 == null){
		newOpIngredient1 = 'blank';
	}
	if(newOpIngredient2 == null){
		newOpIngredient2 = 'blank';
	}
	if(newOpIngredient3 == null){
		newOpIngredient3 = 'blank';
	}


	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM Ingredients', [], function(transaction, result) {
			if (result != null && result.rows != null) {
		        for (var i = 0; i < result.rows.length; i++) {
		        	var row = result.rows.item(i);

		        	var ingRating = parseInt(row.IngredientRating);

		        	for(var e = 0; e < newIngredientsArray.length; e++){
			        	
			        	if(row.IngredientName == newIngredientsArray[e]){

			        		totalIngredientsRating = totalIngredientsRating + ingRating

			        		numIngsRating ++;

			        	}
			        }

		        }
			}

			recipeRating = totalIngredientsRating/numIngsRating;

			roundedRecipeRating = Math.round(recipeRating);


	    	var pageContent = document.getElementById("pageContent");

	    	$('#pageContent').html('');

	    	var ratingHTML = ("The following healthiness rating has been suggested for this recipe based on your ingredients.");
	    	ratingHTML += ("You may change it below.<br><br><div class='form-field-container'><div id='numExtraIngs' class='form-field-buttonset'>");
	    	ratingHTML += ("<input type='radio' name='selectRecRating' id='ratingOne' value='One'><label for='ratingOne'>1</label>");
	    	ratingHTML += ("<input type='radio' name='selectRecRating' id='ratingTwo' value='Two' checked='checked'><label for='ratingTwo'>2</label>");
	    	ratingHTML += ("<input type='radio' name='selectRecRating' id='ratingThree' value='Three'><label for='ratingThree'>3</label>");
	    	ratingHTML += ("<input type='radio' name='selectRecRating' id='ratingFour' value='Four'><label for='ratingFour'>4</label>");
	    	ratingHTML += ("<input type='radio' name='selectRecRating' id='ratingFive' value='Four'><label for='ratingFive'>5</label></div></div><br>");
	 
			ratingHTML += ('<a href="#" class="findButton" id="findButton" onclick="addRec(' + "'" + newRecipeName + "','" + newRecipeType + "','" + newRecipeDescription + "','" + newIngredient1 + "','" + newIngredient2 + "','" + newIngredient3 + "','" + newIngredient4 + "','" + newIngredient5 + "','" + newIngredient6 + "','" + newIngredient7 + "','" + newIngredient8 + "','" + newOpIngredient1 + "','" + newOpIngredient2 + "','" + newOpIngredient3 + "'" + ')">ADD</a>');
	    	
			$('#pageContent').append(ratingHTML);

	    	if(roundedRecipeRating == 1){
	    		document.getElementById('ratingOne').checked = true;
	    	}
	    	if(roundedRecipeRating == 2){
	    		document.getElementById('ratingTwo').checked = true;
	    	}
	    	if(roundedRecipeRating == 3){
	    		document.getElementById('ratingThree').checked = true;
	    	}
	    	if(roundedRecipeRating == 4){
	    		document.getElementById('ratingFour').checked = true;
	    	}
	    	if(roundedRecipeRating == 5){
	    		document.getElementById('ratingFive').checked = true;
	    	}

		},errorHandler);
	},errorHandler,nullHandler);

}


function addRec(newRecipeName,newRecipeType,newRecipeDescription,newIngredient1,newIngredient2,newIngredient3,newIngredient4,newIngredient5,newIngredient6,newIngredient7,newIngredient8,newOpIngredient1,newOpIngredient2,newOpIngredient3){

	if (document.getElementById('ratingOne').checked) {
		finalRecipeRating = '1';
	}
	if (document.getElementById('ratingTwo').checked) {
		finalRecipeRating = '2';
	}
	if (document.getElementById('ratingThree').checked) {
		finalRecipeRating = '3';
	}
	if (document.getElementById('ratingFour').checked) {
		finalRecipeRating = '4';
	}
	if (document.getElementById('ratingFive').checked) {
		finalRecipeRating = '5';
	}

	
	db.transaction(function(transaction) {
	    transaction.executeSql('INSERT INTO AllRecipes(RecipeName, RecipeType, RecipeRating, RecipeDescription, Ingredient1, Ingredient2, Ingredient3, Ingredient4, Ingredient5, Ingredient6, Ingredient7, Ingredient8, opIngredient1, opIngredient2, opIngredient3) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[newRecipeName,newRecipeType,finalRecipeRating,newRecipeDescription,newIngredient1,newIngredient2,newIngredient3,newIngredient4,newIngredient5,newIngredient6,newIngredient7,newIngredient8,newOpIngredient1,newOpIngredient2,newOpIngredient3],nullHandler,errorHandler);
	},errorHandler,nullHandler);
		 
	alert("Recipe added sucessfully");

	location.reload();

	// this calls the function that will show what is in the User table in the database
	ListDBValues();

}


function find() {

	var userIngredientsArray = [];
	var inputFields = 3;
	numRecipes = 0;

	// These variables hold the ingredients entered by the user
	var userIngredient1 = document.getElementById("ingredient1").value;
	if(userIngredient1 !== null){
    	userIngredientsArray.push(userIngredient1);
    }

	var userIngredient2 = document.getElementById("ingredient2").value;
	if(userIngredient2 !== null){
    	userIngredientsArray.push(userIngredient2);
    }

    var userIngredient3 = document.getElementById("ingredient3").value;
	if(userIngredient3 !== null){
    	userIngredientsArray.push(userIngredient3);
    }    

    var userIngredient4 = document.getElementById("ingredient4");
    if(userIngredient4 !== null){
    	userIngredient4 = document.getElementById("ingredient4").value;
    	userIngredientsArray.push(userIngredient4);
    	inputFields ++;
    }

    var userIngredient5 = document.getElementById("ingredient5");
	if(userIngredient5 !== null){
    	userIngredient5 = document.getElementById("ingredient5").value;
    	userIngredientsArray.push(userIngredient5);
    	inputFields ++;
    }

    var userIngredient6 = document.getElementById("ingredient6");
    if(userIngredient6 !== null){
    	userIngredient6 = document.getElementById("ingredient6").value;
    	userIngredientsArray.push(userIngredient6);
    	inputFields ++;
    }

    var userIngredient7 = document.getElementById("ingredient7");
    if(userIngredient7 !== null){
    	userIngredient7 = document.getElementById("ingredient7").value;
    	userIngredientsArray.push(userIngredient7);
    	inputFields ++;
    }

    var userIngredient8 = document.getElementById("ingredient8");
    if(userIngredient8 !== null){
    	userIngredient8 = document.getElementById("ingredient8").value;
    	userIngredientsArray.push(userIngredient8);
    	inputFields ++;
    }
    

    // Checks how many additional ingredients the user wants up to for recipes in the search results 
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

	// checks the recipe type the user is searching for
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


	//------------------------- INPUT VALIDATION ---------------------------------------------------------------------------------------

	



	//----------------------------------------------------------------------------------------------------------------------------------

	// Clears the search results
    div = document.getElementById("results");
    div.innerHTML = ("");
    
    // Moves the 'modify search' bar down below the header so it can be seen once search results appear
    document.getElementById("background").style.padding="70px 0px 0px 0px";

    // Collapses the search fields so they aren't seen when the search results appear
	$(".content").hide();

	if (!window.openDatabase) {
  		alert('Databases are not supported in this browser.');
  		return;
 	}

 	// Clears the results table
 	db.transaction(function(tx){
		tx.executeSql( 'DELETE FROM Results',nullHandler,nullHandler);
	},errorHandler,successCallBack);


 	db.transaction(function(transaction) {
 	
   		transaction.executeSql('SELECT * FROM AllRecipes;', [], function(transaction, result) {
      		if (result != null && result.rows != null) {
        		for (var i = 0; i < result.rows.length; i++) {

        			// Loops through each row in the table
          			var row = result.rows.item(i);
          			
          			var recipeName = row.RecipeName
          			var ingredient1 = row.Ingredient1

			   	 	var ingredient2 = row.Ingredient2
			  		var ingredient3 = row.Ingredient3
			  		var ingredient4 = row.Ingredient4
			  		var ingredient5 = row.Ingredient5
			  		var ingredient6 = row.Ingredient6
			  		var ingredient7 = row.Ingredient7
			  		var ingredient8 = row.Ingredient8
			  		var recType = row.RecipeType

					var match = 0;
					var numOfIngredients = 0;
					var emptyElements = 0;

					var missingIngredients = [];
					var allIngredientsArray = [];
					var ingredientsArray = [];

					// Creates array of ingredients for this recipe
					allIngredientsArray = [ingredient1,ingredient2,ingredient3,ingredient4,ingredient5,ingredient6,ingredient7,ingredient8];


					// This removes any empty elements from the original array by placing any 'not null' elements into a new array. 
					// It also determines the number of ingredients in the recipe by counting the empty elements and removing that number from 8 (Max amount of ingredients).
					for(var c = 0; c < allIngredientsArray.length; c++){
						if(allIngredientsArray[c] == null || allIngredientsArray[c] == 'blank'){
							emptyElements ++;
						}
						else{
							ingredientsArray.push(allIngredientsArray[c]);
						}
					}
					numOfIngredients = 8 - emptyElements;


					// Loops through array of ingredients in the recipe, comparing each one against each of the ingredients entered by the user
					// If there is a match, the match variable is increased by 1, if not, the missingMatch variable is increased by 1.

					// For each ingredient in the recipe
					for (var j = 0; j < ingredientsArray.length; j++) {    // pasta    cheese     pepper

						var missingMatch = 0;

						// For each ingredient entered by the user
						for (var k = 0; k < userIngredientsArray.length; k++) {    // pasta

						    if(ingredientsArray[j] == userIngredientsArray[k]){
						    	match ++;
						    }
						    else{
						    	missingMatch ++;
						    }
	  
						}

						// if the missingMatch variable has the same value of the length of the user ingredients array, none of the ingredients entered by the user match
						// this ingredient. In this case, the ingredient is pushed to the missingIngredients array.
						if(missingMatch == userIngredientsArray.length){
							missingIngredients.push(ingredientsArray[j]);
						}

					}

					var numMissingIngs = missingIngredients.length;


					// Only proceeds if recipe is of the type entered by the user
					if(userRecType == 'all' || userRecType == recType || recType == 'vegan' && userRecType == 'vegetarian'){

						// If match variable is the same as the number of ingredients in this recipe, no additional ingredients are required
						if(match == numOfIngredients){
							missingIngredients = "none";

							// Adds this recipe to the results table
							addToResultsDB(row, missingIngredients, numMissingIngs);
							numRecipes ++;
						}

						// Checks if the recipe requires more additional ingredients than the user has requested. e.g. if the match variable is 4, four user ingredients have
						// been matched with ingredients in the recipe. If the user has requested recipes with up to 2 additional ingredients, the match variable is allowed
						// to be 2 less than the number of ingredients in the recipe. If it is less than 2, the recipe will not be added to the results table.
						for(var t = 0; t < 4; t++){

							var z = t + 1;

							if (extraIngredients > t){
								if(match == numOfIngredients - z){

									// Adds this recipe to the results table
									addToResultsDB(row, missingIngredients, numMissingIngs);
									numRecipes ++;
								}
							}

						}
						

					}
        		}

        		var sortParameter;

        		// Checks how the user wishes to sort their results
      			if (document.getElementById('sort1').checked) {
					sortParameter = "ingredientsRequired";
				}
				if (document.getElementById('sort2').checked) {
					sortParameter = "healthinessRating";
				}
        	
			    showResults(sortParameter);


      		}

      		if(numRecipes == 0){
      			resultsText.innerHTML = "Your search found no recipes"
      		}
      		if(numRecipes == 1){
      		resultsText.innerHTML = "Your search found 1 recipe";
      		}
      		if(numRecipes > 1){
      			resultsText.innerHTML = "Your search found " + numRecipes + " recipes";
      		}

     	},errorHandler);	
 	},errorHandler,nullHandler);
	
	// Displays the 'sort' buttons that were hidden from view when the user made their search.
	document.getElementById("hidden").style.display = 'block';

}


function addToResultsDB(row, missingIngredients, numMissingIngs){
	
	db.transaction(function(transaction){
		transaction.executeSql('INSERT INTO Results(ResultsMainID, ResultsRecipeRating, ResultsMissingIngredients,NumMissingIngredients) VALUES (?,?,?,?)',[row.RecipeID,row.RecipeRating,missingIngredients,numMissingIngs],nullHandler,errorHandler);
	},errorHandler,successCallBack);

}


function showResults(sortParameter){

	div.innerHTML = ("");

	db.transaction(function(tx){

		if(sortParameter == "ingredientsRequired"){

			tx.executeSql('SELECT * FROM Results ORDER BY NumMissingIngredients ASC', [], function(transaction, result) {
				if (result != null && result.rows != null) {
			        for (var i = 0; i < result.rows.length; i++) {
			        	var row = result.rows.item(i);

			        	locateRecipe(tx,row.ResultsMainID,row.ResultsMissingIngredients);

			        }
				}
			},errorHandler);

		}

		if(sortParameter == "healthinessRating"){

			tx.executeSql('SELECT * FROM Results ORDER BY ResultsRecipeRating DESC', [], function(transaction, result) {
				if (result != null && result.rows != null) {
			        for (var i = 0; i < result.rows.length; i++) {
			        	var row = result.rows.item(i);

			        	locateRecipe(tx,row.ResultsMainID,row.ResultsMissingIngredients);

			        }
				}
			},errorHandler);

		}

	},errorHandler,nullHandler);

}


function locateRecipe(tx,mainRecID,missingIngredients){

		tx.executeSql('SELECT * FROM AllRecipes WHERE RecipeID=?', [mainRecID], function(transaction, result) {
			
			var mainRow = result.rows.item(0);

			searchResult = injectRecipeHTML(mainRow.RecipeID,mainRow.RecipeName,mainRow.RecipeRating,mainRow.RecipeDescription,mainRow.Ingredient1,mainRow.Ingredient2,mainRow.Ingredient3,mainRow.Ingredient4,mainRow.Ingredient5,mainRow.Ingredient6,mainRow.Ingredient7,mainRow.Ingredient8,mainRow.OpIngredient1,mainRow.OpIngredient2,mainRow.OpIngredient3,missingIngredients);

			$('#results').append(searchResult);
			$('#MyRecipes').append(searchResult);

		},errorHandler);

}


function injectRecipeHTML(resultsRecipeID,resultsRecipeName,resultsRecipeRating,resultsRecipeDescription,resultsIngredient1,resultsIngredient2,resultsIngredient3,resultsIngredient4,resultsIngredient5,resultsIngredient6,resultsIngredient7,resultsIngredient8,resultsOpIngredient1,resultsOpIngredient2,resultsOpIngredient3,resultsMissingIngredients){

	var ratingImage;

	if(resultsRecipeRating == 1){
		ratingImage = 'img/one-heart-rating.png';
	}
	if(resultsRecipeRating == 2){
		ratingImage = 'img/two-hearts-rating.png';
	}
	if(resultsRecipeRating == 3){
		ratingImage = 'img/three-hearts-rating.png';
	}
	if(resultsRecipeRating == 4){
		ratingImage = 'img/four-hearts-rating.png';
	}
	if(resultsRecipeRating == 5){
		ratingImage = 'img/five-hearts-rating.png';
	}


	var recipeDiv = '<div class="search-result">';
	recipeDiv += '<div class="recipe-names inline">' + resultsRecipeName + '</div>';

	if(pageState == "myRecipes"){
		recipeDiv += '<a href="#" class="removeButton inline" onclick="removeFromMyRecipes(' + resultsRecipeID + ')">x</a>';
	}
	else{
		recipeDiv += '<a href="#" class="addButton inline" onclick="addToMyRecipes(' + resultsRecipeID + ')">+</a>';
	}

	recipeDiv += '<div id = "ratingImage"><img src="' + ratingImage + '"></div>';

	if(pageState !== "myRecipes"){	
		recipeDiv += '<div class="ingredients-needed">(Required: ' + resultsMissingIngredients + ')</div>';
	}
	else{
		recipeDiv += '<br>';
	}

	recipeDiv += '<div class="green-text" style="border-top: 2px solid #dcdcdc"><br>Required ingredients</div><br>';
	recipeDiv += '<div class="grey-text" style="text-transform: capitalize;">'
	recipeDiv += resultsIngredient1 + ', ' + resultsIngredient2 + ', ' + resultsIngredient3

	if(resultsIngredient4 !== null && resultsIngredient4 !== 'blank'){
		recipeDiv += ', ' + resultsIngredient4
	} 
	if(resultsIngredient5 !== null && resultsIngredient5 !== 'blank'){
		recipeDiv += ', ' + resultsIngredient5
	} 
	if(resultsIngredient6 !== null && resultsIngredient6 !== 'blank'){
		recipeDiv += ', ' + resultsIngredient6
	} 
	if(resultsIngredient7 !== null && resultsIngredient7 !== 'blank'){
		recipeDiv += ', ' + resultsIngredient7
	} 
	if(resultsIngredient8 !== null && resultsIngredient8 !== 'blank'){
		recipeDiv += ', ' + resultsIngredient8
	} 

	recipeDiv += '</div><br>';
	recipeDiv += '<div class="green-text">Optional ingredients</div><br>';
	recipeDiv += '<div class="grey-text" style="border-bottom: 2px solid #dcdcdc; text-transform: capitalize;">'

	if(resultsOpIngredient1 !== null  && resultsOpIngredient1 !== 'blank'){
		recipeDiv += resultsOpIngredient1
	}
	else{
		recipeDiv += 'None';
	} 

	if(resultsOpIngredient2 !== null  && resultsOpIngredient2 !== 'blank'){
		recipeDiv += ', ' + resultsOpIngredient2
	} 
	if(resultsOpIngredient3 !== null  && resultsOpIngredient3 !== 'blank'){
		recipeDiv += ', ' + resultsOpIngredient3
	} 
 
	recipeDiv += '<br><br></div></br>'; 
	recipeDiv += '<div class="green-text">Description</div><br>';
	recipeDiv += '<div id="block-2" class="toHide grey-text">' + resultsRecipeDescription + '</div>';
	recipeDiv += '</div>';

	return recipeDiv;

}


function addToMyRecipes(id){

	db.transaction(function(transaction){
		transaction.executeSql('INSERT INTO MyRecipes(ForeignRecipeID) VALUES (?)',[id],nullHandler,errorHandler);

      	alert("Added to My Recipes");
      			
	},errorHandler,nullHandler);

}


function showMyRecipes(){

	$('#MyRecipes').html('');

	db.transaction(function(transaction){
		transaction.executeSql('SELECT * FROM MyRecipes', [], function(transaction, result) {
			if (result !== null && result.rows !== null) {
		        for (var i = 0; i < result.rows.length; i++) {

		        	var row = result.rows.item(i);
					var mainRecipeID = row.ForeignRecipeID;

					transaction.executeSql('SELECT * FROM AllRecipes WHERE RecipeID=?', [mainRecipeID], function(transaction, result) {
						
						var mainRow = result.rows.item(0);

						var searchResult = injectRecipeHTML(mainRow.RecipeID,mainRow.RecipeName,mainRow.RecipeRating,mainRow.RecipeDescription,mainRow.Ingredient1,mainRow.Ingredient2,mainRow.Ingredient3,mainRow.Ingredient4,mainRow.Ingredient5,mainRow.Ingredient6,mainRow.Ingredient7,mainRow.Ingredient8,mainRow.OpIngredient1,mainRow.OpIngredient2,mainRow.OpIngredient3,null);

						$('#MyRecipes').append(searchResult);

					},errorHandler);

		        }
			}
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
	$('#forTesting').html('Hello');
		 
	// this next section will select all the content from the User table and then go through it row by row
	// appending the UserId  FirstName  LastName to the  #lbUsers element on the page
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM MyRecipes', [], function(transaction, result) {
			if (result != null && result.rows != null) {
		        for (var i = 0; i < result.rows.length; i++) {
		          	var row = result.rows.item(i);

		          	alert('here');
		          	$('#forTesting').append('<br>' + row.ForeignRecipeID);
		        }
			}
		},errorHandler);
	},errorHandler,nullHandler);
		 
	return;
		 
}


function removeFromMyRecipes(myRecipeID){

	var x = confirm("Remove from My Recipes?");

	if(x == true){

		db.transaction(function(transaction) {
	    	transaction.executeSql("DELETE FROM MyRecipes WHERE ForeignRecipeID=?", [myRecipeID]);
		});
		
		showMyRecipes();

	}

	else{
		return;
	}

}


function findRandomRecipe(){

	onBodyLoad();

	db.transaction(function(transaction){
		transaction.executeSql('SET result = SELECT * FROM AllRecipes ORDER BY random() LIMIT 1', function(transaction, result){
	      	var row = result.rows.item(0);

	      	alert(row.RecipeName);	 
      	},errorHandler);
	},errorHandler,nullHandler);

}















