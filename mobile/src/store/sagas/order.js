import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import {Alert} from 'react-native';
import axios from '../../axios-instance';

export function* submitOrderSaga(action) {
    yield put(actions.submitOrderStart())
    console.log('Hello Sagas! : action',action)

    try {
      let requestBody = {
              query: `
              mutation createOrder ($drinks: [ID!], $collectionPoint: String!, $status: String!, $date: String!, $userInfo: ID!{
                createOrder(orderInput: {
                    drinks: $drinks,
                    collectionPoint: "Hard code collection point in order saga",
                    status: "Pending...",
                    date: "12/5/2019",
                    userInfo: 5c69c7c058574e24c841ddc8
                }) {
                    _id
                    collectionPoint
                    drinks {
                      name
                      price
                      _id
                    }
                    status
                    date
                    userInfo {
                      email
                      name
                    }
                }
            }
          `,
          variables: {
            drinks: ["5c7d3046a90475bf3c7dec51", "5c7dff60a28b7af82260a1d4"],
            // drinks: action.order[0].id,
            // collectionPoint: action.collectionPoint,
            // orderAssignedTo: action.orderAssignedTo,
            // date: action.date,
            // userInfo: action.userInfo
        }
        };
      console.log("requestBody")
      const response = yield axios.post('/', JSON.stringify(requestBody));
      console.log("response",response)

      if (response.status === 200 && response.status !== 201) {
        console.log("response",response)
        // yield put(actions.authSuccess(res.data.data.login.token, res.data.data.login.userId, res.data.data.login.tokenExpiration, res.data.data.login.name));
      }

      if (response.data.errors) {
          throw Error(response.data.errors[0].message);
      }
      

    } catch (err) {
      console.log(err);
      yield put(actions.submitOrderFail());
      Alert.alert('Fail to submit Order :')
  }


    // yield put(actions.submitOrderSuccess(action.basket))
  }
