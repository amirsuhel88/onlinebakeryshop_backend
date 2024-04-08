const express = require("express");
const {addToCart} = require("../controllers/CartController");
const {authenticateToken} = require("../controllers/userController");
const router = express.Router();

//router.route("/cartItems").get(getCartItems);
//router.route("/addToCart").post(addToCart);
router.route("/addToCart").post(authenticateToken, addToCart);
module.exports = router;
