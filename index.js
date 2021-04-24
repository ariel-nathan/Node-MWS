import MwsApi from "amazon-mws";
import Mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MWS_SECRET_KEY = process.env.MWS_SECRET_KEY;
const MWS_SELLER_ID = process.env.MWS_SELLER_ID;
const MWS_AUTH_TOKEN = process.env.MWS_AUTH_TOKEN;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;

//MongoDB
// const AFNProductSchema = new Mongoose.Schema({
//   "seller-sku": String,
//   "fulfillment-channel-sku": String,
//   asin: String,
//   "condition-type": String,
//   "Warehouse-Condition-code": String,
//   "Quantity Available": Number,
// });
// const Item = Mongoose.model("item", AFNProductSchema);

// Mongoose.connect(MONGODB_CONNECTION_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = Mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("Connected to DB");
//   const ovenmitt = new Item({
//     "seller-sku": "028332694636-UPC",
//     "fulfillment-channel-sku": "B07W425S4M",
//     asin: "B07W425S4M",
//     "condition-type": "NewItem",
//     "Warehouse-Condition-code": "SELLABLE",
//     "Quantity Available": "0",
//   });
//   ovenmitt.save((err, ovenmitt) => {
//     if (err) return console.log(err);
//     console.log(ovenmitt["seller-sku"]);
//   });
// });

//MWS API
const mws = new MwsApi();
mws.setApiKey(AWS_ACCESS_KEY_ID, MWS_SECRET_KEY);

mws.reports.search(
  {
    Version: "2009-01-01",
    Action: "GetReportList",
    SellerId: MWS_SELLER_ID,
    MWSAuthToken: MWS_AUTH_TOKEN,
    "ReportTypeList.Type.1": "_GET_AFN_INVENTORY_DATA_",
  },
  (error, response) => {
    if (error) {
      console.log("error ", error);
      return;
    }
    getReport(response.ReportInfo[0].ReportId);
    console.log("response", response.ReportInfo[0]);
  }
);

function getReport(reportId) {
  mws.reports.search(
    {
      Version: "2009-01-01",
      Action: "GetReport",
      SellerId: MWS_SELLER_ID,
      MWSAuthToken: MWS_AUTH_TOKEN,
      ReportId: reportId,
    },
    (error, response) => {
      if (error) {
        console.log("error ", error);
        return;
      }
      console.log("response", response);
    }
  );
}
