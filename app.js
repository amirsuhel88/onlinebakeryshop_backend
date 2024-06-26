const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const user = require("./routes/userRoute");
const product = require("./routes/ProductRoute");
const cart = require("./routes/CartRoute");
const address = require("./routes/AddressRoute");

app.use("/api/v1", user);
app.use("/api/v2", product);
app.use("/api/v3", cart);
app.use("/api/v4", address);

module.exports = app;
