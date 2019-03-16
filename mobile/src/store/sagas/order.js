import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-instance';
import stripe from 'tipsi-stripe'
import {AsyncStorage} from 'react-native';
import {
    popToRoot,
    setOrderStatus
} from "../../utility/navigation";
import {emptyBasket} from '../utility';

const orderRedirect = async (orderId, userId, collectionPoint, date) => {
    await popToRoot('ViewMenus');
    await setOrderStatus('ViewMenus', orderId, userId, collectionPoint, date);
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
    const user = yield AsyncStorage.getItem('userId');
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
                        transactionId
                        userInfo {
                          email
                          name
                        }
                        date
                   } 
                }
            `,
            variables: {
                drinks: drinksList,
                collectionPoint: "SU Lounge",
                status: "PENDING",
                date: date,
                userInfo: user ? user : '5c69c7c058574e24c841ddc8'
            }
        };
        const response = yield axios.post('/', JSON.stringify(requestBody), {
            headers: {
                'Payment': token.tokenId,
                'Checkout': orderPrice
            }
        });
        if (response.data.errors) {
            console.log('error was found');
            yield put(actions.submitOrderFail(response.data.errors[0].message));
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            yield put(actions.submitOrderSuccess(response.data));
            yield put(actions.emptyBasketStart());
            yield emptyBasket();
            yield put(actions.emptyBasketSuccess());
            const orderId = response.data.data.createOrder.transactionId;
            const collectionPoint = response.data.data.createOrder.collectionPoint;
            const date = response.data.data.createOrder.date;
            yield orderRedirect(orderId, user, collectionPoint, date);
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
                        collectionPoint
                        status
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
        yield put(actions.orderHistoryFailure());
    }
}


