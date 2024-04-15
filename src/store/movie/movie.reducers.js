import { createSlice } from "@reduxjs/toolkit";
import { fetchUpcomingMovies } from "./movie.actions";
import { fetchTrendingMovies } from "./movie.actions";

const initialState = {
  upcomingMovies: {},
  trendingMovies: {},
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        const { upcomingMovies } = action.payload;
        upcomingMovies.forEach((movie) => {
          const { id } = movie;
          state.upcomingMovies[id] = movie;
        });
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        const { trendingMovies } = action.payload;
        trendingMovies.forEach((movie) => {
          const { id } = movie;
          state.trendingMovies[id] = movie;
        });
      });
  },
});

export const selectUpcomingMovies = (state) => state.movies.upcomingMovies;
export default movieSlice.reducer;
