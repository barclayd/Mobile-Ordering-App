import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import {Vibration} from "react-native";
import {storeBasket, storeCategories} from '../utility';

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
            updatedBasket = action.oldBasketState.concat(action.drink);
            updatedCategories = (action.oldCategoriesState.includes(action.drink.category)) ? action.oldCategoriesState.concat(action.drink.category) : action.oldCategoriesState;
            yield storeBasket(updatedBasket);
            yield storeCategories(updatedCategories);
    }
    yield put(actions.updateBasketSuccess(action.drink, action.basketAction));
}
