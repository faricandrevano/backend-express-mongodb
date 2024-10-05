import NameModel from "../models/User.js";

export const index = async (req, res) => {
  try {
    const users = await NameModel.find();
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
export const store = async (req, res) => {
  try {
    const { username, password, email, name } = req.body;
    const postData = new NameModel({
      username: username,
      email: email,
      name: name,
      password: password,
    });
    const data = await postData.save();
    return res.status(201).json(data);
  } catch (error) {
    if (error.name == "ValidationError") {
      return res.status(422).json(error);
    }
    if (error.code == 11000) {
      return res.status(422).json({
        error: "Username already exists",
      });
    }
    return res.status(500).json({
      error: "An error occurred while post user",
    });
  }
};

export const show = async (req, res) => {
  try {
    const data = await NameModel.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        error: "data not found",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred Server",
    });
  }
};

export const update = async (req, res) => {
  try {
    const data = await NameModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(404).json({
        error: "data not found",
      });
    }
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred Server",
    });
  }
};
export const destroy = async (req, res) => {
  try {
    const data = await NameModel.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({
        error: "data not found",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred Server",
    });
  }
};
