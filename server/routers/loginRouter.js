import { Router } from "express";
import bcrypt from "bcrypt";
const router = Router();

router.post("/signup", (req, res) => {
    const formData = req.body;
    // check for valid fields

    // check if user with email already exists

    // encrypt password and add user to DB
    const saltrounds = 10;
    const hash = bcrypt.hash(formData.password, saltrounds);

    // add new user to session as currently logged in user
    req.session.isLoggedIn = true;
    res.send({result : "success"});
})

export default router;