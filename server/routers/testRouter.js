import { Router } from "express";
const router = Router();

router.get("/this-is-weird", (req, res) => {
    res.send({hello : "test"});
})

export default router;