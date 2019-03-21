import * as actionTypes from './actionTypes';

export const getOrders = () => {
    return {
        type: actionTypes.GET_ORDERS,
    };
};

export const getOrdersStart = () => {
    return {
        type: actionTypes.GET_ORDERS_START
    };
};

export const getOrdersSuccess = (orders) => {
    return {
        type: actionTypes.GET_ORDERS_SUCCESS,
        orders
    };
};

export const getOrdersFail = error => {
    return {
        type: actionTypes.GET_ORDERS_FAIL,
        error: error
    };
};
