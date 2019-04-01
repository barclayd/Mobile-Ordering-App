import {takeLatest, takeEvery} from 'redux-saga/effects';
import {getOrdersByCollectionPointSaga, updateOrderSaga, newOrderSaga} from './order';
import {findBarStaffSaga} from './bar';
import * as actionTypes from '../actions/actionTypes';

export function* watchOrders() {
    yield takeLatest(actionTypes.GET_ORDERS_BY_COLLECTION_POINT, getOrdersByCollectionPointSaga);
    yield takeEvery(actionTypes.UPDATE_ORDER, updateOrderSaga);
    yield takeEvery(actionTypes.NEW_ORDER, newOrderSaga);// Use takeEvery here so concurrent order updates will be written to state
}

export function* watchBar() {
    yield takeLatest(actionTypes.FIND_BAR_STAFF, findBarStaffSaga);
}
