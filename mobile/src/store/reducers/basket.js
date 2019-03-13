import * as actionTypes from '../actions/actionTypes';
import {updateObject, retrieveBasket, retrieveCategories} from "../utility";

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
            basket: state.basket.concat(action.drink),
            categories: (!state.categories.includes(action.drink.category)) ? state.categories.concat(action.drink.category) : state.categories,
            loading: false,
            error: false,
            saved: true
        });
    }
    if (action.basketAction === 'update') {
        const oldDrinkObject = state.basket.filter(drink => drink.name === action.drink.name);
        const updatedQuantity = action.drink.quantity;
        const newDrinkObject = {
            ...oldDrinkObject[0],
            quantity: updatedQuantity
        };
        return updateObject(state, {
            basket: state.basket.filter(drink => drink.name !== action.drink.name).concat(newDrinkObject),
            loading: false,
            error: false,
            saved: true
        });
    }
    if (action.basketAction === 'delete') {
        const countIn = state.basket.filter(drink => drink === action.drink.category).length > 1;
        return updateObject(state, {
            drink: state.basket.filter(drink => drink.name !== action.drink.name),
            categories: countIn ? state.categories : state.categories.includes(action.drink.category) ? state.categories.filter(category => category !== action.drink.category) : state.categories,
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
