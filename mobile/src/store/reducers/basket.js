import * as actionTypes from '../actions/actionTypes';
import {updateObject, retrieveBasket, retrieveCategories, addUpdateBasket, addUpdateCategories, updateUpdateBasket, deleteUpdateCategories, deleteUpdateBasket} from "../utility";

const initialState = {
    loading: null,
    error: null,
    basket: [],
    categories: []
};

const updateBasketStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const updateBasketSuccess = (state, action) => {
    if (action.basketAction === 'add') {
        return updateObject(state, {
            basket: addUpdateBasket(state.basket, action.drink),
            categories: addUpdateCategories(state.categories, action.drink),
            loading: false,
            error: false,
            saved: true
        });
    }
    if (action.basketAction === 'update') {
        return updateObject(state, {
            basket: updateUpdateBasket(state.basket, action.drink),
            loading: false,
            error: false,
            saved: true
        });
    }
    if (action.basketAction === 'delete') {
        return updateObject(state, {
            drink: deleteUpdateBasket(state.basket, action.drink),
            categories: deleteUpdateCategories(state.basket, state.categories, action.drink),
            loading: false,
            error: false,
            saved: true
        });
    } else {
        return state;
    }
};

const emptyBasketStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const emptyBasketSuccess = (state, action) => {
    return updateObject(state, {
        basket: [],
        categories: [],
        loading: false,
        error: false
    });
};

const retrieveBasketStart = (state, action) => {
    return updateObject(state, {
        basket: [],
        loading: true,
        error: null
    });
};

const retrieveBasketSuccess = (state, action) => {
    const savedBasket = retrieveBasket(action.foundBasket);
    const savedCategories = retrieveCategories(action.foundCategories);
    return updateObject(state, {
        basket: savedBasket,
        categories: savedCategories,
        loading: false,
        error: false
    });
};

const retrieveBasketFail = (state, action) => {
    return updateObject(state, {
        basket: [],
        loading: false,
        error: true
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_BASKET_START: return updateBasketStart(state, action);
        case actionTypes.UPDATE_BASKET_SUCCESS: return updateBasketSuccess(state, action);
        case actionTypes.EMPTY_BASKET_START: return emptyBasketStart(state, action);
        case actionTypes.EMPTY_BASKET_SUCCESS: return emptyBasketSuccess(state, action);
        case actionTypes.RETRIEVE_BASKET_START: return retrieveBasketStart(state, action);
        case actionTypes.RETRIEVE_BASKET_SUCCESS: return retrieveBasketSuccess(state, action);
        case actionTypes.RETRIEVE_BASKET_FAIL: return retrieveBasketFail(state, action);
        default: return state;
    }
};

export default reducer;
