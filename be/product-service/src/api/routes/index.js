const express = require("express");
const router = express.Router();

router.use("/", require("./product.route"));
router.use("/categories", require("./category.route"));

module.exports = router;
