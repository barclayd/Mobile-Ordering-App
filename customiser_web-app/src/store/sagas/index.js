import {takeLatest} from 'redux-saga/effects';
import {getOrdersByCollectionPointSaga} from './order';
import {findDrinksSaga} from './drinks';
import * as actionTypes from '../actions/actionTypes';

export function* watchOrders() {
    yield takeLatest(actionTypes.GET_ORDERS_BY_COLLECTION_POINT, getOrdersByCollectionPointSaga);
}

export function* watchDrinks() {
    yield takeLatest(actionTypes.FIND_DRINKS, findDrinksSaga);
}