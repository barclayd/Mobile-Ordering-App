import * as actionTypes from "./actionTypes";

export const createBasket = () => {
    return {
        type: actionTypes.CREATE_BASKET
    };
};

export const createBasketStart = () => {
    return {
        type: actionTypes.CREATE_BASKET_START
    };
};

export const createBasketSuccess = (drinksObject) => {
    return {
        type: actionTypes.CREATE_BASKET_START,
        drink: drinksObject
    };
};

export const updateBasket = (basketAction, drinksObject) => {
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

export const updateBasketSuccess = (drinkObject) => {
    return {
        type: actionTypes.UPDATE_BASKET_SUCCESS,
        drink: drinkObject
    };
};

