const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const asyncHandler = require("express-async-handler");

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));

module.exports = router;
