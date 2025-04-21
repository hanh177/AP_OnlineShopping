const Product = require("../models/product.model");
const { PRODUCT_STATUS } = require("../../common/constant");
const { OK, CREATED } = require("../../common/successResponse");
const { NotFound } = require("../../common/errorResponse");
const { toObjectId } = require("../../common/util");

class ProductController {
  async createProduct(req, res) {
    const {
      name,
      description,
      price,
      stock,
      category,
      brand,
      attributes,
      images,
    } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      brand,
      attributes,
      images,
      user: req.user._id,
    });
    return CREATED({
      res,
      metadata: { product },
      message: "Product created successfully",
    });
  }
  async getProducts(req, res) {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      sort_order = "desc",
      search,
      status,
      category,
      brand,
    } = req.query;

    const query = {
      //   user: req.user._id,
      status: { $ne: PRODUCT_STATUS.INACTIVE },
    };
    if (status) query.status = status;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (search) query.name = { $regex: search, $options: "i" };

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sort]: sort_order })
      .populate("category")
      .populate("brand");

    const total = await Product.countDocuments(query);

    return OK({
      res,
      metadata: {
        items: products,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
      },
      message: "Products fetched successfully",
    });
  }
  async getProductById(req, res) {
    const { id } = req.params;
    const product = await Product.findById(toObjectId(id))
      .populate("category")
      .populate("brand");

    if (!product) {
      throw NotFound("Product not found");
    }
    return OK({
      res,
      metadata: { product },
      message: "Product fetched successfully",
    });
  }
  async updateProduct(req, res) {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      stock,
      category,
      brand,
      attributes,
      images,
    } = req.body;
    const product = await Product.findByIdAndUpdate(
      toObjectId(id),
      { name, description, price, stock, category, brand, attributes, images },
      { new: true }
    );
    if (!product) {
      throw NotFound("Product not found");
    }
    return OK({
      res,
      metadata: { product },
      message: "Product updated successfully",
    });
  }
  async deleteProduct(req, res) {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(toObjectId(id), {
      status: PRODUCT_STATUS.INACTIVE,
    });
    if (!product) {
      throw NotFound("Product not found");
    }
    return OK({
      res,
      message: "Product deleted successfully",
    });
  }
  async uploadImages(req, res) {
    const { id } = req.params;
    const { images } = req.body;
    const product = await Product.findByIdAndUpdate(
      toObjectId(id),
      { images },
      { new: true }
    );
    if (!product) {
      throw NotFound("Product not found");
    }

    return OK({
      res,
      metadata: { product },
      message: "Product images uploaded successfully",
    });
  }
}

module.exports = new ProductController();
