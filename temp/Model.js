import mongoose from "mongoose";
const nameSchema = new mongoose.Schema({});
const name = mongoose.model("User", nameSchema);
export default name;
