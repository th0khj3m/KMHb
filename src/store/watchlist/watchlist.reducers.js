import { createSlice } from "@reduxjs/toolkit";
import { loadWatchlist, addMovie, removeMovie } from "./watchlist.actions";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    movies: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadWatchlist.pending, (state, action) => {})
      .addCase(loadWatchlist.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
      .addCase(addMovie.pending, (state, action) => {})
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(removeMovie.pending, (state, action) => {})
      .addCase(removeMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(
          (movie) => movie.movie_id === action.payload.movie_id
        ); //Find index of movie removed in movies
        state.movies.splice(index, 1); //Remove
      });
  },
});

// Export reducer function by default
export default watchlistSlice.reducer;
