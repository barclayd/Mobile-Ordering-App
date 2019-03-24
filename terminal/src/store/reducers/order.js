import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    loading: null,
    error: null,
    orders: []
};

const getOrdersByCollectionPointStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const getOrdersByCollectionPointSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false,
        error: false,
    });
};

const getOrdersByCollectionPointFailure = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDERS_BY_COLLECTION_POINT_START: return getOrdersByCollectionPointStart(state, action);
        case actionTypes.GET_ORDERS_BY_COLLECTION_POINT_SUCCESS: return getOrdersByCollectionPointSuccess(state, action);
        case actionTypes.GET_ORDERS_BY_COLLECTION_POINT_FAIL: return getOrdersByCollectionPointFailure(state, action);
        default: return state;
    }
};

export default reducer;


