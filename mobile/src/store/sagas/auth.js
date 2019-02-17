import {put} from 'redux-saga/effects';
import axios from '../../axios-instance';
import * as actions from '../actions/index';

export function* authUserSaga(action) {
    yield put(actions.authStart());
    let requestBody = {
        query: `
                query Login($email: String!, $password: String!){
                    login(email: $email, password: $password) {
                        userId
                        token
                        tokenExpiration
                    }
                }
            `,
        variables: {
            email: action.email,
            password: action.password
        }
    };

    try {
        const response = yield axios.post('http://localhost:3000/graphql', JSON.stringify(requestBody));
        if (response.status === 200 && response.status !== 201) {
            yield put(actions.authSuccess(response.data.data.login.token, response.data.data.login.userId, response.data.data.login.tokenExpiration));
        } else {
            yield put(actions.authFail());
        }
    } catch (err) {
       console.log(err);
    }
}
