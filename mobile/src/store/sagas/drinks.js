import {put} from 'redux-saga/effects';
import {Platform} from 'react-native';
import IonicIcon from "react-native-vector-icons/Ionicons";
import axios from '../../axios-instance';
import * as actions from '../actions/index';

export function* findDrinksSaga(action){
    yield put(actions.findBarStart());
    yield put(actions.findDrinksStart());
    try {
        const requestBody = {
            query: `
            query findDrinks($category: String!) {
                findDrinks(category: $category){
                    name
                    category
                    nutritionInfo
                    price
                }
            }
            `,
            variables: {
                category: action.category
            }
        };
        const response = yield axios.post('http://localhost:3000/graphql', JSON.stringify(requestBody));
        if (response.data.errors) {
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            const fetchData = [];
            for (let key in response.data.data.findDrinks) {
                fetchData.push({
                    ...response.data.data.findDrinks[key],
                    id: key
                });
            }
            console.log("Drinks Found Successfully");
            yield put(actions.findDrinksSuccess(fetchData));
        }
} catch (err) {
            console.log(err);
            yield put(actions.findDrinksFail(err));
        }
    }
    
