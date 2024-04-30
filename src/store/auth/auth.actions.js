import { createAsyncThunk } from "@reduxjs/toolkit";
import { isLoggedIn, login, logout, register } from "../../apis/auth";

export const checkLoginStatus = createAsyncThunk(
  "auth/checkLogin",
  async (_, thunkAPI) => {
    try {
      const response = await isLoggedIn();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
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
        isAuthenticated: true,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
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
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await logout();
      return;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// // OAuth
// export const initiateOAuth = createAsyncThunk(
//   "auth/initiateOAuth",
//   async (_, thunkAPI) => {
//     try {
//       await accessOAuth();
//       return;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );
