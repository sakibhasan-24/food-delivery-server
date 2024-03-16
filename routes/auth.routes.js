import express from "express";

// npm i bcryptjs
import { userLogin, userSignUp } from "../controller/auth.controller.js";

const router = express.Router();
router.post("/signup", userSignUp);
router.post("/login", userLogin);

export default router;
