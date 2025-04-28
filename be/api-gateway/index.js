require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { APP_PORT } = process.env;
const loadServices = require("./config/createProxyMiddleware");
const loadSwaggerDocs = require("./config/swaggerAggregator");

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("API Gateway is running");
});

// Load Swagger documentation
loadSwaggerDocs(app);

// Load services
loadServices(app);

// Start server
app.listen(APP_PORT, () => {
  console.log(`Gateway is Listening to Port ${APP_PORT}`);
});
