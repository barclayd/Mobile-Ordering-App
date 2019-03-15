import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import {Vibration} from "react-native";
import {storeBasket, storeCategories, emptyBasket, addUpdateBasket, addUpdateCategories, updateUpdateBasket, deleteUpdateBasket, deleteUpdateCategories} from '../utility';

export function* updateBasketSaga(action){
    yield put(actions.updateBasketStart());
    Vibration.vibrate();
    let updatedBasket;
    let updatedCategories;
    switch (action.basketAction) {
        case ('add'):
            updatedBasket = addUpdateBasket(action.oldBasketState, action.drink);
            updatedCategories = addUpdateCategories(action.oldCategoriesState, action.drink);
            yield storeBasket(updatedBasket);
            yield storeCategories(updatedCategories);
            break;
        case ('update'):
            updatedBasket = updateUpdateBasket(action.oldBasketState, action.drink);
            yield storeBasket(updatedBasket);
            break;
        case ('delete'):
            updatedCategories = deleteUpdateCategories(action.oldBasketState, action.oldCategoriesState, action.drink);
            updatedBasket = deleteUpdateBasket(action.oldBasketState, action.drink);
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
