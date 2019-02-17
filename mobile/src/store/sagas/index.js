import {takeEvery, all} from 'redux-saga/effects';
import {authUserSaga, logoutSaga, authCheckStateSaga, checkAuthTimeoutSaga} from "./auth";
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
