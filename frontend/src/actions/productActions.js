import {
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  VIEW_PRODUCT_FAIL,
  VIEW_PRODUCT_REQUEST,
  VIEW_PRODUCT_SUCCESS,
} from "../constants/productConstants";
import axios from "axios";

export const addProducts =
  (name, price, quantity, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_PRODUCT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      console.log("userInfo from action", userInfo);
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: userInfo.token,
        },
      };
      const { data } = await axios.post(
        `/api/product/addproduct/${userInfo._id}`,
        { name, price, quantity, category },
        config
      );

      dispatch({
        type: ADD_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: VIEW_PRODUCT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: userInfo.token,
      },
    };

    const { data } = await axios.get("/api/product/listproducts", config);
    console.log("data", data);
    dispatch({
      type: VIEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VIEW_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });
  
    const {
      userLogin: { userInfo },
    } = getState();
  
    const config = {
      headers: {
        authorization: userInfo.token,
      },
    };
  
    await axios.delete(`/api/product/deleteproduct/${id}`, config);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
    });
    
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
