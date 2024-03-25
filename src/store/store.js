import { configureStore } from "@reduxjs/toolkit";

//import reducer
import listReducers from "./list/list.reducers";

export default configureStore({
    reducer: {
        list: listReducers
    },
});