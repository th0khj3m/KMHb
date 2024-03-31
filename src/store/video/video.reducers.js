import { createSlice } from "@reduxjs/toolkit";
import { fetchNewestTrailer } from "./video.actions"

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewestTrailer.pending, (state, action) => {
        state.error = null;
      })
      .addCase(fetchNewestTrailer.fulfilled, (state, action) => {
        const { video } = action.payload;
        state.videos = [video];
        state.error = null;
      })
      .addCase(fetchNewestTrailer.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const selectVideo = (state) => state.videos;
export default videoSlice.reducer;
