import express from "express";
import mongoose from "mongoose";
import App from "./routes/index.js";
const server = express();
mongoose.connect("mongodb://localhost:27017/");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongodb connection error"));
db.once("open", () => {
  console.log("connected to mongodb");
});
server.use(App);
server.listen(3000, () => console.log("connect port 3000"));
