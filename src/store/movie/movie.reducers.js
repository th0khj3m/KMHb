import { createSlice } from "@reduxjs/toolkit";
import { fetchUpcomingMovies } from "./movie.actions";

const initialState = {
  upcomingMovies: {},
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        const { upcomingMovies } = action.payload;
        upcomingMovies.forEach((movie) => {
          const { id } = movie;
          state.upcomingMovies[id] = movie;
        });
      })
  },
});

export const selectUpcomingMovies = (state) => state.movies.upcomingMovies;
// Export reducer function by default
export default movieSlice.reducer;
