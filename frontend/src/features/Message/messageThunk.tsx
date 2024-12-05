import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";

export const encodeMessage = createAsyncThunk<string, { password: string | null, message: string | null }>(
    "message/encodeMessage",
    async ({password, message}) => {
        const response = await axiosAPI.post("/encode", {
            password,
            message,
        });

        return response.data.encodeText;
    }
);

export const decodeMessage = createAsyncThunk<string, { password: string | null, message: string | null }>(
    "message/decodeMessage",
    async ({ password, message }) => {
        const response = await axiosAPI.post("/decode", {
            password,
            message,
        });

        return response.data.decodedText;
    }
);