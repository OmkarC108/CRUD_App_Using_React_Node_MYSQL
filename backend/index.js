require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const port = 8001;
require("./dbconn");
const router = require("./Router");

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log("conected to backend");
});
