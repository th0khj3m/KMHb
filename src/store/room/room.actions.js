import { createAsyncThunk } from "@reduxjs/toolkit";
import { createRoom, fetchRooms } from "../../apis/rooms";

export const loadRooms = createAsyncThunk(
  "room/loadRooms",
  async (_, thunkAPI) => {
    try {
      const response = await fetchRooms();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const addRoom = createAsyncThunk(
  "room/addRoom",
  async (data, thunkAPI) => {
    try {
      const response = await createRoom(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
