import {put} from 'redux-saga/effects';
import {Platform} from 'react-native';
import IonicIcon from "react-native-vector-icons/Ionicons";
import axios from '../../axios-instance';
import * as actions from '../actions/index';

export function* findDrinksSaga(action){
    yield put(actions.findBarStart());
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
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
                console.log('response', response)
                // Promise.all([
                //     // IonicIcon.getImageSource((Platform.OS === 'android' ? "md-person" : "shopping-basket"), 20)
                // ])
                //     .then(sources => {
                //         console.log("found drinks successfully")
                //         console.log("response",response)
                //         return response
                //         // console.log(response)
                //         // return response
                //         // setViewDrinksSettings(source[2]);
                //         // setViewDrinks(action.componentId, response.data.data.findDrinks.name);
                //     });
                    const fetchedData = [];
                    for (let key in response.data.data) {
                        fetchedData.push({
                            ...response.data.data[key],
                            id: key
                        });
                    }
                    yield put(actions.findDrinksSuccess(fetchData));
                }
        } catch (err) {
                    console.log(err);
                    yield put(actions.findDrinksFail(err));
                }
            }
