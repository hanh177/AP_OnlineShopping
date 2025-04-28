require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const { NotFound } = require("./common/errorResponse");
const errorHandler = require("./api/middlewares/errorHandler");
const getSwaggerConfig = require("./config/swagger");
const swaggerDocs = getSwaggerConfig();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/database");
require("./config/redis");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("/docs-json", (req, res) => res.json(swaggerDocs));

app.use("/", require("./api/routes"));

// handle errors
app.use((req, res, next) => {
  return next(NotFound());
});

// error handler middlewares
app.use(errorHandler);

module.exports = app;
