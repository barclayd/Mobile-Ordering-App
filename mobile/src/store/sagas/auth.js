import {put} from 'redux-saga/effects';
import axios from '../../axios-instance';
import {Alert} from 'react-native';
import * as actions from '../actions/index';
import IonicIcon from "react-native-vector-icons/Ionicons";
import {Platform} from "react-native";
import {setMainApp, setMainAppSettings} from "../../utility/navigation";

export function* authUserSaga(action) {
    yield put(actions.authStart());

    if (action.isSignUp) {
        try {
            let requestBody = {
                query: `
                mutation CreateUser($email: String!, $password: String!, $name: String!) {
                    createUser(userInput: {
                        email: $email,
                        password: $password,
                        name: $name,
                        role: "customer"
                    }) {
                        _id
                        email
                        name
                    }
                }
            `,
                variables: {
                    email: action.email,
                    password: action.password,
                    name: action.name
                }
            };

            const response = yield axios.post('http://localhost:3000/graphql', JSON.stringify(requestBody));
            console.log(response.data.errors);
            if (response.data.errors.length > 0) {
                throw Error(response.data.errors[0].message);
            }
            if (response.status === 200 && response.status !== 201) {
               console.log('success');
            } else {
                Alert.alert('Unsuccessful sign up', 'Account sign up failed. Please try again')
            }
        } catch (err) {
            console.log(err);
            Alert.alert('Unsuccessful sign up', `Account sign up failed.\n\n ${err}.`);
        }
    } else {
        try {
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
                Alert.alert('Unsuccessful login 🔒', 'Login failed. Please try again')
            }
        } catch (err) {
            console.log(err);
            Alert.alert('Unsuccessful login 🔒', 'Authentication failed. Please try again')
        }
    }
}

export function* logoutSaga(action) {
    yield put(actions.logoutSucceed());
}
