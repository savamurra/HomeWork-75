import {createSlice} from "@reduxjs/toolkit";
import {decodeMessage, encodeMessage} from "./messageThunk.tsx";
import {RootState} from "../../app/store.ts";

const initialState = {
    encodedMessage: null as string | null,
    decodedMessage: null as string | null,
    error: null,
}

export const encodedText = (state: RootState) => state.message.encodedMessage;
export const decodedText = (state: RootState) => state.message.decodedMessage;


const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(encodeMessage.pending, (state) => {
                state.error = null;
            })
            .addCase(encodeMessage.fulfilled, (state, action) => {
                state.encodedMessage = action.payload;
                state.decodedMessage = null
            })
            .addCase(encodeMessage.rejected, (state) => {
                state.error = null
            })
            .addCase(decodeMessage.pending, (state) => {
                state.error = null;
            })
            .addCase(decodeMessage.fulfilled, (state,action) => {
                state.decodedMessage = action.payload;
                state.encodedMessage = null;
            })
            .addCase(decodeMessage.rejected, (state) => {
                state.error = null;
            })
    }
});

export const messageReducer = messageSlice.reducer;