import { configureStore } from "@reduxjs/toolkit";

// Import reducers
import listReducers from "./list/list.reducers";
import authReducer from "./auth/auth.reducers";

export default configureStore({
  reducer: {
    list: listReducers,
    auth: authReducer,
  },
});
