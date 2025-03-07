require("dotenv").config();
const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const {
    APP_PORT,
    APP_USER_PORT
} = process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", proxy(`http://localhost:${APP_USER_PORT}`));

app.listen(APP_PORT, () => {
    console.log(`Gateway is Listening to Port ${APP_PORT}`);
});
