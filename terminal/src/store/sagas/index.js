import {takeLatest} from 'redux-saga/effects';
import {getOrdersByCollectionPointSaga, updateOrderSaga} from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchOrders() {
    yield takeLatest(actionTypes.GET_ORDERS_BY_COLLECTION_POINT, getOrdersByCollectionPointSaga);
    yield takeLatest(actionTypes.UPDATE_ORDER, updateOrderSaga);
}
