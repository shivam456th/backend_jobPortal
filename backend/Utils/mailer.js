import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async (email, subject, content) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: content, // html body
    });
    console.log("email sent");
  } catch (error) {
    console.log("error in sending email", error.message);
  }
};

export default sendEmail;
