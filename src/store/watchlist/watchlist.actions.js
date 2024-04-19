import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToWatchlist, fetchWatchlist, removeFromWatchlist } from "../../apis/watchlist";

export const loadWatchlist = createAsyncThunk(
  "watchlist/fetchWatchlist",
  async (movieId, thunkAPI) => {
    try {
      const response = await fetchWatchlist(movieId);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addMovie = createAsyncThunk(
  "watchlist/addMovie",
  async (movieId, thunkAPI) => {
    try {
      const response = await addToWatchlist(movieId);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const removeMovie = createAsyncThunk(
  "watchlist/removeMovie",
  async (movieId, thunkAPI) => {
    try {
      const response = await removeFromWatchlist(movieId);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
