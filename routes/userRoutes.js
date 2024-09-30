import express from "express";
import { createUser, getAllUser } from "../controller/UserController.js";
const router = express.Router();

router.get("/", getAllUser);

export default router;
