import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";
import update from 'immutability-helper';

const initialState = {
    loading: null,
    error: null,
    orders: [],
    updatingOrderLoading: null,
    updatedOrder: null
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

const updateOrderStart = (state, action) => {
    return updateObject(state, {
        updatingOrderLoading: true,

    });
};
const updateOrderSuccess = (state, action) => {
    const index = state.orders.map(order => order._id).indexOf(action.orderId);

    return update(state, {orders: {[index]: {$set: action.updatedOrder}}});
};
const updateOrderFailure = (state, action) => {
    return updateObject(state, {
        updatingOrderLoading: false,
        error: action.error
    });
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDERS_BY_COLLECTION_POINT_START: return getOrdersByCollectionPointStart(state, action);
        case actionTypes.GET_ORDERS_BY_COLLECTION_POINT_SUCCESS: return getOrdersByCollectionPointSuccess(state, action);
        case actionTypes.GET_ORDERS_BY_COLLECTION_POINT_FAIL: return getOrdersByCollectionPointFailure(state, action);
        case actionTypes.UPDATE_ORDER_START: return updateOrderStart(state, action);
        case actionTypes.UPDATE_ORDER_SUCCESS: return updateOrderSuccess(state, action);
        case actionTypes.UPDATE_ORDER_FAIL: return updateOrderFailure(state, action);
        default: return state;
    }
};

export default reducer;


