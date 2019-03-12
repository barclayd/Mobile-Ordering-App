import {AsyncStorage} from "react-native";

export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
};

export const storeBasket = async (basket) => {
    const storedBasket = JSON.stringify(basket);
    return await AsyncStorage.setItem("basket", storedBasket);
};
