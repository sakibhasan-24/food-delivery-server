import express from "express";
import { verifyToken } from "../helper/verifyToken.js";
import { createItems } from "../controller/item.controller.js";

const router = express.Router();

router.post("/add-items", verifyToken, createItems);
export default router;
