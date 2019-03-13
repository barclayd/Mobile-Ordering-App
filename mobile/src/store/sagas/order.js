import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-instance';
import {AsyncStorage, Platform} from 'react-native';
import {popToRoot, setOrderStatus} from "../../utility/navigation";
import {emptyBasket} from '../utility';

const orderRedirect = async (action) => {
    await popToRoot(action.componentId);
};

const redirectOrderStatus = async (action) => {
    await setOrderStatus(action.componentId, '189');
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
            yield put(actions.submitOrderSuccess(response.data));
            // yield orderRedirect(action);
            yield put(actions.emptyBasketStart());
            yield emptyBasket();
            yield put(actions.emptyBasketSuccess());
            yield redirectOrderStatus(action);
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
                        collectionPoint
                        status
                        date
                        _id
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
            console.log("Found previous orders")
            const fetchData = [];
            for (let key in response.data.data.findOrdersByUser) {
                fetchData.push(
                    response.data.data.findOrdersByUser[key],
                );
                console.log("fetch data",fetchData)
            }
            yield put(actions.orderHistorySuccess(fetchData));
        }
    } catch (err) {
        console.log(err);
        yield put(actions.orderHistoryFailure());
    }
}


