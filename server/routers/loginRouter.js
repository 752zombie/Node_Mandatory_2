import { Router } from "express";
import bcrypt from "bcrypt";
import session from "express-session";

const router = Router();

const users = [];

router.post("/signup", async (req, res) => {
    const formData = req.body;
    // check for valid fields

    // check if user with email already exists

    // encrypt password and add user to DB
    const saltrounds = 10;
    const hash = await bcrypt.hash(formData.password, saltrounds);
    users.push({
        email : formData.email,
        password : hash
    });

    // add new user to session as currently logged in user
    req.session.isLoggedIn = true;
    res.send({result : "success"});
})

router.post("/signin", (req, res) => {
    const formData = req.body;
    const user = users.find((user) => user.email === formData.email);
    if (user === undefined) {
        res.send({result : "error"});
        return;
    }

    bcrypt.compare(formData.password, user.password, (err, same) => {
        if (err) {
            res.send({result : "error"});
        }

        else if (same) {
            req.session.isLoggedIn = true;
            res.send({result : "success"});
        }

        else {
            res.send({result : "wrong username or password"});
        }
    })
})

router.post("/sign-out", (req, res) => {
    req.session.destroy((err) => {
        res.send({result : "success"});
    })
})

export default router;