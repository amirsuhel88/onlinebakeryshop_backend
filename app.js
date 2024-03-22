const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const user = require("./routes/userRoute");
const product = require("./routes/ProductRoute");



app.use("/api/v1", user);
app.use("/api/v2", product);

module.exports = app;
