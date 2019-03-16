import {put} from 'redux-saga/effects';
import {AsyncStorage} from 'react-native';
import axios from '../../axios-instance';
import {Alert} from 'react-native';
import * as actions from '../actions/index';
import IonicIcon from "react-native-vector-icons/Ionicons";
import {Platform} from "react-native";
import {setMainApp, setMainAppSettings} from "../../utility/navigation";
import {emptyBasket} from '../utility';

const authRedirect = (action) => {
    Promise.all([
        IonicIcon.getImageSource((Platform.OS === 'android' ? "md-menu" : "ios-menu"), 30),
        IonicIcon.getImageSource((Platform.OS === 'android' ? "md-person" : "ios-person"), 30)
    ])
        .then(sources => {
            setMainAppSettings(sources[0], sources[1]);
            setMainApp(action.componentId);
        });
};

export function* logoutSaga(action) {
    yield AsyncStorage.removeItem("token");
    yield AsyncStorage.removeItem("userId");
    yield AsyncStorage.removeItem("name");
    yield put(actions.emptyBasketStart());
    yield emptyBasket();
    yield put(actions.emptyBasketSuccess());
    yield put(actions.logoutSucceed());
}

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

            const response = yield axios.post('/', JSON.stringify(requestBody));
            if (response.data.errors) {
                throw Error(response.data.errors[0].message);
            }
            if (response.status === 200 && response.status !== 201) {
                try {
                    let requestBody = {
                        query: `
                query Login($email: String!, $password: String!){
                    login(email: $email, password: $password) {
                        userId
                        token
                        tokenExpiration
                        name
                    }
                }
            `,
                        variables: {
                            email: action.email,
                            password: action.password
                        }
                    };

                    const res = yield axios.post('/', JSON.stringify(requestBody));
                    if (res.status === 200 && res.status !== 201) {
                        yield put(actions.authSuccess(res.data.data.login.token, res.data.data.login.userId, res.data.data.login.tokenExpiration, res.data.data.login.name));
                        yield AsyncStorage.setItem("token", res.data.data.login.token);
                        yield AsyncStorage.setItem("userId", res.data.data.login.userId);
                        yield AsyncStorage.setItem("name", res.data.data.login.name);
                        yield authRedirect(action);
                    } else {
                        yield put(actions.authFail());
                        Alert.alert('Unsuccessful login 🔒', 'Login failed. Please try again.')
                    }
                } catch (err) {
                    console.log(err);
                    yield put(actions.authFail());
                    Alert.alert('Unsuccessful login 🔒', 'Authentication failed. Please try again.')
                }
            } else {
                Alert.alert('Unsuccessful sign up', 'Account sign up failed. Please try again.')
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
                        name
                    }
                }
            `,
                variables: {
                    email: action.email,
                    password: action.password
                }
            };

            const response = yield axios.post('/', JSON.stringify(requestBody));
            if (response.status === 200 && response.status !== 201) {
                yield AsyncStorage.setItem("name", response.data.data.login.name);
                yield AsyncStorage.setItem("token", response.data.data.login.token);
                yield AsyncStorage.setItem("userId", response.data.data.login.userId);
                yield put(actions.authSuccess(response.data.data.login.token, response.data.data.login.userId, response.data.data.login.tokenExpiration, response.data.data.login.name));
               yield authRedirect(action, response.data.data.login.name);
            } else {
                yield put(actions.authFail());
                Alert.alert('Unsuccessful login 🔒', 'Login failed. Please try again')
            }
        } catch (err) {
            console.log(err);
            yield put(actions.authFail(err));
            Alert.alert('Unsuccessful login 🔒', 'Authentication failed. Please try again')
        }
    }
}

export function* authCheckStateSaga(action) {
    const token = yield AsyncStorage.getItem("token");
    if (!token) {
        yield put(actions.logout());
    } else {
        authRedirect(action);
    }
    yield put(actions.retrieveBasketStart());
    const basket = yield AsyncStorage.getItem("basket");
    const categories = yield AsyncStorage.getItem("categories");
    if (basket && categories) {
        yield put(actions.retrieveBasketSuccess(basket, categories));
    } else {
        yield put(actions.retrieveBasketFail());
        yield put(actions.emptyBasketStart());
        yield emptyBasket();
        const basket = yield AsyncStorage.getItem("basket");
        const categories = yield AsyncStorage.getItem("categories");
        if (!basket && !categories) {
            yield put(actions.emptyBasketSuccess());
        }
    }
}

export function* checkAuthTimeoutSaga(action) {
    yield put(actions.logout());
}

export function* autoSignInSaga(action) {
    const token = yield AsyncStorage.getItem("token");
    if (token) {
        yield authRedirect(action);
    }
}
