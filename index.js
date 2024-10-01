import express from "express";
import mongoose from "mongoose";
import App from "./routes/index.js";
import bodyParser from "body-parser";
const server = express();
mongoose.connect("mongodb://localhost:27017/api");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongodb connection error"));
db.once("open", () => {
  console.log("connected to mongodb");
});
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(App);
server.listen(3000, () => console.log("connect port 3000"));
