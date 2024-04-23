import { createSlice } from "@reduxjs/toolkit";
import { fetchCastDetails, fetchTrendingCasts } from "./cast.actions";

const initialState = {
  trendingCasts: [],
  castDetails: {},
  loading: false,
  error: null,
};

const castSlice = createSlice({
  name: "cast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingCasts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingCasts.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingCasts = action.payload;
      })
      .addCase(fetchCastDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCastDetails.fulfilled, (state, action) => {
        const { castDetails } = action.payload;
        state.castDetails = castDetails;
        state.loading = false;
      })
      .addCase(fetchCastDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default castSlice.reducer;
