import { create } from '@mui/material/styles/createTransitions';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, thunkApi) => {
        try {
        
        } catch (err) {
            throw err;
        }
    }
)