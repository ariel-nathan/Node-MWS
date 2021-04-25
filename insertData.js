import Mongoose from "mongoose";
import { FBAInv } from "./models/FBAInvData.js";
import sendEmail from "./mailer.js";

function insert(data) {
  const db = Mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));

  db.once("open", () => {
    console.log("Connected to DB");
    FBAInv.insertMany(data)
      .then(() => {
        console.log("Inserted All Records to DB");
        sendEmail("Success", "All records added to DB succesfully");
      })
      .catch((err) => {
        console.log(err);
        sendEmail("Error", "Error:\n" + err);
      });
  });
}

export default insert;
