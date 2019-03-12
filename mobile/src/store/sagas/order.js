import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-instance';

export function* submitOrderSaga(action) {
    yield put(actions.submitOrderStart());
    try {
        let requestBody = {
            query: `
                mutation CreateOrder($drinks: [ID!], $collectionPoint: String!, $status: String!, $date: String!, $userInfo: ID!) {
                    createOrder(orderInput: {
                        drinks: $drinks
                        collectionPoint: $collectionPoint
                        status: $status
                        date: $date
                        userInfo: $userInfo
                    }) {
                        collectionPoint
                        _id
                   } 
                }
            `,
            variables: {
                drinks: ["5c7d3046a90475bf3c7dec51", "5c7dff60a28b7af82260a1d4"],
                collectionPoint: "MOBILE APP",
                status: "PENDING",
                date: "2019-03-12T00:35:17.559Z",
                userInfo: "5c69d87973c39d2e28fbe9cf"
            }
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            console.log('error was found');
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            console.log('made it');
            console.log(response.data);
        }
    } catch (err) {
        console.log(err);
    }
}

export function* orderHistorySaga(action) {
    yield put(actions.orderHistoryStart());
    try {
        let requestBody = {
            query: `
                query FindOrdersByUser($userInfo: ID!) {
                    findOrdersByUser(userInfo: $userInfo) {
                        collectionPoint
                        status
                        date
                        _id
                   }
                }
            `,
            variables: {
                userInfo: "5c69d87973c39d2e28fbe9cf"
            }
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            // dispatch to ordrerHistoryFailure action
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            // need to map data into new array
            console.log(response.data);
            yield put(actions.orderHistorySuccess());

        }
    } catch (err) {
        console.log(err);
        yield put(actions.orderHistoryFailure());
    }
}


