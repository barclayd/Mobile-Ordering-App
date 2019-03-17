import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-instance';
import {AsyncStorage} from 'react-native';
import {
    popToRoot,
    setOrderStatus
} from "../../utility/navigation";
import {emptyBasket} from '../utility';

const orderRedirect = async (orderId) => {
    await popToRoot('ViewMenus');
    await setOrderStatus('ViewMenus', orderId);
};

export function* submitOrderSaga(action) {
    let date = new Date();
    const user = yield AsyncStorage.getItem('userId');
    yield put(actions.submitOrderStart());
    let drinksList = [];
    action.order.map(drink => {
      if (drink.quantity > 1)
        for (let i = 0; i < drink.quantity; i++){
          drinksList.push(drink._id)
        }
        else {
          drinksList.push(drink._id)
        }
    });
    console.log(drinksList);
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
                        _id
                        drinks {
                          name
                          price
                          _id
                       }
                        collectionPoint
                        status
                        userInfo {
                          email
                          name
                        }
                   } 
                }
            `,
            variables: {
                drinks: drinksList,
                collectionPoint: "MOBILE APP",
                status: "PENDING",
                date: date,
                userInfo: user ? user : '5c69c7c058574e24c841ddc8'
            }
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            console.log('error was found');
            yield put(actions.submitOrderFail());
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            console.log('made it');
            console.log(response.data);
            orderId = response.data.data.createOrder._id
            yield AsyncStorage.setItem("orderId", orderId);
            yield put(actions.submitOrderSuccess(response.data));
            yield put(actions.emptyBasketStart());
            yield emptyBasket();
            yield put(actions.emptyBasketSuccess());
            yield orderRedirect(orderId);
        }
    } catch (err) {
        yield put(actions.submitOrderFail(err));
        console.log(err);
    }
}

export function* orderHistorySaga(action) {
    const user = yield AsyncStorage.getItem('userId');
    console.log("action",action)
    yield put(actions.orderHistoryStart());
    try {
        let requestBody = {
            query: `
                query FindOrdersByUser($userInfo: ID!) {
                    findOrdersByUser(userInfo: $userInfo) {
                        drinks {
                            _id
                            name
                            category
                            price
                        }
                        collectionPoint
                        status
                        date
                        _id
                        transactionId
                   }
                }
            `,
            variables: {
                userInfo: user ? user : '5c69c7c058574e24c841ddc8'
            }
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            yield put(actions.orderHistoryFailure());
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            const fetchData = [];
            for (let key in response.data.data.findOrdersByUser) {
                fetchData.push(
                    response.data.data.findOrdersByUser[key],
                );
            }
            yield put(actions.orderHistorySuccess(fetchData));
        }
    } catch (err) {
        console.log(err);
        yield put(actions.orderHistoryFailure());
    }
}

export function* orderStatusSaga(action){
    yield put(actions.orderStatusStart());
    console.log("order Status id")
    const id = yield AsyncStorage.getItem("orderId");
    try {
        let requestBody = {
            query: `
                query FindOrderById($id: ID!) {
                    findOrderById(id: $id) {
                        drinks {
                            name
                            category
                            price
                        }
                        collectionPoint
                        status
                        date
                        _id
                        transactionId
                        userInfo{
                            email
                            name
                        }
                   }
                }
            `,
            variables: {
                id: id ? id : '5c8d3e036d45a435da3d385d'
            }
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            yield put(actions.orderHistoryFailure());
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            // console.log("response",response)
        yield put(actions.orderStatusSuccess(response.data.data))
        }
    } catch (err) {
        console.log(err);
        yield put(actions.orderHistoryFailure());
    }
}


