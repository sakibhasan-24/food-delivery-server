import express from "express";
import { verifyToken } from "../helper/verifyToken.js";
import {
  createItems,
  deleteItem,
  getItems,
} from "../controller/item.controller.js";

const router = express.Router();

router.post("/add-items", verifyToken, createItems);
router.get("/get-items", getItems);
router.delete("/delete-item/:id", verifyToken, deleteItem);
export default router;
