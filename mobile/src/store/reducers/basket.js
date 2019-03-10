import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

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
        const oldDrinkObject = state.basket.filter(drink => drink.name === action.drink.name)
        const updatedQuantity = action.drink.quantity
        const newDrinkObject = {
            ...oldDrinkObject[0],
            quantity: updatedQuantity
        }
        return updateObject(state, {
            basket: state.basket.filter(drink => drink.name !== action.drink.name).concat(newDrinkObject),
            loading: false,
            error: false,
            saved: true
        });
    }
    if (action.basketAction === 'delete') {
        return updateObject(state, {
            drink: state.basket.filter(drink => drink.name !== action.drink.name),
            loading: false,
            error: false,
            saved: true
        });
    } else {
        return state;
    }
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_BASKET_START: return updateBasketStart(state, action);
        case actionTypes.UPDATE_BASKET_SUCCESS: return updateBasketSuccess(state, action);
        default: return state;
    }
};

export default reducer;
