import * as actionTypes from './actionTypes';

export const getOrdersByCollectionPoint = (collectionPointId) => {
    return {
        type: actionTypes.GET_ORDERS_BY_COLLECTION_POINT,
        collectionPointId
    };
};

export const getOrdersByCollectionPointStart = () => {
    return {
        type: actionTypes.GET_ORDERS_BY_COLLECTION_POINT_START
    };
};

export const getOrdersByCollectionPointSuccess = (orders) => {
    return {
        type: actionTypes.GET_ORDERS_BY_COLLECTION_POINT_SUCCESS,
        orders
    };
};

export const getOrdersByCollectionPointFail = error => {
    return {
        type: actionTypes.GET_ORDERS_BY_COLLECTION_POINT_FAIL,
        error: error
    };
};
