import cron from "node-cron";
import express from "express";
import dotenv from "dotenv";
import GetReportList from "./mws.js";
import sendEmail from "./mailer.js";
import Mongoose from "mongoose";

const PORT = process.env.PORT || 3000;

//dotenv
dotenv.config();
const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;

//Express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Running on Port: ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Home");
});

//Routes
import invDataRoute from "./routes/invData.js";
import listingDataRoute from "./routes/listingData.js";
app.use("/invdata", invDataRoute);
app.use("/listingdata", listingDataRoute);

Mongoose.connect(
  MONGODB_CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to DB | API Live");
  }
);

// Cron
cron.schedule("5 * * * *", () => {
  console.log("Getting FBA Inventory Data (Every 5 minutes past the hour)");
  GetReportList("_GET_AFN_INVENTORY_DATA_");
  sendEmail("Getting Reports", "Fetching reports from MWS").catch((err) => {
    console.log(err);
  });
});

cron.schedule("10 * * * *", () => {
  console.log("Getting Listing Data (Every 10 minutes past the hour)");
  GetReportList("_GET_MERCHANT_LISTINGS_DATA_");
  sendEmail("Getting Reports", "Fetching reports from MWS").catch((err) => {
    console.log(err);
  });
});
