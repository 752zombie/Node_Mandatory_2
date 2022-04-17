import { Router } from "express";
import bcrypt from "bcrypt";
import session from "express-session";
import { db } from "../database/createConnection.js";

const router = Router();


router.post("/sign-up", async (req, res) => {
    const formData = req.body;
    // check for valid fields
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
        res.send({result : "invalid fields"});
        return;
    }


    // encrypt password and add user to DB
    const saltrounds = 10;
    const hash = await bcrypt.hash(formData.password, saltrounds);

    try {
        const preparedStatement = await db.prepare("INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)");
        await preparedStatement.bind({1 : formData.email, 2 : hash, 3 : formData.firstName, 4 : formData.lastName});
        await preparedStatement.run();
        // add new user to session as currently logged in user
        const user = {
            email : formData.email
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.send({result : "success", user : {email : formData.email, firstName : formData.firstName, lastName : formData.lastName}});
    }

    catch(err) {
        res.send({ result : "User with email already exists"});
    }



})

router.post("/sign-in", async (req, res) => {
    const formData = req.body;
    if (!formData.email || !formData.password) {
        res.send({result : "invalid fields"});
        return;
    }

    const preparedStatement = await db.prepare("SELECT * FROM users WHERE email = ?");
    await preparedStatement.bind({1 : formData.email});
    
    try {
        const user = await preparedStatement.get();
        await preparedStatement.finalize();
    
    
        bcrypt.compare(formData.password, user.password, (err, same) => {
            if (err) {
                res.send({result : "server error"});
            }
    
            else if (same) {
                const user = {
                    email : formData.email
                }
                req.session.isLoggedIn = true;
                req.session.user = user;
                res.send({result : "success", user : {firstName : user.first_name, lastName : user.last_name, email : user.email}});
            }
    
            else {
                res.send({result : "wrong email or password"});
            }
        })
    }

    catch(err) {
        res.send({result : "wrong email or password"});
    }


})

router.post("/sign-out", (req, res) => {
    req.session.destroy((err) => {
        res.send({result : "success"});
    })
})

export default router;