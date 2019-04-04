import {put} from 'redux-saga/effects';
import axios from '../axios-instance';
import * as actions from '../actions/index';

export function* findCollectionPointsSaga(action){
    yield put(actions.findCollectionPointsStart());
    try {
        let requestBody = {
            query: `
                query findCollectionPointsByBar($barId: ID!) {
                    findCollectionPointsByBar(barId: $barId) {
                        _id
                        name
                        collectionPointId
                        bar {
                            _id
                            name
                        }
                   }
                }
            `,
            variables: {
                barId: action.barId
            }
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            yield put(actions.findCollectionPointsFail(response.data.errors[0].message));
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            yield put(actions.findCollectionPointsSuccess(response.data.data.findCollectionPointsByBar))
        }
    } catch (err) {
        console.log(err);
        yield put(actions.findCollectionPointsFail(err));
    }
}