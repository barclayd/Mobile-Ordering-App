import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    loading: null,
    error: null,
    orders: [],
};

const getOrdersStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const getOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false,
        error: false,
    });
};

const getOrdersFailure = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDERS_START: return getOrdersStart(state, action);
        case actionTypes.GET_ORDERS_SUCCESS: return getOrderSuccess(state, action);
        case actionTypes.GET_ORDERS_FAIL: return getOrdersFailure(state, action);
        default: return state;
    }
};

export default reducer;


