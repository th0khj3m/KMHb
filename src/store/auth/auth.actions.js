import { createAsyncThunk } from "@reduxjs/toolkit";
import { isLoggedIn, login, register } from "../../apis/auth";

export const checkLoginStatus = createAsyncThunk(
  "auth/checkLogin",
  async (_, thunkAPI) => {
    try {
      const response = await isLoggedIn();
      return response;
    } catch (err) {
      throw thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await login(credentials);
      return {
        user: response,
        isAuthenticated: true
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials, thunkAPI) => {
    try {
      await register(credentials);
      return;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
