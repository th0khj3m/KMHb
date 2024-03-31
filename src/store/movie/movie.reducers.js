import { createSlice } from "@reduxjs/toolkit";
import { fetchUpcomingMovies } from "./movie.actions";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    upcomingMovies: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingMovies.pending, (state, action) => {})
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcomingMovies = action.payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.error = action.payload;
      })
  },
});

export const selectMovies = (state) => state.movie.upcomingMovies;
// Export reducer function by default
export default movieSlice.reducer;
