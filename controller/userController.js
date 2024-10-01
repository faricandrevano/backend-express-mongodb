import User from "../models/User.js";

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({
        status: "data not found",
      });
    }
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching user" });
  }
};
export const createUser = async (req, res) => {
  try {
    const { username, password, email, name } = req.body;
    const postData = new User({
      username: username,
      email: email,
      name: name,
      password: password,
    });
    const dataSave = await postData.save();
    return res.status(201).json(dataSave);
  } catch (error) {
    if (error.name == "ValidationError") {
      return res.status(422).json(error);
    }
    return res.status(500).json({
      error: "An error occurred while post user",
    });
  }
};
