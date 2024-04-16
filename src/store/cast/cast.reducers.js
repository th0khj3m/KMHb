import { createSlice } from "@reduxjs/toolkit";
import { fetchCastDetails } from "./cast.actions";

const initialState = {
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