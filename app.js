import MwsApi from "amazon-mws";
import Mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";
import express from "express";
import nodemailer from "nodemailer";
import xoauth2 from "xoauth2";

// import { response } from "./MerchantListingsData.js";
// console.log(response[0]);

const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();

app.listen(PORT, () => {
  console.log(`Running on Port: ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Home");
});

//Process Imports
const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const GOOGLE_ACCESS_TOKEN = process.env.GOOGLE_ACCESS_TOKEN;
// const MWS_SECRET_KEY = process.env.MWS_SECRET_KEY;
// const MWS_SELLER_ID = process.env.MWS_SELLER_ID;
// const MWS_AUTH_TOKEN = process.env.MWS_AUTH_TOKEN;
// const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
// const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;

//Nodemailer
async function sendEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL_USER,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken: GOOGLE_ACCESS_TOKEN,
    },
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: EMAIL_RECIPIENT,
    subject: "Test",
    text: "Hello World",
    html: "<p>Hello World</p>",
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + res.response);
    }
  });
}

sendEmail().catch((err) => {
  console.log(err);
});

// cron.schedule("* * * * *", () => {
//   console.log("running every minute");
//   sendEmail().catch((err) => {
//     console.log(err);
//   });
// });

// MongoDB
// const AFNProductSchema = new Mongoose.Schema({
//   "seller-sku": String,
//   "fulfillment-channel-sku": String,
//   asin: String,
//   "condition-type": String,
//   "Warehouse-Condition-code": String,
//   "Quantity Available": Number,
// });
// const Item = Mongoose.model("item", AFNProductSchema);

// const MerchantListingDataSchema = new Mongoose.Schema({
//   "item-name": String,
//   "item-description": String,
//   "listing-id": String,
//   "seller-sku": String,
//   price: String,
//   quantity: String,
//   "open-date": String,
//   "image-url": String,
//   "item-is-marketplace": String,
//   "product-id-type": String,
//   "zshop-shipping-fee": String,
//   "item-note": String,
//   "item-condition": String,
//   "zshop-category1": String,
//   "zshop-browse-path": String,
//   "zshop-storefront-feature": String,
//   asin1: String,
//   asin2: String,
//   asin3: String,
//   "will-ship-internationally": String,
//   "expedited-shipping": String,
//   "zshop-boldface": String,
//   "product-id": String,
//   "bid-for-featured-placement": String,
//   "add-delete": String,
//   "pending-quantity": String,
//   "fulfillment-channel": String,
//   "Business Price": String,
//   "Quantity Price Type": String,
//   "Quantity Lower Bound 1": String,
//   "Quantity Price 1": String,
//   "Quantity Lower Bound 2": String,
//   "Quantity Price 2": String,
//   "Quantity Lower Bound 3": String,
//   "Quantity Price 3": String,
//   "Quantity Lower Bound 4": String,
//   "Quantity Price 4": String,
//   "Quantity Lower Bound 5": String,
//   "Quantity Price 5": String,
//   "merchant-shipping-group": String,
//   "Progressive Price Type": String,
//   "Progressive Lower Bound 1": String,
//   "Progressive Price 1": String,
//   "Progressive Lower Bound 2": String,
//   "Progressive Price 2": String,
//   "Progressive Lower Bound 3": String,
//   "Progressive Price 3": String,
// });
// const Product = new Mongoose.model("product", MerchantListingDataSchema);

// Mongoose.connect(MONGODB_CONNECTION_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = Mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("Connected to DB");
//   const ovenmitt = new Product({
//     "item-name":
//       'SoHome Summer Holiday Buffalo Checkered Tablecloth, Stylish Festive Tablecloth, Stain Resistant/Machine Washable Polyester, 60"x144" Rectangle Navy/White',
//     "item-description":
//       "Create the perfect table setting with the Buffalo Check tablecloth by SoHome. The trendy and charming buffalo check pattern makes the perfect backdrop for your dinnerware and will also complement your modern farmhouse d�cor. Made with a cotton-rich, heavyweight fabric that is water repellent, stain resistant and fade resistant. This table cover is perfect for festive brunches, everyday meals, holiday parties and formal dinners. Available in a variety of sizes and colors to best suit your d�cor needs.",
//     "listing-id": "1116XLSQAYQ",
//     "seller-sku": "028332733120",
//     price: "29.99",
//     quantity: "",
//     "open-date": "2020-11-16 11:44:35 PST",
//     "image-url": "",
//     "item-is-marketplace": "y",
//     "product-id-type": "3",
//     "zshop-shipping-fee": "",
//     "item-note": "",
//     "item-condition": "11",
//     "zshop-category1": "",
//     "zshop-browse-path": "",
//     "zshop-storefront-feature": "",
//     asin1: "B08DGY67Z6",
//     asin2: "",
//     asin3: "",
//     "will-ship-internationally": "",
//     "expedited-shipping": "",
//     "zshop-boldface": "",
//     "product-id": "028332733120",
//     "bid-for-featured-placement": "",
//     "add-delete": "",
//     "pending-quantity": "",
//     "fulfillment-channel": "AMAZON_NA",
//     "Business Price": "",
//     "Quantity Price Type": "",
//     "Quantity Lower Bound 1": "",
//     "Quantity Price 1": "",
//     "Quantity Lower Bound 2": "",
//     "Quantity Price 2": "",
//     "Quantity Lower Bound 3": "",
//     "Quantity Price 3": "",
//     "Quantity Lower Bound 4": "",
//     "Quantity Price 4": "",
//     "Quantity Lower Bound 5": "",
//     "Quantity Price 5": "",
//     "merchant-shipping-group": "Default-Template",
//     "Progressive Price Type": "",
//     "Progressive Lower Bound 1": "",
//     "Progressive Price 1": "",
//     "Progressive Lower Bound 2": "",
//     "Progressive Price 2": "",
//     "Progressive Lower Bound 3": "",
//     "Progressive Price 3": "",
//   });
//   ovenmitt.save((err, ovenmitt) => {
//     if (err) return console.log(err);
//     console.log(ovenmitt["seller-sku"]);
//   });
// });

//MWS API
// const mws = new MwsApi();
// mws.setApiKey(AWS_ACCESS_KEY_ID, MWS_SECRET_KEY);

// mws.reports.search(
//   {
//     Version: "2009-01-01",
//     Action: "GetReportList",
//     SellerId: MWS_SELLER_ID,
//     MWSAuthToken: MWS_AUTH_TOKEN,
//     "ReportTypeList.Type.1": "_GET_MERCHANT_LISTINGS_DATA_",
//   },
//   (error, response) => {
//     if (error) {
//       console.log("error ", error);
//       return;
//     }
//     getReport(response.ReportInfo[0].ReportId);
//     console.log("response", response.ReportInfo[0]);
//   }
// );

// function getReport(reportId) {
//   mws.reports.search(
//     {
//       Version: "2009-01-01",
//       Action: "GetReport",
//       SellerId: MWS_SELLER_ID,
//       MWSAuthToken: MWS_AUTH_TOKEN,
//       ReportId: reportId,
//     },
//     (error, response) => {
//       if (error) {
//         console.log("error ", error);
//         return;
//       }
//       console.log("response", response);
//     }
//   );
// }
