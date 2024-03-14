import express from "express";

// npm i bcryptjs
import { userSignUp } from "../controller/auth.controller.js";

const router = express.Router();
router.post("/user", userSignUp);

export default router;
