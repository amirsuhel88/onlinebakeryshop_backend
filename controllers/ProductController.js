const mysql = require("mysql");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "onlinebakeryshop",
});

//add a product

exports.addProduct = catchAsyncErrors(async (req, res, next) => {
  const sql =
    "INSERT INTO products(`ProductId`, `ProductName`, `Description`, `Price`, `StockQuantity`, `CategoryName` ) VALUES (?,?,?,?,?,?)";
  const values = [
    req.body.ProductId,
    req.body.ProductName,
    req.body.Description,
    req.body.Price,
    req.body.StockQuantity,
    req.body.CategoryName,
  ];
  db.query(sql, values, (err, data) => {
    console.log(err);
    if (err) {
      return res.json("product add error......dlfjs");
    }
    return res.json("Product added succesfully");
  });
});

//get All products

//with pagination
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  // Define pagination parameters
  const page = parseInt(req.query.page) || 1; // Current page, default is 1
  const limit = parseInt(req.query.limit) || 10; // Number of items per page, default is 10
  const offset = (page - 1) * limit; // Offset calculation

  // SQL query with pagination
  const sql = `SELECT * FROM products LIMIT ${limit} OFFSET ${offset}`;

  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

//get product details individually

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const sql = "SELECT * FROM products WHERE ProductId=?";
  db.query(sql, req.params.ProductId, (err, data) => {
    if (err) {
      return res.json("can't get product");
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(data[0]);
  });
});
