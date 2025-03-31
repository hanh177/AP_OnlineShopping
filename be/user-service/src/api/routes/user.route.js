const express = require("express");
const asyncHandler = require("express-async-handler");
const userController = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth");

const router = express.Router();
router.get(
  "/me",
  asyncHandler(authMiddleware),
  asyncHandler(userController.getMe)
);

router.get("/", asyncHandler(userController.getUsers));

router.get("/:id", asyncHandler(userController.getUserById));

router.post("/", asyncHandler(userController.createUser));

router.put(
  "/:id",
  asyncHandler(authMiddleware),
  asyncHandler(userController.updateUser)
);

module.exports = router;
