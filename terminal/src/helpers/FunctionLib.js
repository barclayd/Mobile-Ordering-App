/*
    Library of shared functions for DrinKing
      Created by Freddie Chessell
*/

export const rangeScaling = (value, xMin, xMax, yMin, yMax) => {
    const percent = (value - yMin) / (yMax - yMin);
    return percent * (xMax - xMin) + xMin;
};


// Function takes an array of orders and removes duplicate drinks in each order, adding a quantity field
export const rebuildDateAndDrinksForOrderWithQuantities = (ordersArray) => {
    let newOrdersArray = JSON.parse(JSON.stringify(ordersArray)); // Deep-copy array
    newOrdersArray.forEach((order, index) => {
        order.date = new Date(order.date); // Convert order dates from strings to date objects
        order.drinks = rebuildDrinksWithQuantities(order.drinks)
    });


    return newOrdersArray;
}


// Strips duplicate drinks from drinks array, adding a .quantity field to them
export const rebuildDrinksWithQuantities = (drinksArrayObj) => {
    let duplicateDrinks = []; // List of item ids and a bool to represent if they drink has already been added to newDrinksArrayObj
    let newDrinksArrayObj = [];

    // Loop through each drink in drinksArrayObj
    drinksArrayObj.forEach((drink, index) => {
        // If the drink has not yet been found in this loop, add it to newDrinksArrayObj and calculate the quantity
        if (!duplicateDrinks[drink._id]) {
            duplicateDrinks[drink._id] = true;
            drink.quantity = drinksArrayObj.filter((val) => { return val._id === drink._id }).length;
            newDrinksArrayObj.push(drink);
        }
    });

    return newDrinksArrayObj;
};
