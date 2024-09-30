import mongoose from "mongoose";
const userData = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String,
});
const User = mongoose.model("User", userData);
export default User;
