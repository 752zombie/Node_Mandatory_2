import express from "express";
import loginRouter from "./routers/loginRouter.js";
import coursesRouter from "./routers/coursesRouter.js";
import purchaseRouter from "./routers/purchaseRouter.js"
import session from "express-session";
const app = express();

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use(loginRouter);

app.use(coursesRouter);

app.use(purchaseRouter);


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