require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const { NotFound } = require("./common/errorResponse");
const errorHandler = require("./api/middlewares/errorHandler");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

require("./config/database");

// Serve Swagger UI
const docs = {
  openapi: "3.0.0",
  info: {
    title: "User Service API",
    version: "1.0.0",
    description: "API for user service",
  },
  paths: {},
  components: {},
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
    },
  ],
};

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "swagger.json"), "utf8")
);
docs.paths = swaggerDocument.paths;
docs.components = swaggerDocument.components;

app.use("/docs", swaggerUi.serve, swaggerUi.setup(docs));
app.get("/docs-json", (req, res) => res.json(docs));

app.use("/", require("./api/routes"));

// handle errors
app.use((req, res, next) => {
  return next(NotFound());
});

// error handler middlewares
app.use(errorHandler);

module.exports = app;
