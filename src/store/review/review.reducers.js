import { createSlice } from "@reduxjs/toolkit";
import {
  addReview,
  getReview,
  loadReviews,
  removeReview,
  updateReview,
} from "./review.actions";
import { checkLoginStatus } from "../auth/auth.actions";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    userReviews: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        state.userReviews = action.payload.reviews;
        state.loading = false;
      })
      .addCase(loadReviews.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(getReview.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addReview.pending, (state, action) => {})
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(updateReview.pending, (state, action) => {})
      .addCase(updateReview.fulfilled, (state, action) => {
        // Find the review to update in the state
        const existingReviewIndex = state.reviews.findIndex(
          (review) => review.id === action.payload.id
        );
        if (existingReviewIndex !== -1) {
          // Update the existing review object
          state.reviews[existingReviewIndex] = {
            ...state.reviews[existingReviewIndex],
            ...action.payload, // Update specific properties (e.g., review)
          };
        }
        const existingUserReviewIndex = state.userReviews.findIndex(
          (review) => review.id === action.payload.id
        );
        if (existingUserReviewIndex !== -1) {
          state.userReviews[existingUserReviewIndex] = {
            ...state.userReviews[existingUserReviewIndex],
            ...action.payload,
          };
        }
      })
      .addCase(removeReview.pending, (state, action) => {})
      .addCase(removeReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          (review) => review.id === action.payload.id
        ); //Find index of movie removed in reviews
        state.reviews.splice(index, 1); //Remove
        const userIndex = state.userReviews.findIndex(
          (review) => review.id === action.payload.id
        );
        if (userIndex !== -1) {
          state.userReviews.splice(userIndex, 1);
        }
      });
  },
});

// Export reducer function by default
export default reviewSlice.reducer;
