import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { registerUserReducer, userLoginReducer } from "./reducers/userReducers";
import { createTodoReducer, listTodosReducer } from "./reducers/todoReducers";
import {addProductReduser, deleteProductReduser, viewProductReduser} from './reducers/productRedusers'

const reducer = combineReducers({
  registerUser: registerUserReducer,
  userLogin: userLoginReducer,
  createTodo: createTodoReducer,
  listTodos: listTodosReducer,
  addProduct:addProductReduser,
  viewProduct:viewProductReduser,
  deleteProduct:deleteProductReduser
  
});

const userInfoLocalstorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

 const todoInfoLocalstorage = localStorage.getItem("todoInfo")
   ? JSON.parse(localStorage.getItem("todoInfo"))
  : [];

const initialState = {
  userLogin: { userInfo: userInfoLocalstorage },
   listTodos: { todos: todoInfoLocalstorage },
};
// console.log("userInfoStore", userInfoLocalstorage);
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
