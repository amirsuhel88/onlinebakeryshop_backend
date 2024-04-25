const express = require("express")
//const rotuer = express.Router();
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

//add to cart
exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  console.log(req.user);
  const userId = req.user.userId;
  const productId = req.params.productId;
  console.log(productId);
  // Check if the product with given productId exists
  const productExistsQuery = "SELECT * FROM products WHERE ProductId = ?";
  db.query(productExistsQuery, [productId], async (err, results) => {
    if (err) {
      console.error("Error checking product existence:", err);
      return res.status(500).json({ success: false, error: "Database error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    // Product exists, proceed to insert into cart
    const insertSql = "INSERT INTO cart (userId, productId) VALUES (?, ?)";
    try {
      await db.query(insertSql, [userId, productId]);
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
});

//get all cart items(show cart items)

/*
exports.getCartItems = catchAsyncErrors(async (req, res, next) => {
  const sql = "SELECT * FROM cart";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});
 */

exports.getCartItems = catchAsyncErrors(async (req, res, next) => {
  //retrieve user ID from req.user(which contains user)
  const userId = req.user.userId;

  //sql query to fetch cart items and associated product details for the logged-in user
  const sql = `
  SELECT 
    p.ProductId,
    p.ProductName,
    p.description,
    p.Price,
    p.CategoryName,
    c.quantity
    from cart c
    JOIN products p ON c.ProductID = p.ProductId
    WHERE
      c.UserId = ?
 `;
  db.query(sql, [userId], (err, data) => {
    if (err) {
      return res.status(500).json("internal Server Error");
    }
    //respond with the fetched cart items and product details
    res.json(data);
  });
});
