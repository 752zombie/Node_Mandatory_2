import { Router } from "express";
import session from "express-session";
import "dotenv/config";
import nodemailer from "nodemailer";
import { db } from "../database/createConnection.js";

const router = Router();

async function sendMail() {
      // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

router.post("/checkout" , async (req, res) => {
    //sendMail();
    console.log(process.env.test);
    const coursesFromClient = req.body.courses;
    const courses = [];

    if (!coursesFromClient) {
        res.send({result : "error"});
        return;
    }

    for (let course of coursesFromClient) {
        try {
            let preparedStatement = await db.prepare("SELECT price, title, id FROM courses WHERE id = ?");
            await preparedStatement.bind({1 : course.id});
            let courseFromDB = await preparedStatement.get();
            if (courseFromDB === undefined) {
                res.send({result : "error"});
                return;
            }
            
            courseFromDB.amount = course.amount;
            courses.push(courseFromDB);

        }

        catch(err) {
            res.send({result : "error"});
        }
    }

    const totalPrice = courses.reduce((prev, next) => prev + next.amount * next.price, 0);

    res.send({result : "success"});
})

export default router;