import { createSlice } from "@reduxjs/toolkit";
import { addAccount, loadAccounts, removeAccounts } from "./account.actions";

const initialState = {
  accounts: [],
  loading: false,
  error: null,
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
      .addCase(loadAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAccount.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addAccount.fulfilled, (state, action) => {
        state.accounts.push(action.payload);
        state.loading = false;
      })
      .addCase(addAccount.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        console.log(state.error);
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
      })
      .addCase(removeAccounts.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

export default accountSlice.reducer;
