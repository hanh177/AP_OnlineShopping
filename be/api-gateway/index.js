require("dotenv").config();
const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const swaggerUi = require("swagger-ui-express");
const getAggregatedDocs = require("./swaggerAggregator");

const { APP_PORT, APP_USER_PORT, APP_PRODUCT_PORT } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Gateway is running");
});

app.get("/docs-json", async (req, res) => {
  const docs = await getAggregatedDocs();
  res.json(docs);
});

app.use("/docs", swaggerUi.serve, async (req, res, next) => {
  const docs = await getAggregatedDocs();
  return swaggerUi.setup(docs)(req, res, next);
});

app.use("/users", proxy(`http://localhost:${APP_USER_PORT}`));
app.use("/products", proxy(`http://localhost:${APP_PRODUCT_PORT}`));

app.listen(APP_PORT, () => {
  console.log(`Gateway is Listening to Port ${APP_PORT}`);
});
