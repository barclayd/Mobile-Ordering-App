import * as actionTypes from "./actionTypes";

export const addToOrder = (drink, quantity, componentId) => {
    return {
        type: actionTypes.ADD_TO_ORDER,
        drink: drink,
        quantity: quantity,
        componentId: componentId
    };
};

export const addToOrderStart = () => {
    return {
        type: actionTypes.ADD_TO_ORDER_START
    };
};

export const addToOrderSuccess = (data) => {
    return {
        type: actionTypes.ADD_TO_ORDER_SUCCESS,
        data: data
    };
};

export const addToOrderFail= error => {
    return {
        type: actionTypes.ADD_TO_ORDER_FAIL,
        error: error
    };
};