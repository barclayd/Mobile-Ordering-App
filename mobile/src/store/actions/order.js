import * as actionTypes from "./actionTypes";

export const submitOrder = (basket, componentId, paymentInfo, basketPrice) => {
    return {
        type: actionTypes.SUBMIT_ORDER,
        order: basket,
        componentId: componentId,
        paymentInfo,
        basketPrice
    };
};

export const submitOrderStart = () => {
    return {
        type: actionTypes.SUBMIT_ORDER_START
    };
};

export const submitOrderSuccess = (order, token) => {
    return {
        type: actionTypes.SUBMIT_ORDER_SUCCESS,
        order: order,
        token
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

export const orderHistorySuccess = (pastOrders) => {
    return {
        type: actionTypes.ORDER_HISTORY_SUCCESS,
        pastOrders: pastOrders
    };
};

export const orderHistoryFailure = error => {
    return {
        type: actionTypes.ORDER_HISTORY_FAIL,
        error: error
    };
};

export const orderStatus = () => {
    return {
        type: actionTypes.RETRIEVE_ORDER_STATUS,
    };
};

export const orderStatusStart = () => {
    return {
        type: actionTypes.RETRIEVE_ORDER_STATUS_START
    };
};

export const orderStatusSuccess = (orderStatus) => {
    return {
        type: actionTypes.RETRIEVE_ORDER_STATUS_SUCCESS,
        orderStatus: orderStatus
    };
};

export const orderStatusFailure = error => {
    return {
        type: actionTypes.RETRIEVE_ORDER_STATUS_FAIL,
        error: error
    };
};

export const orderUpdatedSuccess = (order) => {
    return {
        type: actionTypes.UPDATE_ORDER_SUCCESS,
        order
    };
};

export const orderUpdatedFailure = error => {
    console.log(error);
    return {
        type: actionTypes.UPDATE_ORDER_FAIL,
        error
    };
};



