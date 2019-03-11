import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* submitOrder(action) {
    yield put(actions.submitOrderStart());
    yield put(actions.submitOrderSuccess(action.basket))
  }
