import {put} from 'redux-saga/effects';
import axios from '../../axios-instance';
import * as actions from '../actions/index';

export function* findCollectionPointsSaga(action){
    console.log("collection point saga")
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
                            name
                            _id
                        }
                   }
                }
            `,
            variables: {
                barId: '5c6ab350180f855c65fce6ef'
            }
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            yield put(actions.findCollectionPointsFail(response.data.errors[0].message));
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
        console.log("response",response)
        yield put(actions.findCollectionPointsSuccess(response.data.data))
        }
    } catch (err) {
        console.log(err);
        yield put(actions.findCollectionPointsFail(err));
    }
}


