import express from "express";
import mongoose from "mongoose";
import App from "./routes/index.js";
import bodyParser from "body-parser";
import Logger from "./middleware/Logger.js";
// import { spawn } from "child_process";
const server = express();

// parser json
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
// middleware request
server.use(Logger);
server.use(App);

// Koneksi ke MongoDB
export async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/api");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error; // Menghentikan eksekusi jika koneksi gagal
  }
}

// Menjalankan server
let procces;
let isInitialStart = true;
export function startServer() {
  if (procces) {
    procces.close(() => {
      runServer(); // Panggil fungsi untuk memulai server
    });
  } else {
    runServer();
  }
}
function runServer() {
  procces = server.listen(3000, () => {
    if (isInitialStart) {
      console.log(`Server is running on http://localhost:${3000}`);
      isInitialStart = false;
    }
  });
}
