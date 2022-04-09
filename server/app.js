import express from "express";
import testRouter from "./routers/testRouter.js";
const app = express();

app.use(express.json());
app.use(testRouter);

import path from "path";
app.use(express.static(path.resolve('../client/public')));


app.get("*", (req, res) => {
    res.sendFile(path.resolve('../client/public/index.html'));
})



app.listen(8080, () => {
    console.log("Server is running on port 8080");
})