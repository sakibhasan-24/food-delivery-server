import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import("dotenv").config();
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((error) => {
    console.log(error);
  });
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// eXhHF7gEP3pjjNBh
