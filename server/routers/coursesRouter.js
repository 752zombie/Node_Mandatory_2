import { Router } from "express";
import { db } from "../database/createConnection.js";

const router = Router();


router.get("/courses/:page", async (req, res) => {
    //check input
    let page = 1;
    if (req.params.page) {
        const parsed = parseInt(req.params.page);
        page = isNaN(parsed) ? 1 : parsed; 
    }

    const offset = (page - 1) * 5;
    
    //retrieve courses from db
    const preparedStatement = await db.prepare("SELECT * FROM courses LIMIT 5 OFFSET ?");
    await preparedStatement.bind({1 : offset});
    const courses = await preparedStatement.all();

    //send retrieved courses
    res.send({result : "success", courses : courses});
})

export default router;