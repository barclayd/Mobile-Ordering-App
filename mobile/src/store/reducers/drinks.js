import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    loading: null,
    error: null,
    name: null,
    category: null,
    nutrition: null,
    price: null
};

const findDrinks = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const findDrinksStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const findDrinksSuccess = (state, action) => {
    return updateObject(state, {
        name: action.name,
        category: action.category,
        nutritionInfo: action.nutritionInfo,
        price: action.price,
        loading: false,
        error: false
    });
};

const findDrinksFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FIND_DRINKS_START: return findDrinksStart(state, action);
        case actionTypes.FIND_DRINKS_SUCCESS: return findDrinksSuccess(state, action);
        case actionTypes.FIND_DRINKS_FAIL: return findDrinksFail(state, action);
        default: return state;
    }
};

export default reducer;