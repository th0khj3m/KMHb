import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAccounts } from "../../apis/account";

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

// export const removeMovie = createAsyncThunk(
//   "watchlist/removeMovie",
//   async (movieId, thunkAPI) => {
//     try {
//       const response = await removeFromWatchlist(movieId);
//       return response;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );
