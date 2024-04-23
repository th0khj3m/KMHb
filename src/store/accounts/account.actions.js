import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAccounts, fetchAccounts } from "../../apis/accounts";
import { register } from "../../apis/auth";

export const loadAccounts = createAsyncThunk(
  "account/loadAccounts",
  async (_, thunkAPI) => {
    try {
      const response = await fetchAccounts();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addAccount = createAsyncThunk(
  "account/addAccount",
  async (credentials, thunkAPI) => {
    try {
      const response = await register(credentials);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const removeAccounts = createAsyncThunk(
  "account/removeAccounts",
  async (users, thunkAPI) => {
    try {
      const response = await deleteAccounts(users);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
