import { createSlice } from "@reduxjs/toolkit";
import { loadRatings, addRating, removeRating } from "./rating.actions";

const watchlistSlice = createSlice({
  name: "rating",
  initialState: {
    ratings: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadRatings.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadRatings.fulfilled, (state, action) => {
        state.ratings = action.payload;
        state.loading = false;
      })
      .addCase(addRating.pending, (state, action) => {})
      .addCase(addRating.fulfilled, (state, action) => {
        state.ratings.push(action.payload);
      })
      .addCase(removeRating.pending, (state, action) => {})
      .addCase(removeRating.fulfilled, (state, action) => {
        const index = state.ratings.findIndex(
          (rating) => rating.id === action.payload.id
        ); //Find index of movie removed in movies
        state.ratings.splice(index, 1); //Remove
      });
  },
});

// Export reducer function by default
export default watchlistSlice.reducer;
