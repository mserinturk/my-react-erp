import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/UserSlice";
import todoReducer from "../features/todo/TodoSlice"
import teamReducer from "../features/team/TeamSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
    team: teamReducer
  },
})
