import {put} from 'redux-saga/effects';
import axios from '../../axios-instance';
import * as actions from '../actions/index';
import {AsyncStorage, Platform, Alert} from 'react-native';

export function* findDrinksSaga(action){
    yield put(actions.findDrinksStart());
    try {
        let requestBody;
        if (action.category) {
            requestBody = {
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
            }
        } else {
            requestBody = {
                query: `
            query drinks {
                drinks {
                    name
                    category
                    nutritionInfo
                    price
                    _id
                }
            }
            `,
            }
        }
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            const fetchData = [];
            if(action.category) {
                for (let key in response.data.data.findDrinks) {
                    fetchData.push({
                        ...response.data.data.findDrinks[key],
                        id: key,
                    });
                }
                yield put(actions.findDrinksSuccess(fetchData));
            } else {
                for (let key in response.data.data.drinks) {
                    fetchData.push({
                        ...response.data.data.drinks[key],
                        id: key,
                    });
                }
                yield put(actions.findDrinksSuccess(fetchData));
            }
        }
    } catch (err) {
        console.log(err);
        yield put(actions.findDrinksFail(err));
        Alert.alert('No Internet Connection... 🔌')
    }
}

export function* findDrinkCategoriesSaga(action) {
    yield put(actions.findDrinkCategoriesStart());
    try {
        const requestBody = {
            query: `
            query FindDrinkCategoriesByMenu ($menuId: ID!) {
                findDrinkCategoriesByMenu(
                    menuId: $menuId
                 ){
                    category
                }
            }
            `,
            variables: {
                menuId: action.menuId
            }
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            const fetchData = [];
            for (let key in response.data.data.findDrinkCategoriesByMenu) {
                fetchData.push(
                    response.data.data.findDrinkCategoriesByMenu[key].category,
                );
            }
            yield put(actions.findDrinkCategoriesSuccess(fetchData));
        }
    } catch (err) {
        console.log(err);
        yield put(actions.findDrinkCategoriesFail(err));
        Alert.alert('Lost Internet Connection... 🔌')
    }
}
