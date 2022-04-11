import express from "express";
import testRouter from "./routers/testRouter.js";
import loginRouter from "./routers/loginRouter.js";
import session from "express-session";
const app = express();

app.use(express.json());

app.use(session({
    secret: 'keyboard cat you should probably change this',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(testRouter);

app.use(loginRouter);

import path from "path";
app.use(express.static(path.resolve('../client/public')));


app.get("/secret", (req, res) => {
    if (req.session.isLoggedIn) {
        res.send({data : "here you go"});
    }

    else {
        res.send({data : "secret"});
    }
    
})

app.get("*", (req, res) => {
    res.sendFile(path.resolve('../client/public/index.html'));
})



app.listen(8080, () => {
    console.log("Server is running on port 8080");
})