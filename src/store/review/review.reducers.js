import { createSlice } from "@reduxjs/toolkit";
import {
  addReview,
  getReview,
  loadPendingReviews,
  loadReviews,
  rejectReviews,
  removeReview,
  updateReview,
  updateReviewsStatus,
} from "./review.actions";
import { checkLoginStatus } from "../auth/auth.actions";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    pendingReviews: [],
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
      .addCase(loadPendingReviews.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadPendingReviews.fulfilled, (state, action) => {
        state.pendingReviews = action.payload;
        state.loading = false;
      })
      .addCase(updateReviewsStatus.fulfilled, (state, action) => {
        // Update the status of the reviews in the state based on action.payload
        const updatedReviews = action.payload;
        // Loop through the updated reviews and update their status in the state
        updatedReviews.forEach((updatedReview) => {
          const existingReviewIndex = state.pendingReviews.findIndex(
            (review) => review.id === updatedReview.id
          );
          if (existingReviewIndex !== -1) {
            // Update the status of the review in the state
            state.pendingReviews[existingReviewIndex].status =
              updatedReview.status;
          }
        });
        state.loading = false;
      })
      .addCase(rejectReviews.fulfilled, (state, action) => {
        // Extract the IDs of the deleted reviews from action.payload
        const deletedReviewIds = action.payload.map(
          (deletedReview) => deletedReview.id
        );

        // Remove the deleted reviews from the state
        state.pendingReviews = state.pendingReviews.filter(
          (review) => !deletedReviewIds.includes(review.id)
        );

        // Set loading to false
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
      .addCase(addReview.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.loading = false;
      })
      .addCase(updateReview.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        // Find the review to update in the state
        const existingReviewIndex = state.reviews.findIndex(
          (review) => review.id === action.payload.id
        );
        // If the review exists, update it
        if (existingReviewIndex !== -1) {
          // Update the existing review object
          state.reviews[existingReviewIndex] = {
            ...state.reviews[existingReviewIndex],
            ...action.payload, // Update specific properties (e.g., review)
          };
        }
        // Find the review to update in the userReviews state
        const existingUserReviewIndex = state.userReviews.findIndex(
          (review) => review.id === action.payload.id
        );
        if (existingUserReviewIndex !== -1) {
          state.userReviews[existingUserReviewIndex] = {
            ...state.userReviews[existingUserReviewIndex],
            ...action.payload,
          };
        }
        state.loading = false;
      })
      .addCase(removeReview.pending, (state, action) => {
        state.loading = true;
      })
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
        state.loading = false;
      });
  },
});

// Export reducer function by default
export default reviewSlice.reducer;
