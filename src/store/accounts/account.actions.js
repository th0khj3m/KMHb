import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAccounts, fetchAccounts } from "../../apis/accounts";

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

// export const addMovie = createAsyncThunk(
//   "watchlist/addMovie",
//   async (movieId, thunkAPI) => {
//     try {
//       const response = await addToWatchlist(movieId);
//       return response;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );

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
