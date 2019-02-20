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

export const findDrinksSuccess = (data) => {
    return {
        type: actionTypes.FIND_DRINKS_START,
        data: data
    };
};

export const findDrinksFail = error => {
    return {
        type: actionTypes.FIND_DRINKS_FAIL,
        error: error
    };
};


