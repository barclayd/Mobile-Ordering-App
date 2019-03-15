import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import {Vibration} from "react-native";
import {storeBasket, storeCategories, emptyBasket} from '../utility';

export function* updateBasketSaga(action){
    yield put(actions.updateBasketStart());
    Vibration.vibrate();
    let updatedBasket;
    let updatedCategories;
    switch (action.basketAction) {
        case ('add'):
            updatedBasket = action.oldBasketState.concat(action.drink);
            updatedCategories = (!action.oldCategoriesState.includes(action.drink.category)) ? action.oldCategoriesState.concat(action.drink.category) : action.oldCategoriesState;
            yield storeBasket(updatedBasket);
            yield storeCategories(updatedCategories);
            break;
        case ('update'):
            const oldDrinkObject = action.oldBasketState.filter(drink => drink.name === action.drink.name);
            const updatedQuantity = action.drink.quantity;
            const newDrinkObject = {
                ...oldDrinkObject[0],
                quantity: updatedQuantity + oldDrinkObject[0].quantity
            };
            console.log(newDrinkObject);
            updatedBasket = action.oldBasketState.filter(drink => drink.name !== action.drink.name).concat(newDrinkObject);
            yield storeBasket(updatedBasket);
            break;
        case ('delete'):
            const countIn = action.oldBasketState.filter(drink => drink === action.drink.category).length > 1;
            updatedCategories = countIn ? action.oldCategoriesState : action.oldCategoriesState.includes(action.drink.category) ? action.oldCategoriesState.filter(category => category !== action.drink.category) : action.oldCategoriesState;
            updatedBasket =  action.oldBasketState.filter(drink => drink.name !== action.drink.name);
            yield storeBasket(updatedBasket);
            yield storeCategories(updatedCategories);
    }
    yield put(actions.updateBasketSuccess(action.drink, action.basketAction));
}

export function* emptyBasketSaga(action) {
    yield put(actions.emptyBasketStart());
    yield emptyBasket();
    yield put(actions.emptyBasketSuccess());
}
