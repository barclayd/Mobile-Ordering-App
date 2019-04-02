import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-instance';
import stripe from 'tipsi-stripe'
import {AsyncStorage, Alert} from 'react-native';
import {
    popToRoot,
    setOrderStatus
} from "../../utility/navigation";
import {emptyBasket} from '../utility';
import {errorNotification} from "../../notifications/ErrorHandling";

const orderRedirect = async (collectionId, userId, collectionPoint, date, orderId) => {
    await popToRoot('ViewMenus');
    await setOrderStatus('ViewMenus', collectionId, userId, collectionPoint, date, orderId);
};

export function* submitOrderSaga(action) {
    yield stripe.setOptions({
        publishableKey: 'pk_test_YTzEkzlEFVjyy6GAez7JqTse'
    });

    const expMonth = parseInt(action.paymentInfo.expiration.value.substring(0, action.paymentInfo.expiration.value.indexOf("/")));
    const expYear = parseInt(action.paymentInfo.expiration.value.split('/').pop());

    const payment = {
        number: action.paymentInfo.number.value,
        cvc: action.paymentInfo.cvc.value,
        expMonth,
        expYear
    };

    const token = yield stripe.createTokenWithCard(payment);
    const orderPrice = parseFloat(action.basketPrice) * 100;

    const date = new Date().toISOString();
    const userToken = yield AsyncStorage.getItem('token');
    const user = yield AsyncStorage.getItem('userId');
    const collectionId = action.paymentInfo.collectionPoint.id;

    yield put(actions.submitOrderStart());
    let drinksList = [];
    action.order.map(drink => {
      if (drink.quantity > 1)
        for (let i = 0; i < drink.quantity; i++){
          drinksList.push(drink._id);
        }
        else {
          drinksList.push(drink._id);
        }
    });
    try {
        let requestBody = {
            query: `
                mutation CreateOrder($drinks: [ID!], $collectionPoint: ID!, $price: Float!, $status: String!, $date: String!, $userInfo: ID, $stripeFee: Int) {
                    createOrder(orderInput: {
                        drinks: $drinks
                        collectionPoint: $collectionPoint
                        status: $status
                        date: $date
                        userInfo: $userInfo
                        price: $price
                        stripeFee: $stripeFee
                    }) {
                        _id
                        drinks {
                          name
                          price
                          _id
                       }
                        collectionPoint {
                            name
                            collectionPointId
                        }
                        price
                        status
                        transactionId
                        userInfo {
                          email
                          name
                        }
                        date
                        collectionId
                   } 
                }
            `,
            variables: {
                drinks: drinksList,
                collectionPoint: collectionId,
                status: "PENDING",
                date: date,
                userInfo: user,
                price: orderPrice,
                stripeFee: action.stripeFee
            }
        };
        const response = yield axios.post('/', JSON.stringify(requestBody), {
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Payment': token.tokenId,
                'Checkout': orderPrice
            }
        });
        if (response.data.errors) {
            yield put(actions.submitOrderFail(response.data.errors[0].message));
            Alert.alert('Unsuccessful Order : ', response.data.errors[0].message);
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            const orderId = response.data.data.createOrder._id;
            yield AsyncStorage.setItem("orderId", orderId);
            yield AsyncStorage.setItem("lastOrder", JSON.stringify(response.data));
            yield put(actions.submitOrderSuccess(response.data));
            yield put(actions.emptyBasketStart());
            yield emptyBasket();
            yield put(actions.emptyBasketSuccess());
            const collectionId = response.data.data.createOrder.collectionId;
            const collectionPoint = response.data.data.createOrder.collectionPoint.name;
            const date = response.data.data.createOrder.date;
            yield orderRedirect(collectionId, user, collectionPoint, date, orderId);
        }
    } catch (err) {
        yield put(actions.submitOrderFail(err));
        console.log(err);
    }
}

export function* orderHistorySaga(action) {
    const user = yield AsyncStorage.getItem('userId');
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
                        collectionPoint {
                            name
                            collectionPointId
                            bar {
                                name
                            }
                        }
                        status
                        collectionId
                        date
                        _id
                        transactionId
                   }
                }
            `,
            variables: {
                userInfo: user
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
        errorNotification('Retrieving Order History Failed', 'Please try again');
        yield put(actions.orderHistoryFailure());
    }
}

export function* orderStatusSaga(action){
    yield put(actions.orderStatusStart());
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
                        collectionPoint {
                            name
                            collectionPointId
                        }
                        price
                        status
                        date
                        _id
                        collectionId
                        transactionId
                        userInfo{
                            email
                            name
                        }
                   }
                }
            `,
            variables: {
                id: id
            }
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            yield put(actions.orderHistoryFailure(response.data.errors[0].message));
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
        yield put(actions.orderStatusSuccess(response.data.data.findOrderById))
        }
    } catch (err) {
        console.log(err);
        yield put(actions.orderStatusFailure(err));
    }
}


