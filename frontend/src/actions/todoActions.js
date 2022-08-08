import {
  TODO_CREATION_FAIL,
  TODO_CREATION_REQUEST,
  TODO_CREATION_SUCCESS,
  TODO_DISPLAY_FAIL,
  TODO_DISPLAY_REQUEST,
  TODO_DISPLAY_SUCCESS,
} from "../constants/todoConstants";
import axios from "axios";

export const createTodo = (todo, date,completion) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TODO_CREATION_REQUEST,
    });

    const {userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: userInfo.token,
      },
    };

    const { data } = await axios.post(
      `/api/datas/${userInfo._id}`,
      { todo, date,completion },
      config
    );
    dispatch({
      type: TODO_CREATION_SUCCESS,
      payload: data,
    });

    // localStorage.setItem("todoInfo",JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: TODO_CREATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTodo = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TODO_DISPLAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log("userIfo ... from action",userInfo)

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: userInfo.token,
      },
    };

    const { data } = await axios.get('/api/datas/getdata', config);

    dispatch({
      type: TODO_DISPLAY_SUCCESS,
      payload: data,
    });
    
    // console.log("data from action",data)
   // localStorage.setItem("todoInfo", JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: TODO_DISPLAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


