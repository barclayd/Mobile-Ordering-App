import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    loading: null,
    error: null,
    name: null,
    description: null,
    latitude: null,
    longitude: null,
    type: null,
    barCode: null,
};

const findBarStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const findBarSuccess = (state, action) => {
    return updateObject(state, {
        name: action.name,
        type: action.type,
        description: action.description,
        barCode: action.barCode,
        latitude: action.latitude,
        longitude: action.longitude,
        loading: false,
        error: false
    });
};

const findBarFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FIND_BAR_START: return findBarStart(state, action);
        case actionTypes.FIND_BAR_SUCCESS: return findBarSuccess(state, action);
        case actionTypes.FIND_BAR_FAIL: return findBarFail(state, action);
        default: return state;
    }
};

export default reducer;

