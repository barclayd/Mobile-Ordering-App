const unique = (arrArg) => {
    return arrArg.filter((elem, pos, arr) => {
        return arr.indexOf(elem) === pos;
    });
};

quantityCalculator = (drinks) => {
    const uniqueDrinks = unique(drinks);
    let count;
    for (let drink in uniqueDrinks) {
        console.log(drinks);
        console.log(uniqueDrinks[drink]);
        count = drinks.map(foundDrink => foundDrink === uniqueDrinks[drink]).length;
    }
    return count;
};


module.exports = {
    quantityCalculator
};
