import { createSlice } from "@reduxjs/toolkit";
import { checkLoginStatus } from "../auth/auth.actions";
import {
  addRoom,
  deleteRoom,
  loadMessages,
  loadRooms,
  updateRoom,
} from "./room.actions";

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
      .addCase(loadMessages.fulfilled, (state, action) => {
        const existingRoomIndex = state.rooms.findIndex(
          (room) => room.id === action.payload.room_id
        );
        state.rooms[existingRoomIndex] = action.payload;
        state.loading = false;
      })
      .addCase(addRoom.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
        state.loading = false;
      })
      .addCase(updateRoom.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        const existingRoomIndex = state.rooms.findIndex(
          (room) => room.id === action.payload.id
        );
        if (existingRoomIndex !== -1) {
          state.rooms[existingRoomIndex] = {
            ...state.rooms[existingRoomIndex],
            ...action.payload,
          };
        }
      })
      .addCase(deleteRoom.pending, (state, action) => {})
      .addCase(deleteRoom.fulfilled, (state, action) => {
        const index = state.rooms.findIndex(
          (room) => room.id === action.payload.id
        ); //Find index of movie removed in reviews
        state.rooms.splice(index, 1); //Remove
      });
  },
});

export default roomsSlice.reducer;
