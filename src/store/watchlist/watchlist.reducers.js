import { createSlice } from "@reduxjs/toolkit";
import { loadWatchlist, addMovie, removeMovie } from "./watchlist.actions";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadWatchlist.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadWatchlist.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
      })
      .addCase(addMovie.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(removeMovie.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeMovie.fulfilled, (state, action) => {
        state.loading = false;
      });
  },
});

// Export reducer function by default
export default watchlistSlice.reducer;
