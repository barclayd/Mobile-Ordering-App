import * as actionTypes from "./actionTypes";

export const updateBasket = (drinksObject, basketAction) => {
    return {
        type: actionTypes.UPDATE_BASKET,
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

