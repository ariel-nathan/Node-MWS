import Mongoose from "mongoose";

const AFNProductSchema = new Mongoose.Schema({
  "seller-sku": String,
  "fulfillment-channel-sku": String,
  asin: String,
  "condition-type": String,
  "Warehouse-Condition-code": String,
  "Quantity Available": Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
export const FBAInv = Mongoose.model("Product", AFNProductSchema);
