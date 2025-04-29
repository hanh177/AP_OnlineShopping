const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const asyncHandler = require("express-async-handler");
const { requireAuth, isProductOwner } = require("../middlewares/auth");
const { isValidProduct } = require("../middlewares/product");

const requireOwnerShip = [
  requireAuth,
  asyncHandler(isValidProduct),
  isProductOwner,
];

router.get("/", asyncHandler(productController.getProducts));

router.get("/mine", requireAuth, asyncHandler(productController.getMyProducts));

router.get(
  "/:id",
  asyncHandler(isValidProduct),
  asyncHandler(productController.getProductById)
);

router.post("/", requireAuth, asyncHandler(productController.createProduct));

router.put(
  "/:id",
  requireOwnerShip,
  asyncHandler(productController.updateProduct)
);

router.delete(
  "/:id",
  requireOwnerShip,
  asyncHandler(productController.deleteProduct)
);

router.patch(
  "/:id/stock",
  requireOwnerShip,
  asyncHandler(productController.updateProduct)
);

module.exports = router;
