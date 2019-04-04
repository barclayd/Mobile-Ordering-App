import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
  loading: null,
  error: null,
  drinks: [],
  categories: [],
  loadingCategories: false,
  errorCategories: false
};

const findDrinksStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const findDrinksSuccess = (state, action) => {
  return updateObject(state, {
    drinks: action.data,
    loading: false,
    error: false,
    saved: true
  });
};

const findDrinksFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const findDrinkCategoriesStart = (state, action) => {
  return updateObject(state, {
    errorCategories: null,
    loadingCategories: true
  });
};

const findDrinkCategoriesSuccess = (state, action) => {
  return updateObject(state, {
    categories: action.data,
    loadingCategories: false,
    errorCategories: false,
  });
};

const findDrinkCategoriesFail = (state, action) => {
  return updateObject(state, {
    loadingCategories: false,
    errorCategories: action.error
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FIND_DRINKS_START: return findDrinksStart(state, action);
    case actionTypes.FIND_DRINKS_SUCCESS: return findDrinksSuccess(state, action);
    case actionTypes.FIND_DRINKS_FAIL: return findDrinksFail(state, action);
    case actionTypes.FIND_DRINK_CATEGORIES_START: return findDrinkCategoriesStart(state, action);
    case actionTypes.FIND_DRINK_CATEGORIES_SUCCESS: return findDrinkCategoriesSuccess(state, action);
    case actionTypes.FIND_DRINK_CATEGORIES_FAIL: return findDrinkCategoriesFail(state, action);
    default: return state;
  }
};

export default reducer;
