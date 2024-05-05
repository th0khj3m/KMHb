import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUpcomingMovies,
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchDiscoverMovies,
  fetchNewestTrailer,
} from "./movies.actions";

const initialState = {
  upcomingMovies: {},
  trendingMovies: {},
  popularMovies: {},
  discoverMovies: {},
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingMovies.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        const upcomingMovies = action.payload;
        upcomingMovies.forEach((movie) => {
          const { id } = movie;
          state.upcomingMovies[id] = movie;
        });
        state.loading = false;
      })
      .addCase(fetchNewestTrailer.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchNewestTrailer.fulfilled, (state, action) => {
        const newestTrailer = action.payload;
        const movieId = action.meta.arg;
        state.upcomingMovies[movieId].video = newestTrailer;
        state.loading = false;
      })
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        const { trendingMovies } = action.payload;
        trendingMovies.forEach((movie) => {
          const { id } = movie;
          state.trendingMovies[id] = movie;
        });
        state.loading = false;
      })
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        const { popularMovies } = action.payload;
        popularMovies.forEach((movie) => {
          const { id } = movie;
          state.popularMovies[id] = movie;
        });
        state.loading = false;
      })
      .addCase(fetchDiscoverMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiscoverMovies.fulfilled, (state, action) => {
        const { discoverMovies } = action.payload;
        state.discoverMovies = discoverMovies;
        state.loading = false;
      });
  },
});

export default moviesSlice.reducer;
