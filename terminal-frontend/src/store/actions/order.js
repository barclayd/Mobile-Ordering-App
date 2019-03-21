import * as actionTypes from './actionTypes';

export const getOrders = (collectionPointId) => {
    return {
        type: actionTypes.GET_ORDERS,
        collectionPointId
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
