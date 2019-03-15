import {takeLatest} from 'redux-saga/effects';
import {getOrdersSaga} from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchOrders() {
    yield takeLatest(actionTypes.GET_ORDERS, getOrdersSaga);
}
