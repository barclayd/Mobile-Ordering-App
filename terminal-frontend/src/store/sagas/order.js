import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../axios-instance';

export function* getOrdersSaga(action) {
    yield put(actions.getOrdersStart());
    try {
        let requestBody = {
            query: `
                query {
                    findOrders {
                        drinks {
                            _id
                            name
                            category
                            price
                        }
                        status
                        date
                        _id
                        transactionId
                   }
                }
            `
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            yield put(actions.getOrdersFail(response.data.errors[0].message));
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            const fetchData = [];
            for (let key in response.data.data.findOrders) {
                fetchData.push(
                    response.data.data.findOrders[key],
                );
            }
            yield put(actions.getOrdersSuccess(fetchData));
        }
    } catch (err) {
        console.log(err);
        yield put(actions.getOrdersFail(err));
    }
}
