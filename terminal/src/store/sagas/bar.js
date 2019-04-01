import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../axios-instance';

export function* findBarStaffSaga(action) {
    yield put(actions.findBarStaffStart());
    try {
        let requestBody = {
          query: `
          query FindBarStaffByBar($barId: ID!) {
                    findBarStaffByBar(
                        barId: $barId
                    ) {
                        _id
                        firstName
                        lastName
                   }
                }
            `,
            variables: {
                barId: action.barId,
            }
        };
        const response = yield axios.post('/', JSON.stringify(requestBody));
        if (response.data.errors) {
            yield put(actions.findBarStaffFail(response.data.errors[0].message));
            throw Error(response.data.errors[0].message);
        }
        if (response.status === 200 && response.status !== 201) {
            const fetchData = [];
            for (let key in response.data.data.findBarStaffByBar) {
                fetchData.push(
                    response.data.data.findBarStaffByBar[key]
                );
            }
            yield put(actions.findBarStaffSuccess(fetchData));
        }
    } catch (err) {
        console.log(err);
        yield put(actions.findBarStaffFail(err));
    }
}