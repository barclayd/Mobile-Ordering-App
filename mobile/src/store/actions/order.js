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

export const submitOrderSuccess = (data) => {
    return {
        type: actionTypes.SUBMIT_ORDER_SUCCESS,
        data: data
    };
};

export const submitOrderFail= error => {
    return {
        type: actionTypes.SUBMIT_ORDER_FAIL,
        error: error
    };
};
