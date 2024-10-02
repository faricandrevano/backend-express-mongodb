import express from "express";
import {
  index,
  store,
  show,
  update,
  destroy,
} from "../controller/UserController.js";
const router = express.Router();

router.post("/", store);
router.get("/", index);
router.get("/:id", show);
router.patch("/:id", update);
router.delete("/:id", destroy);
export default router;
