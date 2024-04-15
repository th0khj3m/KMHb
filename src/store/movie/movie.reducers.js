import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieDetails } from "./movie.actions";

const initialState = {
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        const { movieDetails, movieId } = action.payload;
        state[movieId] = movieDetails;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default movieSlice.reducer;
