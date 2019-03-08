import {takeEvery, takeLatest, all} from 'redux-saga/effects';
import {authUserSaga, logoutSaga, authCheckStateSaga, checkAuthTimeoutSaga, autoSignInSaga} from "./auth";
import {findBarSaga} from './bar';
import {findDrinksSaga, findDrinkCategoriesSaga} from './drinks';
import * as actionTypes from '../actions/actionTypes';


export function* watchAuth() {
    // run all simultaneously
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
}

export function* watchDrinks() {
    yield takeLatest(actionTypes.FIND_DRINKS, findDrinksSaga);
    yield takeLatest(actionTypes.FIND_DRINK_CATEGORIES, findDrinkCategoriesSaga);
}
