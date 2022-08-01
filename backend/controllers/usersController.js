const Users = require("../models/usersModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
module.exports = {
  signup: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Users.signup(email, password);
      const token = createToken(user._id);
      res.status(200).json({ email, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Users.login(email, password);
      const token = createToken(user._id);
      res.status(200).json({ email, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
