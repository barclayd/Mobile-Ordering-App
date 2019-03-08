import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* createBasketSaga(action){
    yield put(actions.createBasketStart());
    yield put(actions.createBasketSuccess(action.drink));
}

export function* updateBasketSaga(action){
    yield put(actions.updateBasketStart());
    yield put(actions.updateBasketSuccess(action.drink));
}
