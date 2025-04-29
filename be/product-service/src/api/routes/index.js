const express = require("express");
const router = express.Router();

router.use("/categories", require("./category.route"));
router.use("/brands", require("./brand.route"));
router.use("/", require("./product.route"));

module.exports = router;
