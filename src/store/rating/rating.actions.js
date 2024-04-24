import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToRatings,
  fetchRatings,
  getSpecificRating,
  removeFromRatings,
  updateUserRating,
} from "../../apis/rating";

export const loadRatings = createAsyncThunk(
  "rating/loadRatings",
  async (_, thunkAPI) => {
    try {
      const response = await fetchRatings();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getRating = createAsyncThunk(
  "rating/getRating",
  async (movieId, thunkAPI) => {
    try {
      const response = await getSpecificRating(movieId);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const addRating = createAsyncThunk(
  "rating/addRating",
  async (data, thunkAPI) => {
    try {
      const response = await addToRatings(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateRating = createAsyncThunk(
  "rating/updateRating",
  async (data, thunkAPI) => {
    try {
      const response = await updateUserRating(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
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
      return thunkAPI.rejectWithValue(err);
    }
  }
);
