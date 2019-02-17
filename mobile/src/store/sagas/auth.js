import {put} from 'redux-saga/effects';
import axios from '../../axios-instance';
import {Navigation} from "react-native-navigation";
import * as actions from '../actions/index';
import IonicIcon from "react-native-vector-icons/Ionicons";
import {Platform} from "react-native";
import {setMainApp, setMainAppSettings} from "../../utility/navigation";

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
            Promise.all([
                IonicIcon.getImageSource((Platform.OS === 'android' ? "md-menu" : "ios-menu"), 30),
                IonicIcon.getImageSource((Platform.OS === 'android' ? "md-person" : "ios-person"), 30)
            ])
                .then(sources => {
                    setMainAppSettings(sources[0], sources[1]);
                    setMainApp(action.componentId);
                });
        } else {
            yield put(actions.authFail());
        }
    } catch (err) {
       console.log(err);
    }
}

export function* logoutSaga(action) {
    yield put(actions.logoutSucceed());
}
