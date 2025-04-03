require("dotenv").config();
const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const swaggerUi = require("swagger-ui-express");
const getAggregatedDocs = require("./swaggerAggregator");

const { APP_PORT, APP_USER_PORT, APP_PRODUCT_PORT } = process.env;

// Create proxy middleware with common configuration
const createProxyMiddleware = (targetPort) => {
  return proxy(`http://localhost:${targetPort}`, {
    preserveHostHdr: true,
    parseReqBody: false,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      if (srcReq.headers["content-type"]) {
        proxyReqOpts.headers["Content-Type"] = srcReq.headers["content-type"];
      }
      return proxyReqOpts;
    },
  });
};

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("API Gateway is running");
});

// Swagger documentation routes
app.get("/docs-json", async (req, res) => {
  const docs = await getAggregatedDocs();
  res.json(docs);
});

app.use("/docs", swaggerUi.serve, async (req, res, next) => {
  const docs = await getAggregatedDocs();
  return swaggerUi.setup(docs)(req, res, next);
});

// Service routes
app.use("/users", createProxyMiddleware(APP_USER_PORT));
app.use("/products", createProxyMiddleware(APP_PRODUCT_PORT));

// Start server
app.listen(APP_PORT, () => {
  console.log(`Gateway is Listening to Port ${APP_PORT}`);
});
