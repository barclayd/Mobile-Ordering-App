import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    loading: null,
    error: null,
    collectionPoints: []
};

const findCollectionPointsStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const findCollectionPointSuccess = (state, action) => {
    return updateObject(state, {
        collectionPoints: action.collectionPoints.findCollectionPointsByBar,
        loading: false,
        error: false,
        saved: true
    });
};

const findCollectionPointFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FIND_COLLECTION_POINTS_START: return findCollectionPointsStart(state, action);
        case actionTypes.FIND_COLLECTION_POINTS_SUCCESS: return findCollectionPointSuccess(state, action);
        case actionTypes.FIND_COLLECTION_POINTS_FAIL: return findCollectionPointFail(state, action);
        default: return state;
    }
};

export default reducer;

