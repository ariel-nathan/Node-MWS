import MwsApi from "amazon-mws";
import dotenv from "dotenv";
import insert from "./insertData.js";

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
      "ReportTypeList.Type.1": reportType,
    },
    (error, response) => {
      if (error) {
        console.log("Error: ", error);
        return;
      }
      console.log("Report found with ID: ", response.ReportInfo[0].ReportId);
      console.log("Grabbing report");
      GetReport(response.ReportInfo[0].ReportId, reportType);
    }
  );
}

function GetReport(reportId, reportType) {
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
      insert(response.data, reportType);
    }
  );
}

export default GetReportList;
