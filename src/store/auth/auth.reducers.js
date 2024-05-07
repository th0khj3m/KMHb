import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  checkLoginStatus,
  logoutUser,
} from "./auth.actions.js";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isAdmin: false,
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
        const { isAuthenticated, isAdmin } = action.payload;
        state.isAuthenticated = isAuthenticated;
        state.isAdmin = isAdmin;
        state.loading = false;
      })
      .addCase(checkLoginStatus.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { isAuthenticated, isAdmin } = action.payload;
        state.isAuthenticated = isAuthenticated;
        state.isAdmin = isAdmin;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.loading = false;
        state.error = null;
      });
  },
});

// Export reducer function by default
export default authSlice.reducer;
