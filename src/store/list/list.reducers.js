import { createSlice } from "@reduxjs/toolkit";
import { addList } from "./list.actions";

const initialState = {
    lists: [],
    loading: false,
    error: null,
};

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addList.fulfilled, (state, action) => {
            const { list } = action.payload;
            state.lists.push(list);
        });
    },
});

// Export the action creators and reduces
export default listSlice.reducer;
export const selectLists = (state) => state.lists;