import express from "express";
import { verifyToken } from "../helper/verifyToken.js";
import {
  userLogOut,
  userUpdate,
  deleteUser,
} from "../controller/user.controller.js";

const router = express.Router();

// router.post("/user", userSignUp);

router.put("/userProfileUpdate/:id", verifyToken, userUpdate);
router.get("/userLogOut/:id", verifyToken, userLogOut);
router.delete("/userDelete/:id", verifyToken, deleteUser);

export default router;
