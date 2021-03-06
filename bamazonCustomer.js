//Grab node packages
var mysql = require('mysql');
var inquirer = require('inquirer');

//MySql connection
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "N0b0ndag3G0d",
	database: "bamazon_db"
});

//Initial verification of if the customer wants to purchase
inquirer.prompt(
    {
    
    name: "buyerCheck",
    type: "confirm",
    message: "Would you like to buy an item from Bamazon Today?"
    
    
    }).then (function (answer) {
            if (answer.buyerCheck === true) {
                
                inquirer.prompt({
                    name: "catalogCheck",
                    type: "confirm",
                    message: "Would you like to see items in the Bamazon catalog?"
                
                }).then(function (answer) {
                        main();
                
                        });
    } else {
        console.log("Everyone is not prepared for lift-off, maybe sometime soon.");
    }
});

//Main menu
function main(){

	//Select all products and display them
	connection.query('SELECT * FROM Products', function(err, res) {
		if(err) throw err;
	
		console.log("\nWELCOME TO BAMAZON!\nWe Make Shopping A Ba Ba Blast! !\n");
        console.log("________________");
 	    console.log(" ");
 	    console.log("CATALOG OF ITEMS");
 	    console.log("________________");
		//Loop to display all items
		for (var i = 0; i < res.length; i++){
            
            console.log(res[i].Product_Name);
 	    	console.log("Item ID: "+res[i].Item_ID);
 	    	console.log("Department: "+res[i].Department_Name);
 	    	console.log("Price: $"+res[i].Price);
 	    	console.log("# available: "+res[i].Stock_Quantity);
 	    	console.log("_____________");	
		}
       // console.log(main);
		console.log(" ");

		//Get user info
		select();
	});
}

//Prompt user what they would like to buy
function select(){
	
	inquirer.prompt([
        {
	        name: "np", /*number purchased*/
            type: "input",
	        message: "What is the item Item ID number you would like to buy?"
	    }, {
	    	name: "units",
            type: "input",
	    	message: "How many units of the item would you like to buy?"
        }, {
            name: "vf", /*verifying*/
            type: "confirm",
            question: "I am just verifying that you are requesting Item Number"+  itemSelect + "?"
        }, {
            name: "style", /*style*/
            type: "confirm",
            question: "Am I also correct that you are requesting " + numSelect + this.productStyle + "?"
            //stockCheck();
        }]).then(function (answers, main)
            {
          
        
	    	
	    	//Assign input to variables
	    	var itemSelect = answers.np;
	    	var numSelect = answers.units;
                this.productStyle = main.Product_Name;
        
//	    	//Go to itemCheck
	    select(itemSelect, numSelect);
  });
    
}
function select(){
    
    inquirer.prompt([
        {
            name: "vf", /*verifying*/
            type: "confirm",
            question: "I am just verifying that you are requesting Item Number"+  itemSelect + "?"
        }, {
            name: "vf", /*verifying*/
            type: "confirm",
            question: "Am I also correct that you are requesting " + numSelect + productStyle + "?"
        //             stockCheck();
        }]);
                stockCheck();
}            
//            console.log("I am just verifying that you are requesting Item Number"+  itemSelect);
//            console.log("_____________");
//	    });
//    
//	    stockCheck();
//}
//See if enough items are in stock to fulfill order
function stockCheck(){
	//Connect to DB to look at all Products
	        connection.query('SELECT * FROM Products WHERE Item_ID='+itemSelect, 
                function(err, res) {
         	//coming out of the sql table...
         	      var ItemUp = res[0];
         	         console.log("Item Name:"+ItemUp.Product_Name);
 	    	         console.log("Item ID: "+ItemUp.Item_ID);
 	    	         console.log("Department: "+ItemUp.Department_Name);
 	    	         console.log("Price: $"+ItemUp.Price);
 	    	         console.log("# available: "+ItemUp.Stock_Quantity);
 	    	         console.log("_____________");
        
                if(err) throw err;
//		
			//Loop through all items
			//for (var i = 0; i > res.length; i++){
//
//				
//				
				//Find the itemID user selected
				if(numSelect == res[i]. ItemUp.Item_ID){
					
                    
					//Set the current stock
					var currentStock = res[i].Stock_Quantity;
					console.log(currentStock);

					//ID the product selected
					var product = res[itemSelect - 1].Product_Name;

					//ID the price
					var price = res[itemSelect - 1].Price;

						//If user requested more than in stock
						if (numSelect > ItemUp.currentStock){
							
							console.log("\nInsufficient Quantity!\n");


//							main();
						}
						else {
                            if (numSelect === 1)
                            {
    			             console.log("You are purchasing "+numSelect+" "+ItemUp.Product_Name+".");
                            }else {
                                console.log("You are purchasing "+numSelect+" "+ItemUp.Product_Name+"s.");
                            }
                            var cost = numSelect * ItemUp.Price;
							//Take from currentStock and assign to stockUpdate
							var stockUpdate = currentStock - numSelect;

							//Update DB with change in stock
							connection.query("UPDATE products SET ? WHERE ?", [{Stock_Quantity: stockUpdate},
							{Item_ID: itemSelect}], function(err, res){});

							//Set the total cost
							var total = price * numSelect;

							console.log("Thank you for purchasing " + "'" + product + "'! Your total comes to $" + total + ".");
                        
                            inquirer.prompt(
                                {
 			                        name: "receipt",
 			                        type: "confirm",
 			                        message: "Are you sure you want to purchase "+numSelect+" "+ItemUp.Product_Name+"s for $"+total+"?"
 			        
 			                    }).then(function (answer) {
 			                        if (answer.receipt === true) {
 			        	               if (numSelect === 1)
                                       {
 			        		              console.log("Great! Here is your numUnits"+numSelect+" "+ItemUp.Product_Name+".");
 			        	
                                       }else {
                                           
                                           console.log("Great! Here are your "+numSelect+" "+ItemUp.Product_Name+"s.");
 			        	               }
 
 			        	               var newUnits = parseInt(ItemUp.Stock_Quantity) - parseInt(numSelect);
 			        	                   
                                            connection.query('UPDATE Products SET Stock_Quantity='+newUnits+' WHERE Item_ID='+itemSelect);
 			                        } else {
 			            
                                            console.log("Awwww maybe next time.");
 			                        }
 
																//Go back to main
																	main.end();
											});
            		}
            }
//    
	});
}