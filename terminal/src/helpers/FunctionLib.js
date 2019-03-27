/*
    Library of shared functions for DrinKing
      Created by Freddie Chessell
*/

export const rangeScaling = (value, xMin, xMax, yMin, yMax) => {
    const percent = (value - yMin) / (yMax - yMin);
    return percent * (xMax - xMin) + xMin;
};


// Function takes an array of orders and removes duplicate drinks in each order, adding a quantity field
export const rebuildDrinksForOrderWithQuantities = (ordersArray) => {
    ordersArray.forEach((order, index) => {
        order.drinks = rebuildDrinksWithQuantities(order.drinks)
    });

    return ordersArray;
}


// Strips duplicate drinks from drinks array, adding a .quantity field to them
export const rebuildDrinksWithQuantities = (drinksArrayObj) => {
    let duplicateDrinks = []; // List of item ids and a bool to represent if they drink has already been added to newDrinksArrayObj
    let newDrinksArrayObj = [];

    // Loop through each drink in drinksArrayObj
    drinksArrayObj.forEach((drink, index) => {
        // If the drink has not yet been found in this loop, add it to newDrinksArrayObj and set the quantity to 1
        if (!duplicateDrinks[drink._id]) {
            duplicateDrinks[drink._id] = true;
            drink.quantity = 1;
            newDrinksArrayObj.push(drink);

        // If the drink has already been added to newDrinksArrayObj, find it and increase the quantity by 1
        } else {
            newDrinksArrayObj.find((newDrink) => {
                return newDrink._id === drink._id;
            }).quantity += 1
        }
    });

    return newDrinksArrayObj;
};
