import mongoose from "mongoose";
const userData = new mongoose.Schema({
  name: String,
  email: String,
  username: {
    type: String,
    required: true,
    unique: [true, "username already exists"],
  },
  password: { type: String, required: [true, "Password is required"] },
});
const User = mongoose.model("User", userData);
export default User;
