import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, checkLoginStatus } from "./auth.actions.js";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { isLoggedIn } = action.payload;
        state.isAuthenticated = isLoggedIn;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { isAuthenticated } = action.payload;
        state.isAuthenticated = isAuthenticated;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state, action) => {})
      .addCase(registerUser.fulfilled, (state, action) => {})
      .addCase(registerUser.rejected, (state, action) => {});
  },
});

// Export reducer function by default
export default authSlice.reducer;
