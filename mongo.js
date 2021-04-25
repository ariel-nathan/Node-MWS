import Mongoose from "mongoose";
import { Product, Listing } from "./schema.js";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;

function insertOne(data) {
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
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

export default insertOne;
