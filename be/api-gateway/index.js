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

// Configure proxy for user service with file upload support
app.use(
  "/users",
  proxy(`http://localhost:${APP_USER_PORT}`, {
    // Preserve the original request body
    preserveHostHdr: true,
    // Don't parse the body, let the target service handle it
    parseReqBody: false,
    // Forward the original headers
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      if (srcReq.headers["content-type"])
        proxyReqOpts.headers["Content-Type"] = srcReq.headers["content-type"];
      return proxyReqOpts;
    },
  })
);

app.use(
  "/products",
  proxy(`http://localhost:${APP_PRODUCT_PORT}`, {
    // Preserve the original request body
    preserveHostHdr: true,
    // Don't parse the body, let the target service handle it
    parseReqBody: false,
    // Forward the original headers
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      if (srcReq.headers["content-type"])
        proxyReqOpts.headers["Content-Type"] = srcReq.headers["content-type"];
      return proxyReqOpts;
    },
  })
);

app.listen(APP_PORT, () => {
  console.log(`Gateway is Listening to Port ${APP_PORT}`);
});
