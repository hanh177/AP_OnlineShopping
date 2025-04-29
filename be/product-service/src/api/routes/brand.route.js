const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brand.controller");
const asyncHandler = require("express-async-handler");

router.get("/", asyncHandler(brandController.getBrands));

module.exports = router;
