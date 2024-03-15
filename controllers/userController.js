
const bcrypt= require("bcrypt")
const mysql = require("mysql");
const catchAsyncErros = require("../middleware/catchAsyncErrors");
const salt = 10;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "onlinebakeryshop",
});

//get all user info

exports.getUsers = catchAsyncErros(async (req, res, next) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

//signup/ register

exports.signUp = catchAsyncErros(async (req, res, next) => {
  const sql =
    "INSERT INTO users(`name`, `email`, `phone`, `password`) VALUES (?, ?, ?, ?)";
  bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (err) {
      console.log(err);
    }
    const values = [req.body.name, req.body.email, req.body.phone, hash];

    db.query(sql, values, (err, data) => {
      console.log(err);
      if (err) {
        return res.json("signup custom Error by me");
      }
      return res.json("Signup successful");
    });
  });
});

//login

exports.login = catchAsyncErros(async (req, res, next) => {
  const sql = "SELECT * FROM users WHERE `email` =? AND `password`=?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    console.log(err);
    if (err) {
      return res.json("login custom Error by me");
    }
    if (data.length > 0) {
      return res.json("success");
    } else {
      return res.json("fail");
    }
  });
});
