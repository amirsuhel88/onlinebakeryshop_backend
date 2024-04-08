const mysql = require("mysql");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "onlinebakeryshop",
});

//get all cart items

exports.getCartItems = catchAsyncErrors(async (req, res, next) => {
  const sql = "SELECT * FROM cart";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

//add to cart
exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  console.log(req.user);
  const userId = req.user.userId;
  const { quantity } = req.body; 

  if (!quantity) {
    return res.status(400).json({ error: "Product and quantity are required" });
  }

  const insertSql =
    "INSERT INTO cart (userId) VALUES (?)";

  try {
    await db.query(insertSql, [userId]);
    return res
      .status(201)
      .json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    console.error("Error inserting into cart:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to add item to cart" });
  }
});

