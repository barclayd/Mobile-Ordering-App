import {AsyncStorage} from "react-native";

export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
};

export const storeBasket = async (basket) => {
    const storedBasket = JSON.stringify(basket);
    await AsyncStorage.setItem("basket", storedBasket);
};

export const storeCategories = async (categories) => {
    const storedCategories = JSON.stringify(categories);
    await AsyncStorage.setItem("categories", storedCategories);
};

export const retrieveBasket = (foundBasket) => {
    return JSON.parse(foundBasket);
};

export const retrieveCategories = (foundCategories) => {
    return JSON.parse(foundCategories);
};

export const emptyBasket = async () => {
    await AsyncStorage.removeItem("basket");
    await AsyncStorage.removeItem("categories");
};

export const addUpdateBasket = (prevStateBasket, drink) => {
    return prevStateBasket.concat(drink);
};

export const addUpdateCategories = (prevStateCategories, drink) => {
    return !prevStateCategories.includes(drink.category) ? prevStateCategories.concat(drink.category) : prevStateCategories;
};

export const updateUpdateBasket = (prevStateBasket, updatedDrink) => {
    const oldDrinkObject = prevStateBasket.filter(drink => drink.name === updatedDrink.name);
    const updatedQuantity = updatedDrink.quantity;
    const newDrinkObject = {
        ...oldDrinkObject[0],
        quantity: updatedQuantity + oldDrinkObject[0].quantity
    };
    return prevStateBasket.filter(drink => drink.name !== updatedDrink.name).concat(newDrinkObject);
};

export const deleteUpdateBasket = (prevStateBasket, updatedDrink) => {
    return prevStateBasket.filter(drink => drink.name !== updatedDrink.name);
};

export const deleteUpdateCategories = (prevStateBasket, prevStateCategories, updatedDrink) => {
    const countIn = prevStateBasket.filter(drink => drink === updatedDrink.category).length > 1;
    return countIn ? prevStateCategories : prevStateCategories.includes(updatedDrink.category) ? prevStateCategories.filter(category => category !== updatedDrink.category) : prevStateCategories;
};

