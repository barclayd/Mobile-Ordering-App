import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    loading: null,
    error: null,
    barStaff: [],
};

const findBarStaffStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const findBarStaffSuccess = (state, action) => {
    return updateObject(state, {
        barStaff: action.barStaff,
        loading: false,
        error: false,
    });
};

const findBarStaffFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FIND_BAR_STAFF_START: return findBarStaffStart(state, action);
        case actionTypes.FIND_BAR_STAFF_SUCCESS: return findBarStaffSuccess(state, action);
        case actionTypes.FIND_BAR_STAFF_FAIL: return findBarStaffFail(state, action);
        default: return state;
    }
};

export default reducer;