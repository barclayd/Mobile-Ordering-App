import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    loading: null,
    error: null,
    order: [],
};

const submitOrderStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const submitOrderSuccess = (state, action) => {
    return updateObject(state, {
        order: action.data,
        loading: false,
        error: false,
    });
};

const submitOrderFail = (state, action) => {
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
        default: return state;
    }
};

export default reducer;


