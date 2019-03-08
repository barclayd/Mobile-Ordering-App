import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import {Vibration} from "react-native";

export function* updateBasketSaga(action){
    yield put(actions.updateBasketStart());
    // check if item to be added already exists in basket
    // if so, update quantity instead of appending new drinkObject
    // change action.basketAction from 'add' to 'update'
    Vibration.vibrate();
    yield put(actions.updateBasketSuccess(action.drink, action.basketAction));
}
