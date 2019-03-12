import * as actionTypes from "./actionTypes";

export const submitOrder = (basket, componentId) => {
    return {
        type: actionTypes.SUBMIT_ORDER,
        order: basket,
        componentId: componentId
    };
};

export const submitOrderStart = () => {
    return {
        type: actionTypes.SUBMIT_ORDER_START
    };
};

export const submitOrderSuccess = (order) => {
    return {
        type: actionTypes.SUBMIT_ORDER_SUCCESS,
        order: order
    };
};

export const submitOrderFail = error => {
    return {
        type: actionTypes.SUBMIT_ORDER_FAIL,
        error: error
    };
};

export const orderHistory = () => {
    return {
        type: actionTypes.ORDER_HISTORY,
    };
};

export const orderHistoryStart = () => {
    return {
        type: actionTypes.ORDER_HISTORY_START
    };
};

export const orderHistorySuccess = (foundOrders) => {
    return {
        type: actionTypes.ORDER_HISTORY_SUCCESS,
        previousOrders: foundOrders
    };
};

export const orderHistoryFailure = error => {
    return {
        type: actionTypes.ORDER_HISTORY_FAIL,
        error: error
    };
};
