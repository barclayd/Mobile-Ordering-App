import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../axios-instance';

export function* getOrdersSaga(action) {
    yield put(actions.getOrdersStart());
    try {
        let requestBody = {
          query: `
          query FindOrdersByCollectionPoint($collectionPoint: ID!) {
                    findOrdersByCollectionPoint(
                        collectionPoint: $collectionPoint
                    ) {
                        _id
                        collectionId
                        drinks {
                          _id
                          name
                          price
                          category
                        }
                        collectionPoint {
                          _id
                          collectionPointId
                        }
                        status
                        date
                        transactionId
                        userInfo {
                            email
                            _id
                        }
                   }
                }
            `,
            variables: {
                collectionPoint: action.collectionPointId,
            }
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            yield put(actions.getOrdersFail(response.data.errors[0].message));
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            const fetchData = [];
            for (let key in response.data.data.findOrdersByCollectionPoint) {
                fetchData.push(
                    response.data.data.findOrdersByCollectionPoint[key],
                );
            }
            yield put(actions.getOrdersSuccess(fetchData));
        }
    } catch (err) {
        console.log(err);
        yield put(actions.getOrdersFail(err));
    }
}
