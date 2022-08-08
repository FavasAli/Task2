import {
  TODO_CREATION_FAIL,
  TODO_CREATION_SUCCESS,
  TODO_CREATION_REQUEST,
  TODO_DISPLAY_FAIL,
  TODO_DISPLAY_REQUEST,
  TODO_DISPLAY_SUCCESS,
} from "../constants/todoConstants";

export const createTodoReducer = (state = {}, action) => {
  switch (action.type) {
    case TODO_CREATION_REQUEST:
      return { loading: true };
    case TODO_CREATION_SUCCESS:
      return { loading: false, todo: action.payload };
    case TODO_CREATION_FAIL:
      return { loading: false, error: action.payload };
    default: 
      return state;
  }
};

export const listTodosReducer= (state = { todos: [] }, action) => {
  switch (action.type) {
    case TODO_DISPLAY_REQUEST:
      return { loading: true, todos: [] };
    case TODO_DISPLAY_SUCCESS:
      return { loading: false, todos: action.payload };
    case TODO_DISPLAY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
