import express from "express";

// npm i bcryptjs
import {
  googleLogIn,
  userLogin,
  userSignUp,
} from "../controller/auth.controller.js";

const router = express.Router();
router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.post("/googleLogIn", googleLogIn);

export default router;
