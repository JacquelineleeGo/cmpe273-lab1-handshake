import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
};

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        increment: state => ({
            ...state,
            count: state.count + 1
        })
    }
});

const { actions, reducer } = globalSlice;

export { actions, reducer };