import * as actionTypes from "./actionTypes";

export const findBarStart = () => {
    return {
        type: actionTypes.FIND_BAR_START
    };
};

export const findBarSuccess = (name, type, description, barCode, latitude, longitude  ) => {
    return {
        type: actionTypes.FIND_BAR_SUCCESS,
        name: name,
        barCode: barCode,
        description: description,
        latitude: latitude,
        longitude: longitude
    };
};

export const findBarFail = error => {
    return {
        type: actionTypes.FIND_BAR_FAIL,
        error: error
    };
};

export const findBar = (barCode, componentId) => {
    return {
        type: actionTypes.FIND_BAR,
        barCode: barCode,
        componentId: componentId
    }
};

export const removeBarStart = () => {
    return {
        type: actionTypes.REMOVE_BAR_START
    };
};

export const removeBarSuccess = () => {
    return {
        type: actionTypes.REMOVE_BAR_SUCCESS
    };
};

export const removeBarFail = error => {
    return {
        type: actionTypes.REMOVE_BAR_FAIL,
        error: error
    };
};

export const removeBar = () => {
    return {
        type: actionTypes.REMOVE_BAR,
    }
};
