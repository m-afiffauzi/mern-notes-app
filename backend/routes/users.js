const express = require("express");
const users = require("../controllers/usersController");
const router = express.Router();

// signup routes
router.post("/signup", users.signup);

// login routes
router.post("/login", users.login);

module.exports = router;
