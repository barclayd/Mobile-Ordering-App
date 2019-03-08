import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    loading: null,
    error: null,
    drinks: []
};

const updateBasketStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const createBasketStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const updateBasketSuccess = (state, action) => {
    if (action.basketAction === 'add') {
        return updateObject(state, {
            drinks: state.drinks.concat(action.drink),
            loading: false,
            error: false,
            saved: true
        });
    }
    if (action.basketAction === 'update') {
        return updateObject(state, {
            drinks: state.drinks.concat(action.drink),
            loading: false,
            error: false,
            saved: true
        });
    }
    if (action.basketAction === 'delete') {
        return updateObject(state, {
            drinks: state.drinks.filter(drink => drink.name === action.drink.name),
            loading: false,
            error: false,
            saved: true
        });
    }
};

const createBasketSuccess = (state, action) => {
    return updateObject(state, {
        drinks: state.drinks.concat(action.drink),
        loading: false,
        error: false,
        saved: true
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_BASKET_START: return createBasketStart(state, action);
        case actionTypes.CREATE_BASKET_SUCCESS: return createBasketSuccess(state, action);
        case actionTypes.UPDATE_BASKET_START: return updateBasketStart(state, action);
        case actionTypes.UPDATE_BASKET_SUCCESS: return updateBasketSuccess(state, action);
        default: return state;
    }
};

export default reducer;
