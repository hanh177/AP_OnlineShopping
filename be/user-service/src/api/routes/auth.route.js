const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../middlewares/auth");

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));
router.post("/forgot-password", asyncHandler(authController.forgotPassword));
router.post("/refresh-token", asyncHandler(authController.refreshToken));

// Middleware to protect the routes below
router.use(asyncHandler(requireAuth));
router.post("/change-password", asyncHandler(authController.changePassword));
router.post("/logout", asyncHandler(authController.logout));

module.exports = router;
