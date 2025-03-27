import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/UserSlice";
import todoReducer from "../features/todo/TodoSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer
  },
})
