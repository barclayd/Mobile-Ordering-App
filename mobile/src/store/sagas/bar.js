import {put} from 'redux-saga/effects';
import {AsyncStorage, Platform} from 'react-native';
import IonicIcon from "react-native-vector-icons/Ionicons";
import {setMainApp, setMainAppSettings} from "../../utility/navigation";
import axios from '../../axios-instance';
import * as actions from '../actions/index';

export function* findBarSaga(action) {
    yield put(actions.findBarStart());
    try {
        const requestBody = {
            query: `
                query findBar($barCode: String!) {
                    findBar(barCode: $barCode) {
                        _id
                        name
                        type
                        description
                        barCode
                        latitude
                        longitude
                        image
                        menus {
                            _id
                            name
                            image
                            description
                            drinks {
                                name
                                category
                                nutritionInfo
                                price
                                _id
                            }
                        }
                    }
                }
            `,
            variables: {
                barCode: action.barCode
            }
        };

        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            const fetchedMenusData = [];
            for (let key in response.data.data.findBar.menus) {
                fetchedMenusData.push({
                    ...response.data.data.findBar.menus[key]
                });
            }
            yield put(actions.findBarSuccess(response.data.data.findBar.name, response.data.data.findBar.type, response.data.data.findBar.description, response.data.data.findBar.barCode, response.data.data.findBar.latitude, response.data.data.findBar.longitude, response.data.data.findBar.image, fetchedMenusData));
            const userId = yield AsyncStorage.getItem("userId");
            if (userId) {
                yield put(actions.updateLastVisitedBar(userId, response.data.data.findBar._id));
            }
            const barId =  yield AsyncStorage.getItem("barId");
            if (!barId) {
                AsyncStorage.setItem("barId", response.data.data.findBar._id);
                AsyncStorage.setItem("barName", response.data.data.findBar.name);
            }
            Promise.all([
                IonicIcon.getImageSource((Platform.OS === 'android' ? "md-menu" : "ios-menu"), 30),
                IonicIcon.getImageSource((Platform.OS === 'android' ? "md-person" : "ios-person"), 30)
            ])
                .then(sources => {
                    setMainAppSettings(sources[0], sources[1]);
                    setMainApp(action.componentId, response.data.data.findBar.name);
                });
        }
    } catch (err) {
        console.log(err);
        yield put(actions.findBarFail(err));
    }
}

export function* updateLastVisitedBarSaga(action) {
    yield put(actions.updateLastVisitedBarStart());
    try {
        const requestBody = {
            query: `
                mutation updateLastVisitedBar($userId: ID!, $barId: ID!) {
                    updateLastVisitedBar(
                    userId: $userId
                    barId: $barId
                    ) {
                        name
                        _id
                        lastVisitedBar {
                            _id
                            name
                        }
                    }
                }
            `,
            variables: {
                userId: action.userId,
                barId: action.barId
            }
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            yield put(actions.updateLastVisitedBarFail());
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            yield AsyncStorage.setItem("barId", action.barId);
            yield AsyncStorage.setItem("barName", response.data.data.updateLastVisitedBar.lastVisitedBar.name);
            yield put(actions.updateLastVisitedBarSuccess(response.data.data.updateLastVisitedBar.lastVisitedBar.name, response.data.data.updateLastVisitedBar.lastVisitedBar._id));
        }
    } catch (err) {
        console.log(err);
        yield put(actions.updateLastVisitedBarFail(err));
    }
}

export function* findAllBarsSaga(action) {
    yield put(actions.findAllBarsStart());
    try {
        const requestBody = {
            query: `
                query {
                    findAllBars {
                        _id
                        name
                        barCode
                        latitude
                        longitude
                        description
                        type
                        image
                    }
                }
            `
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            yield put(actions.findAllBarsFail(response.data.errors[0].message));
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            const fetchData = [];
            for (let key in response.data.data.findAllBars) {
                fetchData.push({
                    ...response.data.data.findAllBars[key]
                });
            }
            yield put(actions.findAllBarsSuccess(fetchData));
        }
    } catch (err) {
        console.log(err);
        yield put(actions.findAllBarsFail(err));
    }
}
