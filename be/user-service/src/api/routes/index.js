const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/", require("./user.route"));

module.exports = router;
