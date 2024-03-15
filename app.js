const express = require("express")
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json())

const user = require("./routes/userRoute")

app.use("/api/v1", user)

module.exports = app;