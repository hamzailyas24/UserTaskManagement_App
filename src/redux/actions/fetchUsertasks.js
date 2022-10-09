import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk("tasks/getUserTasks", async () => {
  return axios
    .post(`${process.env.REACT_APP_BASEURL}/getalltasks`, {
      user_id: localStorage.getItem("userID"),
    })
    .then((res) => res.data.tasks);
});
