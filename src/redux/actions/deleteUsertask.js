import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchTasks } from "./fetchUsertasks";

const dispatch = useDispatch();

export const deleteTask = createAsyncThunk(
  "tasks/deleteUsertask",
  async (task_id) => {
    return axios
      .post(`${process.env.REACT_APP_BASEURL}/deletetask`, {
        task_id: task_id,
      })
      .then((res) => {
        if (res.data.status === true) {
          dispatch(fetchTasks());
        } else {
          dispatch({
            payload: res.data.message,
          });
        }
      });
  }
);
