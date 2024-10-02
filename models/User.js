import mongoose from "mongoose";
const userData = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    validate: [
      function (v) {
        return /.+@..+/.test(v);
      },
      (props) => `${props.value} is not valid email!`,
    ],
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: "Password is required",
    minLength: [6, "Password at least 6 character"],
  },
});
const User = mongoose.model("User", userData);
export default User;
