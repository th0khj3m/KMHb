import { createAsyncThunk } from "@reduxjs/toolkit";
import { addListAPI } from "../../apis/list-api";

export const addList = createAsyncThunk(
    'lists/addList', 
    async (listData, { rejectWithValue }) => {
        try {
            const response = await addListAPI(listData);
            return response;
        } catch (err) {
            return rejectWithValue(err.message);
            //throw err;
        }
    }
)