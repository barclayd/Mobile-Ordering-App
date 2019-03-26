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
    updatingLastVisitedBar: false,
    errorUpdatingLastVisitedBar: false,
    lastVisitedBar: null,
    findAllBarsLoading: false,
    bars: [],
    findAllBarsError: null
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

const updateLastVisitedBarStart = (state, action) => {
    return updateObject(state, {
        updatingLastVisitedBar: true
    });
};

const updateLastVisitedBarSuccess = (state, action) => {
    const lastVisitedBar = {
        barName: action.barName,
        barId: action.barId
    };
    return updateObject(state, {
        updatingLastVisitedBar: false,
        errorUpdatingLastVisitedBar: false,
        lastVisitedBar: lastVisitedBar
    });
};

const updateLastVisitedBarFail = (state, action) => {
    return updateObject(state, {
        updatingLastVisitedBar: false,
        errorUpdatingLastVisitedBar: action.err,
    });
};

const findAllBarsStart = (state, action) => {
    return updateObject(state, {
        findAllBarsLoading: true
    });
};

const findAllBarsSuccess = (state, action) => {
    return updateObject(state, {
        findAllBarsError: false,
        findAllBarsLoading: false,
        bars: action.bars
    });
};

const findAllBarsFail = (state, action) => {
    return updateObject(state, {
        findAllBarsLoading: false,
        findAllBarsError: action.err,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FIND_BAR_START: return findBarStart(state, action);
        case actionTypes.FIND_BAR_SUCCESS: return findBarSuccess(state, action);
        case actionTypes.FIND_BAR_FAIL: return findBarFail(state, action);
        case actionTypes.UPDATE_LAST_VISITED_BAR_START: return updateLastVisitedBarStart(state, action);
        case actionTypes.UPDATE_LAST_VISITED_BAR_SUCCESS: return updateLastVisitedBarSuccess(state, action);
        case actionTypes.UPDATE_LAST_VISITED_BAR_FAIL: return updateLastVisitedBarFail(state, action);
        case actionTypes.FIND_ALL_BARS_START: return findAllBarsStart(state, action);
        case actionTypes.FIND_ALL_BARS_SUCCESS: return findAllBarsSuccess(state, action);
        case actionTypes.FIND_ALL_BARS_FAIL: return findAllBarsFail(state, action);
        default: return state;
    }
};

export default reducer;

