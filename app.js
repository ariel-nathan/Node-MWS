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
import productsRoute from "./routes/invData.js";
app.use("/invdata", productsRoute);

Mongoose.connect(
  MONGODB_CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to DB");
  }
);

// Cron
cron.schedule("5 * * * *", () => {
  console.log("running every 5 minutes past the hour");
  GetReportList("_GET_AFN_INVENTORY_DATA_");
  sendEmail("Getting Reports", "Fetching reports from MWS").catch((err) => {
    console.log(err);
  });
});
