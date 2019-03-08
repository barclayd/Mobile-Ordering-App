import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* updateBasketSaga(action){
    yield put(actions.updateBasketStart());
    yield put(actions.updateBasketSuccess(action.drink, action.basketAction));
}
