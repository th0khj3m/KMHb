import { createSlice } from "@reduxjs/toolkit";
import { checkLoginStatus, loginUser, logoutUser } from "../auth/auth.actions";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login success
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        Object.assign(state, user);
      })
      // Check login status success
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { user } = action.payload;
        Object.assign(state, user);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        Object.assign(state, {});
      });
  },
});

export default userSlice.reducer;
