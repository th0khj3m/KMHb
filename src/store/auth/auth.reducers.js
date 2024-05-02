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
    loading: false,
    isAuthenticated: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkLoginStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { isAuthenticated } = action.payload;
        state.isAuthenticated = isAuthenticated;
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
        const { isAuthenticated } = action.payload;
        state.isAuthenticated = isAuthenticated;
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
        state.error = null;
        state.loading = false;
      });
    // .addCase(initiateOAuth.fulfilled, (state, action) => {
    //   state.isAuthenticated = true;
    //   state.loading = false;
    // });
  },
});

// Export reducer function by default
export default authSlice.reducer;
