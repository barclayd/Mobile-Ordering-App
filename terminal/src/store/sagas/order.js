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
                        price
                        stripeFee
                        transactionId
                        userInfo {
                            email
                            _id
                        }
                        orderAssignedTo {
                            _id
                            firstName
                            lastName
                        }
                        price
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
        let requestBody;
        if (action.barStaffId) {
            requestBody = {
                query: `
                    mutation UpdateOrder($orderId: ID!, $status: String!, $barStaffId: ID! $completionTime: String) {
                        updateOrder(orderStatusInput: {
                            orderId: $orderId
                            status: $status
                            barStaffId: $barStaffId
                            completionTime: $completionTime
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
                            stripeFee
                            status
                            date
                            transactionId
                            userInfo {
                                email
                                _id
                            }
                            orderAssignedTo {
                                _id
                                firstName
                                lastName
                            }
                        }
                    }
                `,
                variables: {
                    orderId: action.orderId,
                    status: action.status,
                    barStaffId: action.barStaffId,
                    completionTime: action.completionTime
                }
            };
        } else {
            requestBody = {
                query: `
                    mutation UpdateOrder($orderId: ID!, $status: String!, $completionTime: String) {
                        updateOrder(orderStatusInput: {
                            orderId: $orderId
                            status: $status
                            barStaffId: $barStaffId
                            completionTime: $completionTime
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
                            orderAssignedTo {
                                _id
                                firstName
                                lastName
                            }
                            price
                            stripeFee
                        }
                    }
                `,
                variables: {
                    orderId: action.orderId,
                    status: action.status,
                    completionTime: action.completionTime
                }
            };
        }
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

export function* newOrderSaga(action) {
    yield put(actions.newOrderStart());
    if (action.order.hasOwnProperty('drinks')) {
        // check if new order has drinks
        yield put(actions.newOrderSuccess(action.order));
    } else {
        yield put(actions.newOrderFail('Incomplete object retrieved from server'));
        throw Error ('Incomplete object retrieved from server');
    }
}
