const express = require("express");
const asyncHandler = require("express-async-handler");
const userController = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares");

const router = express.Router();
router.get(
  "/me",
  asyncHandler(authMiddleware),
  asyncHandler(userController.getMe)
);

router.get("/", (req, res) => {
  res.send("Get list users");
});

router.get("/:id", (req, res) => {
  res.send("Get user by id");
});

router.post("/", (req, res) => {
  res.send("Create a user");
});

router.put("/:id", (req, res) => {
  res.send("Update the user");
});

module.exports = router;
