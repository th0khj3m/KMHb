import { createSlice } from "@reduxjs/toolkit";
import { loadWatchlist, addMovie, removeMovie } from "./watchlist.actions";
import { checkLoginStatus } from "../auth/auth.actions";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    movies: [],
    loading: false,
    loadingMovie: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { watchlist } = action.payload;
        state.movies = watchlist.movies;
      })
      .addCase(loadWatchlist.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadWatchlist.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
      })
      .addCase(addMovie.pending, (state, action) => {
        // Set loading state of the specific movie to true
        state.loadingMovie[action.meta.arg] = true;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
        state.loadingMovie[action.meta.arg] = false;
      })
      .addCase(removeMovie.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(
          (movie) => movie.movie_id === action.payload.movie_id
        ); //Find index of movie removed in movies
        state.movies.splice(index, 1); //Remove from state
        state.loading = false;
      });
  },
});

// Export reducer function by default
export default watchlistSlice.reducer;
