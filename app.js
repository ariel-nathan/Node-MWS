import cron from "node-cron";
import express from "express";
import dotenv from "dotenv";
import GetReportList from "./mws.js";
import sendEmail from "./mailer.js";

const PORT = process.env.PORT || 3000;

//dotenv
dotenv.config();

//Express
const app = express();
app.listen(PORT, () => {
  console.log(`Running on Port: ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Home");
});

// Cron
cron.schedule("5 * * * *", () => {
  console.log("running every 5 minutes past the hour");
  GetReportList("_GET_AFN_INVENTORY_DATA_");
  sendEmail().catch((err) => {
    console.log(err);
  });
});
