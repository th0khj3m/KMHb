import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./auth.actions.js";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.user = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

// Export reducer function by default
export default authSlice.reducer;
