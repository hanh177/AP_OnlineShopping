const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const asyncHandler = require("express-async-handler");

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));
router.post("/forgot-password", asyncHandler(authController.forgotPassword));
router.post("/change-password", asyncHandler(authController.changePassword));

module.exports = router;
