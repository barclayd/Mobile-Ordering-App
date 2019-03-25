import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../axios-instance';

export function* getOrdersByCollectionPointSaga(action) {
    yield put(actions.getOrdersByCollectionPointStart());
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
                        orderAssignedTo {
                            _id: ID
                            firstName
                            lastName
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
            yield put(actions.getOrdersByCollectionPointFail(response.data.errors[0].message));
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            const fetchData = [];
            for (let key in response.data.data.findOrdersByCollectionPoint) {
                fetchData.push(
                    response.data.data.findOrdersByCollectionPoint[key]
                );
            }
            yield put(actions.getOrdersByCollectionPointSuccess(fetchData));
        }
    } catch (err) {
        console.log(err);
        yield put(actions.getOrdersByCollectionPointFail(err));
    }
}

export function* updateOrderSaga(action) {
    yield put(actions.updateOrderStart());
    try {
        let requestBody = {
            query: `
          mutation UpdateOrder($orderId: ID!, $status: String!, $barStaffId: ID!) {
                    updateOrder(orderStatusInput: {
                            orderId: $orderId
                            status: $status
                            barStaffId: $barStaffId
                        }) {
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
                orderId: action.orderId,
                status: action.status,
                barStaffId: action.barStaffId
            }
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            yield put(actions.updateOrderFail(response.data.errors[0].message));
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            yield put(actions.updateOrderSuccess(response.data.data.updateOrder, action.orderId));
        }
    } catch (err) {
        console.log(err);
        yield put(actions.updateOrderFail(err));
    }
}
