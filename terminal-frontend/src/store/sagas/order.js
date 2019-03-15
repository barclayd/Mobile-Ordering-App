import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../axios-instance';

export function* getOrdersSaga(action) {
    yield put(actions.getOrdersStart());
    try {
        let requestBody = {
            // query: `
            //     query FindOrdersByUser($userInfo: ID!) {
            //         findOrdersByUser(userInfo: $userInfo) {
            //             drinks {
            //                 _id
            //                 name
            //                 category
            //                 price
            //             }
            //             collectionPoint
            //             status
            //             date
            //             _id
            //             transactionId
            //        }
            //     }
            // `,
            // variables: {
            //     userInfo: user ? user : '5c69c7c058574e24c841ddc8'
            // }
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            yield put(actions.getOrdersFail(response.data.errors[0].message));
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            const fetchData = [];
            for (let key in response.data.data.findOrdersByUser) {
                fetchData.push(
                    response.data.data.findOrdersByUser[key],
                );
            }
            yield put(actions.getOrdersSuccess(fetchData));
        }
    } catch (err) {
        console.log(err);
        yield put(actions.getOrdersFail(err));
    }
}
