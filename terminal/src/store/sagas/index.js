import {takeLatest} from 'redux-saga/effects';
import {getOrdersByCollectionPointSaga, updateOrderSaga} from './order';
import {findBarStaffSaga} from './bar';
import * as actionTypes from '../actions/actionTypes';

export function* watchOrders() {
    yield takeLatest(actionTypes.GET_ORDERS_BY_COLLECTION_POINT, getOrdersByCollectionPointSaga);
    yield takeLatest(actionTypes.UPDATE_ORDER, updateOrderSaga);
}

export function* watchBar() {
    yield takeLatest(actionTypes.FIND_BAR_STAFF, findBarStaffSaga);
}
