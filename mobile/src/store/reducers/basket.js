import * as actionTypes from '../actions/actionTypes';
import {updateObject, storeBasket} from "../utility";

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

const updateBasketSuccess = async (state, action) => {
    if (action.basketAction === 'add') {
        const updatedBasket = state.basket.concat(action.drink);
        await storeBasket(updatedBasket);
        return updateObject(state, {
            basket: updatedBasket,
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
        const updatedBasket = state.basket.filter(drink => drink.name !== action.drink.name).concat(newDrinkObject);
        await storeBasket(updatedBasket);
        return updateObject(state, {
            basket: updatedBasket,
            loading: false,
            error: false,
            saved: true
        });
    }
    if (action.basketAction === 'delete') {
        const updatedBasket = state.basket.filter(drink => drink.name !== action.drink.name);
        await storeBasket(updatedBasket);
        return updateObject(state, {
            drink: updatedBasket,
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
        loading: false,
        error: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_BASKET_START: return updateBasketStart(state, action);
        case actionTypes.UPDATE_BASKET_SUCCESS: return updateBasketSuccess(state, action);
        case actionTypes.EMPTY_BASKET_START: return emptyBasketStart(state, action);
        case actionTypes.EMPTY_BASKET_SUCCESS: return emptyBasketSuccess(state, action);
        default: return state;
    }
};

export default reducer;
