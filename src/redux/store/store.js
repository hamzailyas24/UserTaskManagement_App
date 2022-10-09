import { configureStore } from "@reduxjs/toolkit";
import userTasksReducer from "../reducers/getUserTasks";
export const store = configureStore({
  reducer: {
    userTasks: userTasksReducer,
  },
});