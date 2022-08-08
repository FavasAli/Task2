import {
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  VIEW_PRODUCT_FAIL,
  VIEW_PRODUCT_REQUEST,
  VIEW_PRODUCT_SUCCESS,
  VIEW_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  ADD_PRODUCT_RESET,
} from "../constants/productConstants";

export const addProductReduser = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return { loading: true };
    case ADD_PRODUCT_SUCCESS:
      return { loading: false, products: action.payload };
    case ADD_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case ADD_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const viewProductReduser = (state = { products: [] }, action) => {
  switch (action.type) {
    case VIEW_PRODUCT_REQUEST:
      return { loading: true, products: [] };
    case VIEW_PRODUCT_SUCCESS:
      return { loading: false, products: action.payload };
    case VIEW_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case VIEW_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteProductReduser = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: false };
    case DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
