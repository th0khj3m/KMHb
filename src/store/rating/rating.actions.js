import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToRatings, fetchRatings, removeFromRatings } from "../../apis/rating";

export const loadRatings = createAsyncThunk(
  "rating/fetchRatings",
  async (movieId, thunkAPI) => {
    try {
      const response = await fetchRatings(movieId);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addRating = createAsyncThunk(
  "rating/addRating",
  async (movieId, thunkAPI) => {
    try {
      const response = await addToRatings(movieId);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const removeRating = createAsyncThunk(
  "rating/removeRating",
  async (movieId, thunkAPI) => {
    try {
      const response = await removeFromRatings(movieId);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
