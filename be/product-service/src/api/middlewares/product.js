const { ROLES } = require("../../common/constant");
const { NotFound, Forbidden } = require("../../common/errorResponse");
const { toObjectId } = require("../../common/util");
const Product = require("../models/product.model");

module.exports.isValidProduct = async (req, res, next) => {
  const id = req.params.id || req.body.id;
  const product = await Product.findById(toObjectId(id))
    .populate("category")
    .populate("brand");

  if (!product) {
    throw NotFound("Product not found");
  }

  req.product = product;
  next();
};
