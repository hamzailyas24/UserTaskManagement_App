import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "../actions/fetchUsertasks";

const initialState = {
  tasks: [],
  loading: false,
};

export const getUserTasksSlice = createSlice({
  name: "UserTasks",
  initialState,
  extraReducers: {
    [fetchTasks.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchTasks.fulfilled]: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    [fetchTasks.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default getUserTasksSlice.reducer;
