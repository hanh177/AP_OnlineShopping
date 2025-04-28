require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { APP_PORT } = process.env;
const loadServices = require("./config/proxy.middleware");
const loadSwaggerDocs = require("./config/swagger");
const checkAuth = require("./config/auth.middleware");

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

require("./config/redis");

app.use(checkAuth);

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
