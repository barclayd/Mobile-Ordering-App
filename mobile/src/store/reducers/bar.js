import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    loading: null,
    error: null,
    name: null,
    description: null,
    latitiude: null,
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
        longitude: longitude,
        loading: false,
        error: false
    });
};

const findBarFails = (state, action) => {
    return updateObject(state, {
        error: true,
        loading: false
    });
};