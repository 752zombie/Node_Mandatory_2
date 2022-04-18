import { Router } from "express";
import session from "express-session";
import "dotenv/config";
import nodemailer from "nodemailer";
import { db } from "../database/createConnection.js";

const router = Router();

async function sendMail(receiver, data) {
    
  let transporter = nodemailer.createTransport({
    service : "Gmail",
    auth: {
      user: process.env.SENDER_EMAIL, 
      pass: process.env.SENDER_PASSWORD, 
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.SENDER_EMAIL, // sender address
    to: receiver,
    subject: data.subject ? data.subject : "No subject", // Subject line
    text: data.text ? data.text : "No text", // plain text body
    html: data.html ? data.html : "No html", // html body
  });

}


function buildReceipt(courses) {
    let text = "";
    for (let course of courses) {
        let amount = course.amount;
        let price = course.price;
        let subtotal = amount * price;
        text += `${course.id} ${course.title} x ${amount} x ${price} = ${subtotal}\n`
    }

    const total = courses.reduce((prev, next) => prev + next.amount * next.price, 0);
    text += "Total price: " + total;
    return text;
}

function buildHtmlReceipt(courses) {
    let html = "<p>Thank you for your purchase</p>";
    html += "<p>Order summary:</p>"
    html += "<table style='text-align:left;border-spacing:10px'>"
    // table headers
    html += "<tr><th>Course id</th><th>Course name</th><th>Price (USD)</th><th>Amount</th><th>Subtotal</th></tr>";

    for (let course of courses) {
        html += `<tr>
        <td style='padding-top: 15px;padding-right: 15px;border-bottom: 2px solid black;'>${course.id}</td>
        <td style='padding-top: 15px;padding-right: 15px;border-bottom: 2px solid black;'>${course.title}</td>
        <td style='padding-top: 15px;padding-right: 15px;border-bottom: 2px solid black;'>${course.price}</td>
        <td style='padding-top: 15px;padding-right: 15px;border-bottom: 2px solid black;'>${course.amount}</td>
        <td style='padding-top: 15px;padding-right: 15px;border-bottom: 2px solid black;'>${course.price * course.amount}</td>
        </tr>`;
    }

    html += "</table>"

    html += `<p>Total price: ${courses.reduce((prev, next) => prev + next.amount * next.price, 0)}\$</p>`

    return html;

}

router.post("/checkout" , async (req, res) => {
    const coursesFromClient = req.body.courses;
    const courses = [];


    if (!coursesFromClient || !req.session.isLoggedIn) {
        res.send({result : !coursesFromClient ? "no courses sent" : "you need to be signed in"});
        return;
    }

    for (let course of coursesFromClient) {
        try {
            let preparedStatement = await db.prepare("SELECT price, title, id FROM courses WHERE id = ?");
            await preparedStatement.bind({1 : course.id});
            let courseFromDB = await preparedStatement.get();
            if (courseFromDB === undefined) {
                res.send({result : "error id"});
                return;
            }
            
            courseFromDB.amount = course.amount;
            courses.push(courseFromDB);

        }

        catch(err) {
            res.send({result : "error db"});
        }
    }

    const data = {
        subject : "Order summary",
        text : buildReceipt(courses),
        html : buildHtmlReceipt(courses)
    }

    try {
        await sendMail(req.session.user.email, data);
        res.send({result : "success"});
    }

    catch(err) {
        res.send({result : "an error occured on the server"})
    }

})

export default router;