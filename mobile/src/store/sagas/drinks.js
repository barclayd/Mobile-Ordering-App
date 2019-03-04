import {put} from 'redux-saga/effects';
import axios from '../../axios-instance';
import * as actions from '../actions/index';

export function* findDrinksSaga(action){
    yield put(actions.findBarStart());
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
        }
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

export function* findDrinkCategoriesSaga(action) {
    yield put(actions.findDrinkCategoriesStart());
    try {
        const requestBody = {
            query: `
            query findDrinkCategories {
                findDrinkCategories {
                    category
                }
            }
            `
        };
        const response = yield axios.post('http://localhost:3000/graphql', JSON.stringify(requestBody));
        if (response.data.errors) {
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            const fetchData = [];
            for (let key in response.data.data.findDrinkCategories) {
                fetchData.push(
                    response.data.data.findDrinkCategories[key].category,
                );
            }
            console.log("Drink Categories Found Successfully");
            yield put(actions.findDrinkCategoriesSuccess(fetchData));
        }
    } catch (err) {
        console.log(err);
        yield put(actions.findDrinkCategoriesFail(err));
    }
}

