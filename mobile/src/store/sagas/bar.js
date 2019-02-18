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
                        name
                        type
                        description
                        barCode
                        latitude
                        longitude
                    }
                }
            `,
            variables: {
                barCode: action.barCode
            }
        };

        const response = yield axios.post('http://localhost:3000/graphql', JSON.stringify(requestBody));
        if (response.data.errors) {
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            yield put(actions.findBarSuccess(response.data.data.findBar.name, response.data.data.findBar.type, response.data.data.findBar.description, response.data.data.findBar.barCode, response.data.data.findBar.latitude, response.data.data.findBar.longitude));
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
