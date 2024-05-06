import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  add,
  deleteReviews,
  fetchPendingReviews,
  fetchReviews,
  getSpecificReview,
  remove,
  update,
  updateStatus,
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

export const loadPendingReviews = createAsyncThunk(
  "review/loadPendingReviews",
  async (_, thunkAPI) => {
    try {
      const response = await fetchPendingReviews();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateReviewsStatus = createAsyncThunk(
  "review/updateReviewStatus",
  async (reviews, thunkAPI) => {
    try {
      const response = await updateStatus(reviews);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const rejectReviews = createAsyncThunk(
  "review/rejectReviewStatus",
  async (reviews, thunkAPI) => {
    try {
      const response = await deleteReviews(reviews);
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
  "rating/removeReview",
  async (reviewId, thunkAPI) => {
    try {
      const response = await remove(reviewId);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
