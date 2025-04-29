const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const asyncHandler = require("express-async-handler");

router.get("/", asyncHandler(categoryController.getCategories));

router.get("/:id/children", asyncHandler(categoryController.getChildren));

module.exports = router;
