import MwsApi from "amazon-mws";
import cron from "node-cron";
import dotenv from "dotenv";
import insertOne from "./mongo.js";
import fs from "fs";

dotenv.config();

//Process Imports
const MWS_SECRET_KEY = process.env.MWS_SECRET_KEY;
const MWS_SELLER_ID = process.env.MWS_SELLER_ID;
const MWS_AUTH_TOKEN = process.env.MWS_AUTH_TOKEN;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;

//MWS API
const mws = new MwsApi();
mws.setApiKey(AWS_ACCESS_KEY_ID, MWS_SECRET_KEY);

function GetReportList(reportType) {
  mws.reports.search(
    {
      Version: "2009-01-01",
      Action: "GetReportList",
      SellerId: MWS_SELLER_ID,
      MWSAuthToken: MWS_AUTH_TOKEN,
      "ReportTypeList.Type.1": reportType, // _GET_MERCHANT_LISTINGS_DATA_ _GET_AFN_INVENTORY_DATA_
    },
    (error, response) => {
      if (error) {
        console.log("Error: ", error);
        return;
      }
      console.log("Report found with ID: ", response.ReportInfo[0].ReportId);
      console.log("Grabbing report");
      GetReport(response.ReportInfo[0].ReportId);
    }
  );
}

function GetReport(reportId) {
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
        console.log("Error ", error);
        return;
      }
      console.log("Inserting into DB");
      insertOne(response.data);
    }
  );
}

export default GetReportList;
