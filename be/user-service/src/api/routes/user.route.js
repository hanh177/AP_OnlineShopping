const express = require("express");
const asyncHandler = require("express-async-handler");
const userController = require("../controllers/user.controller");
const { requireAuth, isAdmin } = require("../middlewares/auth");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();
router.get(
  "/me",
  asyncHandler(requireAuth),
  asyncHandler(userController.getMe)
);

router.get("/", asyncHandler(userController.getUsers));

router.get("/:id", asyncHandler(userController.getUserById));

router.post(
  "/",
  asyncHandler(isAdmin),
  asyncHandler(userController.createUser)
);

router.put(
  "/:id",
  asyncHandler(requireAuth),
  asyncHandler(userController.updateUser)
);

router.post(
  "/upload-avatar",
  upload.single("file"),
  asyncHandler(requireAuth),
  asyncHandler(userController.uploadAvatar)
);

module.exports = router;
