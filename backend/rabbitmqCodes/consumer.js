const amqp = require('amqplib/callback_api');
const nodemailer = require("nodemailer");

require("dotenv").config();


amqp.connect("amqp://localhost", function (err, conn) {
    if (err) throw err;
  conn.createChannel(function (err1, ch) {
    if (err1) throw err1;
    ch.consume('email-queue', async function (message) {

        const parsedMessage = JSON.parse(message.content.toString());

        const transporter = nodemailer.createTransport({

            service: "gmail",
            port: 587,
            auth: {
                user: "avggamerpubg@gmail.com",
                pass: "bunigziiysnerdnj"
            }
        });

        const mailOptions = {
            from: ` Reap n Sow <avggamerpubg@gmail.com>`,
            to: `<${parsedMessage.author_email}>`,
            subject: `${parsedMessage.answered_by} answered your question`,
            html: `<div class = "justify-center">
                    <h1>${parsedMessage.question_title}</h1>
                    <h3>${parsedMessage.content}</h3>
                   </div>`
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                throw error;
            } else {
                console.log('Email sent: ', info.response);
            }
        })

        console.log(parsedMessage);

      },{ noAck: true }
    );
  });
});