import { createSlice } from "@reduxjs/toolkit";
import {
  addReview,
  getReview,
  loadReviews,
  removeReview,
  updateReview,
} from "./review.actions";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(removeReview.pending, (state, action) => {})
      .addCase(removeReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          (review) => review.id === action.payload.id
        ); //Find index of movie removed in reviews
        state.reviews.splice(index, 1); //Remove
      });
  },
});

// Export reducer function by default
export default reviewSlice.reducer;
