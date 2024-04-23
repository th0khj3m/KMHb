import { createSlice } from "@reduxjs/toolkit";
import { addAccount, loadAccounts, removeAccounts } from "./account.actions";

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
      })
      .addCase(addAccount.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addAccount.fulfilled, (state, action) => {
        state.accounts.push(action.payload);
        state.loading = false;
      })
      .addCase(removeAccounts.fulfilled, (state, action) => {
        // Remove the deleted accounts from the state
        state.loading = false;
        return {
          ...state,
          accounts: state.accounts.filter((account) => {
            return !action.payload
              .map((deletedAccount) => deletedAccount.id)
              .includes(account.id);
          }),
        };
      });
  },
});

export default accountSlice.reducer;
