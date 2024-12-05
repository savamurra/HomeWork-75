import messageRouter from "./routers/message";
import express from "express";
import cors from "cors";


const app = express();
const port = 8000;

app.use(express.json());
app.use(cors())
app.use("/", messageRouter)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});