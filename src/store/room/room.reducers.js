import { createSlice } from "@reduxjs/toolkit";
import { checkLoginStatus } from "../auth/auth.actions";
import { produce } from "immer";
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
    rooms: {},
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
        const { rooms } = action.payload;
        rooms.forEach((room) => {
          state.rooms[room.id] = { ...room }; // Assign room properties to state.rooms with room ID as key
        });
        state.loading = false;
      })
      .addCase(checkLoginStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadRooms.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadRooms.fulfilled, (state, action) => {
        state.rooms[action.payload.id] = action.payload;
        state.loading = false;
      })
      .addCase(loadRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadMessages.fulfilled, (state, action) => {
        const roomId = action.meta.arg; // Contains the original arguments passed to the thunk action
        state.rooms[roomId].messages = action.payload;
        state.loading = false;
      })
      .addCase(addRoom.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.rooms[action.payload.id] = action.payload;
        state.loading = false;
      })
      .addCase(updateRoom.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        const { id } = action.payload;
        if (state.rooms[id]) {
          state.rooms[id] = {
            ...state.rooms[id],
            ...action.payload,
          };
        }
        // const existingRoomIndex = state.rooms.findIndex(
        //   (room) => room.id === action.payload.id
        // );
        // if (existingRoomIndex !== -1) {
        //   state.rooms[existingRoomIndex] = {
        //     ...state.rooms[existingRoomIndex],
        //     ...action.payload,
        //   };
        // }
      })
      .addCase(deleteRoom.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        const roomId = action.payload.id;
        delete state.rooms[roomId]; // This might not work as expected with Immer

        // Alternatively, use produce to delete the property
        return produce(state, (draftState) => {
          // produce function and then delete the property from draft
          delete draftState.rooms[roomId];
        });
        // delete state.rooms[action.payload.id];
        // state.loading = false;
        // state.rooms[action.payload.id]
        // const index = state.rooms.findIndex(
        //   (room) => room.id === action.payload.id
        // ); //Find index of movie removed in reviews
        // state.rooms.splice(index, 1); //Remove
      });
  },
});

export default roomsSlice.reducer;
