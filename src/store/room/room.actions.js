import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createRoom,
  fetchMessages,
  fetchRooms,
  remove,
  update,
} from "../../apis/rooms";

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

export const loadMessages = createAsyncThunk(
  "room/loadMessages",
  async (room_id, thunkAPI) => {
    try {
      const response = await fetchMessages(room_id);
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

export const updateRoom = createAsyncThunk(
  "room/updateRoom",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await update(data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "room/deleteRoom",
  async (room_id, thunkAPI) => {
    try {
      const response = await remove(room_id);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
