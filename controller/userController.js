import User from "../models/User.js";
export const createUser = async (req, res) => {
  const { name, username, password, email } = req.body;
};

export const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    if (user == null) {
      return res.status(204).json({
        status: "null",
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching user" });
  }
};
