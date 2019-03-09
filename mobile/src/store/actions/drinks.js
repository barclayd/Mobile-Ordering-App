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
        type: actionTypes.FIND_DRINKS_SUCCESS,
        data: data
    };
};

export const findDrinksFail = error => {
    return {
        type: actionTypes.FIND_DRINKS_FAIL,
        error: error
    };
};

export const findDrinkCategories = () => {
    return {
        type: actionTypes.FIND_DRINK_CATEGORIES
    };
};

export const findDrinkCategoriesStart = () => {
    return {
        type: actionTypes.FIND_DRINK_CATEGORIES_START
    };
};

export const findDrinkCategoriesSuccess = (data) => {
    return {
        type: actionTypes.FIND_DRINK_CATEGORIES_SUCCESS,
        data: data
    };
};

export const findDrinkCategoriesFail = error => {
    return {
        type: actionTypes.FIND_DRINK_CATEGORIES_FAIL,
        error: error
    };
};




