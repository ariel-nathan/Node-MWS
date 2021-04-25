import Mongoose from "mongoose";
import dotenv from "dotenv";
import { Product, Listing } from "./schema.js";
import sendEmail from "./mailer.js";

dotenv.config();

const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;

function insert(data) {
  Mongoose.connect(MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = Mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));

  db.once("open", () => {
    console.log("Connected to DB");
    Product.insertMany(data)
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
