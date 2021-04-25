import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

//Process Imports
const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT;
const EMAIL_USER = process.env.EMAIL_USER;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const GOOGLE_ACCESS_TOKEN = process.env.GOOGLE_ACCESS_TOKEN;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

async function sendEmail(subject, text) {
  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL_USER,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: EMAIL_RECIPIENT,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + res.response);
    }
  });
}

export default sendEmail;
