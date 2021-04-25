import express from "express";
import { ListingData } from "../models/listingData.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const listingData = await ListingData.find();
    res.json(listingData);
  } catch (err) {
    res.json(err);
  }
});

router.get("/findbyid/:id", async (req, res) => {
  try {
    const listingData = await ListingData.findById(req.params.id);
    res.json(listingData);
  } catch (err) {
    res.json(err);
  }
});

router.get("/findbysku/:sellerSku", async (req, res) => {
  try {
    const listingData = await ListingData.find()
      .where("seller-sku")
      .equals(req.params.sellerSku);
    res.json(listingData);
  } catch (err) {
    res.json(err);
  }
});

router.get("/findbyasin/:asin", async (req, res) => {
  try {
    const listingData = await ListingData.find()
      .where("asin1")
      .equals(req.params.asin);
    res.json(listingData);
  } catch (err) {
    res.json(err);
  }
});

export default router;
