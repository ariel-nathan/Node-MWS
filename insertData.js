import { FBAInv } from "./models/FBAInvData.js";
import { ListingData } from "./models/listingData.js";
import sendEmail from "./mailer.js";

function insert(data, reportType) {
  if (reportType === "_GET_MERCHANT_LISTINGS_DATA_") {
    ListingData.insertMany(data)
      .then(() => {
        console.log("Inserted All Records to DB");
        sendEmail("Success", "All records added to DB succesfully");
      })
      .catch((err) => {
        console.log(err);
        sendEmail("Error", "Error:\n" + err);
      });
  } else if (reportType === "_GET_AFN_INVENTORY_DATA_") {
    FBAInv.insertMany(data)
      .then(() => {
        console.log("Inserted All Records to DB");
        sendEmail("Success", "All records added to DB succesfully");
      })
      .catch((err) => {
        console.log(err);
        sendEmail("Error", "Error:\n" + err);
      });
  }
}

export default insert;
