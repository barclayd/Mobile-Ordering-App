import * as actionTypes from "./actionTypes";

export const updateBasket = (drinksObject, basketAction, oldBasketState, oldCategoriesState) => {
    return {
        type: actionTypes.UPDATE_BASKET,
        oldBasketState: oldBasketState,
        oldCategoriesState: oldCategoriesState,
        drink: drinksObject,
        basketAction: basketAction
    };
};

export const updateBasketStart = () => {
    return {
        type: actionTypes.UPDATE_BASKET_START,
    };
};

export const updateBasketSuccess = (drinkObject, basketAction) => {
    return {
        type: actionTypes.UPDATE_BASKET_SUCCESS,
        drink: drinkObject,
        basketAction: basketAction
    };
};

export const emptyBasket = () => {
    return {
        type: actionTypes.EMPTY_BASKET,
    };
};

export const emptyBasketStart = () => {
    return {
        type: actionTypes.EMPTY_BASKET_START,
    };
};

export const emptyBasketSuccess = () => {
    return {
        type: actionTypes.EMPTY_BASKET_SUCCESS,
    };
};

export const retrieveBasket = () => {
    return {
        type: actionTypes.RETRIEVE_BASKET,
    };
};

export const retrieveBasketStart = () => {
    return {
        type: actionTypes.RETRIEVE_BASKET_START,
    };
};

export const retrieveBasketSuccess = (basket, categories) => {
    return {
        type: actionTypes.RETRIEVE_BASKET_SUCCESS,
        foundBasket: basket,
        foundCategories: categories
    };
};

export const retrieveBasketFail = () => {
    return {
        type: actionTypes.RETRIEVE_BASKET_FAIL,
    };
};

