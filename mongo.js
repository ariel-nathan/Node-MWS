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
    data.forEach((item, i) => {
      setTimeout(() => {
        const product = new Product(item);
        product.save((err, product) => {
          if (err) return console.log(err);
          console.log("Inserted record to DB");
          console.log(product["seller-sku"]);
        });
      }, (i + 1) * 5000);
    });
  });
}

export default insertOne;
