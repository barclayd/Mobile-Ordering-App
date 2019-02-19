import * as actionTypes from "./actionTypes";

export const findDrinks = (category, componentId) => {
    return {
        type: actionTypes.FIND_DRINKS,
        category: category,
        componentId: componentId
    };
};

export const findDrinksStart = () => {
    return {
        type: actionTypes.FIND_DRINKS_START
    };
};

export const findDrinksSuccess = (name, category, nutritionInfo, price) => {
    return {
        type: actionTypes.FIND_DRINKS_SUCCESS,
        name: name,
        category: category,
        nutritionInfo: nutritionInfo,
        price, price
    };
};

export const findDrinksFail = error => {
    return {
        type: actionTypes.FIND_DRINKS_FAIL,
        error: error
    };
};


