import {takeEvery, takeLatest, all} from 'redux-saga/effects';
import {authUserSaga, logoutSaga, authCheckStateSaga, checkAuthTimeoutSaga} from "./auth";
import {findBarSaga} from './bar';
import {findDrinksSaga, findDrinkCategoriesSaga} from './drinks';
import {createBasketSaga, updateBasketSaga} from './basket';
import * as actionTypes from '../actions/actionTypes';


export function* watchAuth() {
    // run all simultaneously
    yield all ([
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
    ]);
}

export function* watchBar() {
    yield takeLatest(actionTypes.FIND_BAR, findBarSaga);
}

export function* watchDrinks() {
    yield takeLatest(actionTypes.FIND_DRINKS, findDrinksSaga);
    yield takeLatest(actionTypes.FIND_DRINK_CATEGORIES, findDrinkCategoriesSaga);
}

export function* watchBasket() {
    yield takeLatest(actionTypes.CREATE_BASKET, createBasketSaga);
    yield takeLatest(actionTypes.UPDATE_BASKET, updateBasketSaga);
}
