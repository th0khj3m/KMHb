import { createSlice } from "@reduxjs/toolkit";
import { fetchNewestTrailer } from "./video.actions";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    newestTrailer: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewestTrailer.fulfilled, (state, action) => {
        const { video } = action.payload;
        state.newestTrailer[video.id] = video;
        state.error = null;
      })
  },
});

export default videoSlice.reducer;
