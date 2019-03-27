import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    loading: null,
    error: null,
    order: [],
    pastOrders: [],
    orderStatus: [],
    orderInProgress: false
};

const submitOrderStart = (state, action) => {
    return updateObject(state, {
        error: null,
        orderInProgress: true
    });
};

const submitOrderSuccess = (state, action) => {
    return updateObject(state, {
        order: action.order.data,
        orderInProgress: false,
        error: false,
    });
};

const submitOrderFail = (state, action) => {
    return updateObject(state, {
        orderInProgress: false,
        error: action.error
    });
};

const orderHistoryStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const orderHistorySuccess = (state, action) => {
    return updateObject(state, {
        pastOrders: action.pastOrders,
        loading: false,
        error: false,
    });
};

const orderHistoryFailure = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const orderStatusStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const orderStatusSuccess = (state, action) => {
    return updateObject(state, {
        orderStatus: action.orderStatus,
        loading: false,
        error: false,
    });
};

const orderStatusFailure = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SUBMIT_ORDER_START: return submitOrderStart(state, action);
        case actionTypes.SUBMIT_ORDER_SUCCESS: return submitOrderSuccess(state, action);
        case actionTypes.SUBMIT_ORDER_FAIL: return submitOrderFail(state, action);
        case actionTypes.ORDER_HISTORY_START: return orderHistoryStart(state, action);
        case actionTypes.ORDER_HISTORY_SUCCESS: return orderHistorySuccess(state, action);
        case actionTypes.ORDER_HISTORY_FAIL: return orderHistoryFailure(state, action);
        case actionTypes.RETRIEVE_ORDER_STATUS_START: return orderStatusStart(state, action);
        case actionTypes.RETRIEVE_ORDER_STATUS_SUCCESS: return orderStatusSuccess(state, action);
        case actionTypes.RETRIEVE_ORDER_STATUS_FAIL: return orderStatusFailure(state, action);
        default: return state;
    }
};

export default reducer;


