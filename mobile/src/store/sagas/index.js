import {takeEvery, takeLatest, all} from 'redux-saga/effects';
import {authUserSaga, logoutSaga, authCheckStateSaga, checkAuthTimeoutSaga, autoSignInSaga} from "./auth";
import {findBarSaga, updateLastVisitedBarSaga} from './bar';
import {findDrinksSaga, findDrinkCategoriesSaga} from './drinks';
import {updateBasketSaga, emptyBasketSaga} from './basket';
import {submitOrderSaga, orderHistorySaga, orderStatusSaga} from './order';
import * as actionTypes from '../actions/actionTypes';
import { findCollectionPointsSaga } from './collectionPoint';

export function* watchAuth() {
    yield all ([
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_AUTO_LOGIN, autoSignInSaga)
    ]);
}

export function* watchBar() {
    yield takeLatest(actionTypes.FIND_BAR, findBarSaga);
    yield takeLatest(actionTypes.UPDATE_LAST_VISITED_BAR, updateLastVisitedBarSaga);
}

export function* watchDrinks() {
    yield takeLatest(actionTypes.FIND_DRINKS, findDrinksSaga);
    yield takeLatest(actionTypes.FIND_DRINK_CATEGORIES, findDrinkCategoriesSaga);
}

export function* watchBasket() {
    yield takeLatest(actionTypes.UPDATE_BASKET, updateBasketSaga);
    yield takeLatest(actionTypes.EMPTY_BASKET, emptyBasketSaga);
}

export function* watchOrder() {
    yield takeLatest(actionTypes.SUBMIT_ORDER, submitOrderSaga);
    yield takeLatest(actionTypes.ORDER_HISTORY, orderHistorySaga);
    yield takeLatest(actionTypes.RETRIEVE_ORDER_STATUS, orderStatusSaga);
}

export function* watchCollectionPoint() {
    yield takeLatest(actionTypes.FIND_COLLECTION_POINTS, findCollectionPointsSaga);
}
