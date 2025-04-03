const express = require("express");
const asyncHandler = require("express-async-handler");
const userController = require("../controllers/user.controller");
const { requireAuth, hasRole } = require("../middlewares/auth");
const { ROLES } = require("../../common/constant");
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
  asyncHandler(requireAuth),
  asyncHandler(hasRole(ROLES.ADMIN)),
  asyncHandler(userController.createUser)
);

router.put(
  "/",
  asyncHandler(requireAuth),
  asyncHandler(userController.updateUser)
);

router.put(
  "/:id",
  asyncHandler(requireAuth),
  asyncHandler(hasRole(ROLES.ADMIN)),
  asyncHandler(userController.updateUser)
);

router.post(
  "/upload-avatar",
  asyncHandler(requireAuth),
  upload.single("file"),
  asyncHandler(userController.uploadAvatar)
);

module.exports = router;
