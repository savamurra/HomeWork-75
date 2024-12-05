import {Box, Button, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {IMessage} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {decodeMessage, encodeMessage} from "./messageThunk.tsx";
import {decodedText, encodedText} from "./messageSlice.tsx";

const initialState: IMessage = {
    password: '',
    decodedMessage: '',
    encodedMessage: '',
}
const Message = () => {
    const [form, setForm] = useState<IMessage>(initialState);
    const dispatch = useAppDispatch();
    const encodeText = useAppSelector(encodedText);
    const decodeText = useAppSelector(decodedText);


    useEffect(() => {
        if (encodeText !== null) {
            setForm(prevForm => ({
                ...prevForm,
                encodedMessage: encodeText,
                decodedMessage: '',
            }));
        }
    }, [encodeText]);

    useEffect(() => {
        if (decodeText !== null) {
            setForm(prevForm => ({
                ...prevForm,
                decodedMessage: decodeText,
                encodedMessage: "",
            }));
        }
    }, [decodeText]);


    const encode = async () => {
        if (form.decodedMessage !== '') {
            await dispatch(encodeMessage({ password: form.password, message: form.decodedMessage }));
        }
    };

    const decode = async () => {
        if (form.encodedMessage !== '') {
            await dispatch(decodeMessage({ password: form.password, message: form.encodedMessage }));
        }
    };

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
       const {name, value} = e.target;
       setForm({...form, [name]: value});
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: 2,
            }}
        >
            <Typography variant="h4" gutterBottom>
                Vigenere Cipher
            </Typography>
            <TextField
                label="Decoded message"
                variant="outlined"
                fullWidth
                value={form.decodedMessage}
                name="decodedMessage"
                onChange={inputHandler}
                sx={{marginBottom: 2}}
            />
            <Button variant="contained" sx={{marginBottom: 2}} onClick={encode} disabled={form.password === '' || form.decodedMessage === ''}>
                Encode ↓
            </Button>
            <TextField
                label="Password"
                variant="outlined"
                fullWidth
                value={form.password}
                name="password"
                onChange={inputHandler}
                sx={{marginBottom: 2}}
            />
            <Button variant="contained" sx={{marginBottom: 2}} onClick={decode} disabled={form.password === '' || form.encodedMessage === ''}>
                Decode ↑
            </Button>
            <TextField
                label="Encoded message"
                variant="outlined"
                fullWidth
                onChange={inputHandler}
                value={form.encodedMessage}
                name="encodedMessage"
                sx={{marginBottom: 2}}
            />
        </Box>
    );
};

export default Message;