import express from "express";
const app = express();

app.use(express.json());

import path from "path";
app.use(express.static(path.resolve('../client/public')));

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})