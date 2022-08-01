const Users = require("../models/usersModel");

module.exports = {
  signup: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Users.signup(email, password);
      res.status(200).json({ email, user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  login: async (req, res) => {
    res.status(200).json({ login });
  },
};
