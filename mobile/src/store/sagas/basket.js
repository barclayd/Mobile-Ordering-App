import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import {Vibration} from "react-native";

export function* updateBasketSaga(action){
    yield put(actions.updateBasketStart());
    Vibration.vibrate();
    yield put(actions.updateBasketSuccess(action.drink, action.basketAction));
}
