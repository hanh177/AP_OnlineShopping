require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { NotFound } = require("./common/errorResponse");
const errorHandler = require("./api/middlewares/errorHandler");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

require("./config/database");

app.use("/", require("./api/routes"));

// handle errors
app.use((req, res, next) => {
  return next(NotFound());
});

// error handler middlewares
app.use(errorHandler);

module.exports = app;
