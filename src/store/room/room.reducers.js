import { createSlice } from "@reduxjs/toolkit";
import { checkLoginStatus } from "../auth/auth.actions";
import { addRoom, loadRooms } from "./room.actions";

const roomsSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkLoginStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        state.rooms = action.payload.rooms;
      })
      .addCase(loadRooms.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
        state.loading = false;
      })
      .addCase(loadRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addRoom.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
        state.loading = false;
      });
  },
});

export default roomsSlice.reducer;
