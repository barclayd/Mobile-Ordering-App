import {takeLatest} from 'redux-saga/effects';
import {getOrdersByCollectionPointSaga} from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchOrders() {
    yield takeLatest(actionTypes.GET_ORDERS_BY_COLLECTION_POINT, getOrdersByCollectionPointSaga);
}
