import * as actionTypes from "./actionTypes";

export const submitOrder = (basket, componentId) => {
    console.log("submitOrder",basket)
    return {
        type: actionTypes.SUBMIT_ORDER,
        order: basket,
        componentId: componentId
    };
};

export const submitOrderStart = () => {
    console.log("submitOrderStart")
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