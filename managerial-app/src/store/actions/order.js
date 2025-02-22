import * as actionTypes from './actionTypes';

export const getOrdersByCollectionPoint = (collectionPointId) => {
  return {
    type: actionTypes.GET_ORDERS_BY_COLLECTION_POINT,
    collectionPointId
  };
};

export const getOrdersByCollectionPointStart = () => {
  return {
    type: actionTypes.GET_ORDERS_BY_COLLECTION_POINT_START
  };
};

export const getOrdersByCollectionPointSuccess = (orders) => {
  return {
    type: actionTypes.GET_ORDERS_BY_COLLECTION_POINT_SUCCESS,
    orders
  };
};

export const getOrdersByCollectionPointFail = error => {
  return {
    type: actionTypes.GET_ORDERS_BY_COLLECTION_POINT_FAIL,
    error: error
  };
};


export const updateOrder = (orderId, status, barStaffId) => {
  return {
    type: actionTypes.UPDATE_ORDER,
    orderId,
    status,
    barStaffId
  };
};

export const updateOrderStart = () => {
  return {
    type: actionTypes.UPDATE_ORDER_START
  };
};

export const updateOrderSuccess = (updatedOrder) => {
  return {
    type: actionTypes.UPDATE_ORDER_SUCCESS,
    updatedOrder
  };
};

export const updateOrderFail = error => {
  return {
    type: actionTypes.UPDATE_ORDER_FAIL,
    error: error
  };
};
