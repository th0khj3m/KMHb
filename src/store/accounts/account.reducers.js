import { createSlice } from "@reduxjs/toolkit";
import { loadAccounts } from "./account.actions";

const initialState = {
  accounts: [],
  loading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAccounts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadAccounts.fulfilled, (state, action) => {
        state.accounts = action.payload;
        state.loading = false;
      });
      
  },
});

export default accountSlice.reducer;
