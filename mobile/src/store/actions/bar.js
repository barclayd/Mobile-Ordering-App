

import * as actionTypes from "./actionTypes";

export const findBarStart = () => {
    return {
        type: actionTypes.FIND_BAR_START
    };
};
 
export const findBarSuccess = (barCode) => {
    return {
        type: actionTypes.FIND_BAR_SUCCESS,
        barCode: barCode
    };
};
 
export const findBarFail = error => {
    return {
        type: actionTypes.FIND_BAR_FAIL,
        error: error
    };