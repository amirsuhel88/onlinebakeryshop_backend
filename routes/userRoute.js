const express = require("express");
const { getUsers, signUp, login } = require("../controllers/userController");

const router = express.Router();

router.route("/users").get(getUsers);
router.route("/signup").post(signUp);
router.route("/login").post(login)


module.exports = router;
