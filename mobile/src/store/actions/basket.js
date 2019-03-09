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

