import {put} from 'redux-saga/effects';
import axios from '../../axios-instance';
import * as actions from '../actions/index';
import {AsyncStorage} from "react-native";

export function* findCollectionPointsSaga(action){
    yield put(actions.findCollectionPointsStart());
    const barId = yield AsyncStorage.getItem("barId");
    try {
        let requestBody = {
            query: `
                query findCollectionPointsByBar($barId: ID!) {
                    findCollectionPointsByBar(barId: $barId) {
                        _id
                        name
                        collectionPointId
                        bar {
                            name
                            _id
                        }
                   }
                }
            `,
            variables: {
                barId: barId
            }
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            yield put(actions.findCollectionPointsFail(response.data.errors[0].message));
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            yield put(actions.findCollectionPointsSuccess(response.data.data))
        }
    } catch (err) {
        console.log(err);
        yield put(actions.findCollectionPointsFail(err));
    }
}


