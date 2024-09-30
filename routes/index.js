import express from "express";
import userRoute from "./userRoutes.js";
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Ok",
  });
});
app.use("/users", userRoute);

export default app;
