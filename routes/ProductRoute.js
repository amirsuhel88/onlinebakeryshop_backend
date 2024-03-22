const express = require("express");
const {
  addProduct,
  getAllProducts,
  getProductDetails
} = require("../controllers/ProductController");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/addProduct").post(addProduct);
router.route("/product/:ProductId").get(getProductDetails);

module.exports = router;
