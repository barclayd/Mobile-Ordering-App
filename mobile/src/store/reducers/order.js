import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: null,
    error: null,
    drinksOrdered: [],
};

const addToOrderStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const addToOrderSuccess = (state, action) => {
    return updateObject(state, {
        drinksOrdered: action.data,
        loading: false,
        error: false,
    });
};

const addToOrderFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_ORDER_START: return addToOrderStart(state, action);
        case actionTypes.ADD_TO_ORDER_SUCCESS: return addToOrderSuccess(state, action);
        case actionTypes.ADD_TO_ORDER_FAIL: return addToOrderFail(state, action);
        default: return state;
    }
};

export default reducer;


