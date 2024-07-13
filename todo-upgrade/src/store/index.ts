import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "./todo/reducer";

const rootReducer = combineReducers({
  todos: todoReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
