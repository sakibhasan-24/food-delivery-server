import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userAuthRouter from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
// import("dotenv").config();
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/user", userAuthRouter);
app.use("/api/user", userRoute);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// eXhHF7gEP3pjjNBh
