import { createSlice } from "@reduxjs/toolkit";
import {
  loadRatings,
  addRating,
  removeRating,
  updateRating,
  getRating,
  loadAvgRating,
} from "./rating.actions";
import { checkLoginStatus } from "../auth/auth.actions";

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    movieRatings: {},
    avgRating: null,
    ratings: [],
    error: null,
    loading: false,
  },
  reducers: {
    setMovieRating: (state, action) => {
      const { movieId, rating } = action.payload;
      state.movieRatings[movieId] = rating;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkLoginStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { ratings } = action.payload;
        state.ratings = ratings;
        state.loading = false;
      })
      .addCase(loadRatings.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadRatings.fulfilled, (state, action) => {
        state.ratings = action.payload;
        state.loading = false;
      })
      .addCase(loadAvgRating.fulfilled, (state, action) => {
        state.avgRating = action.payload.average_rating;
      })
      .addCase(getRating.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRating.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addRating.pending, (state, action) => {})
      .addCase(addRating.fulfilled, (state, action) => {
        state.ratings.push(action.payload);
      })
      .addCase(updateRating.pending, (state, action) => {})
      .addCase(updateRating.fulfilled, (state, action) => {
        // Find the rating to update in the state
        const existingRatingIndex = state.ratings.findIndex(
          (rating) => rating.id === action.payload.id
        );
        if (existingRatingIndex !== -1) {
          // Update the existing rating object
          state.ratings[existingRatingIndex] = {
            ...state.ratings[existingRatingIndex],
            ...action.payload, // Update specific properties (e.g., rating)
          };
        }
      })
      .addCase(removeRating.pending, (state, action) => {})
      .addCase(removeRating.fulfilled, (state, action) => {
        const index = state.ratings.findIndex(
          (rating) => rating.id === action.payload.id
        ); //Find index of movie removed in ratings
        state.ratings.splice(index, 1); //Remove
      });
  },
});

export const { setMovieRating } = ratingSlice.actions;
export default ratingSlice.reducer;
