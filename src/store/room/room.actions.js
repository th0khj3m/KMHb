import { createAsyncThunk } from "@reduxjs/toolkit";
import { createRoom, fetchRooms } from "../../apis/rooms";

export const loadRooms = createAsyncThunk(
  "room/loadRooms",
  async (movieId, thunkAPI) => {
    try {
      const response = await fetchRooms(movieId);
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
