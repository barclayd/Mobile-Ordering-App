import axios from '../../axios-instance'
import * as actions from '../actions/index';

export function* submitOrder(action) {
    console.log("hello")
    yield put(actions.submitOrderStart())
    console.log('Hello Sagas!',action)
    yield put(actions.submitOrderSuccess(action.basket))
  }