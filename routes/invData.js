import express from "express";
import { FBAInv } from "../models/FBAInvData.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const invData = await FBAInv.find();
    res.json(invData);
  } catch (err) {
    res.json(err);
  }
});

router.get("/findbyid/:id", async (req, res) => {
  try {
    const invData = await FBAInv.findById(req.params.id);
    res.json(invData);
  } catch (err) {
    res.json(err);
  }
});

router.get("/findbysku/:sellerSku", async (req, res) => {
  try {
    const invData = await FBAInv.find()
      .where("seller-sku")
      .equals(req.params.sellerSku);
    res.json(invData);
  } catch (err) {
    res.json(err);
  }
});

router.get("/findbyasin/:asin", async (req, res) => {
  try {
    const invData = await FBAInv.find().where("asin").equals(req.params.asin);
    res.json(invData);
  } catch (err) {
    res.json(err);
  }
});

export default router;
