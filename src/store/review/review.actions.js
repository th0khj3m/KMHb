import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  add,
  fetchReviews,
  getSpecificReview,
  remove,
  update,
} from "../../apis/review";

export const loadReviews = createAsyncThunk(
  "review/loadReviews",
  async (movieId, thunkAPI) => {
    try {
      const response = await fetchReviews(movieId);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getReview = createAsyncThunk(
  "review/getReview",
  async (reviewId, thunkAPI) => {
    try {
      const response = await getSpecificReview(reviewId);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const addReview = createAsyncThunk(
  "review/addReview",
  async (data, thunkAPI) => {
    try {
      const response = await add(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateReview = createAsyncThunk(
  "review/updateReview",
  async ({ reviewId, data }, thunkAPI) => {
    try {
      const response = await update(reviewId, data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const removeReview = createAsyncThunk(
  "rating/removeRating",
  async (reviewId, thunkAPI) => {
    try {
      const response = await remove(reviewId);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
