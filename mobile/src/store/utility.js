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
