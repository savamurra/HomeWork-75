import express from "express";
const Vigenere = require('caesar-salad').Vigenere;

const messageRouter = express.Router();


messageRouter.post('/encode', (req, res) => {
    const {password,message} = req.body;

    const encodeText = Vigenere.Cipher(password).crypt(message);
    res.send({encodeText});
});

messageRouter.post('/decode', (req, res) => {
    const {password,message} = req.body;

    const decodedText = Vigenere.Decipher(password).crypt(message);
    res.send({decodedText});
});


export default messageRouter;