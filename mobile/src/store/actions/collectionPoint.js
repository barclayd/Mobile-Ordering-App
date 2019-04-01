import * as actionTypes from './actionTypes';

export const findCollectionPoints = () => {
    return {
        type: actionTypes.FIND_COLLECTION_POINTS,
    };
};

export const findCollectionPointsStart = () => {
    return {
        type: actionTypes.FIND_COLLECTION_POINTS_START
    };
};

export const findCollectionPointsSuccess = (collectionPoints) => {
    return {
        type: actionTypes.FIND_COLLECTION_POINTS_SUCCESS,
        collectionPoints: collectionPoints
    };
};

export const findCollectionPointsFail = error => {
    return {
        type: actionTypes.FIND_COLLECTION_POINTS_FAIL,
        error: error
    };
};