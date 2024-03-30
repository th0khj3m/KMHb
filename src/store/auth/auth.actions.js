import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../../apis/auth";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkApi) => {
    try {
      const { data } = await login(credentials);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials, thunkApi) => {
    try {
      const { data } = await register(credentials);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
)
