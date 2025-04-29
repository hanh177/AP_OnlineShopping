const Product = require("../models/product.model");
const { PRODUCT_STATUS } = require("../../common/constant");
const { OK, CREATED } = require("../../common/successResponse");

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
    return OK({
      res,
      metadata: { product: req.product },
      message: "Product fetched successfully",
    });
  }
  async updateProduct(req, res) {
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
      req.product._id,
      { name, description, price, stock, category, brand, attributes, images },
      { new: true }
    );

    return OK({
      res,
      metadata: { product },
      message: "Product updated successfully",
    });
  }
  async deleteProduct(req, res) {
    await Product.findByIdAndUpdate(req.product._id, {
      status: PRODUCT_STATUS.INACTIVE,
    });

    return OK({
      res,
      message: "Product deleted successfully",
    });
  }
  async uploadImages(req, res) {
    const { images } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.product._id,
      { images },
      { new: true }
    );

    return OK({
      res,
      metadata: { product },
      message: "Product images uploaded successfully",
    });
  }

  async updateStock(req, res) {
    const { stock } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.product._id,
      { stock },
      { new: true }
    );

    return OK({
      res,
      metadata: { product },
      message: "Product stock updated successfully",
    });
  }

  async getMyProducts(req, res) {
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
      user: req.user._id,
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
}

module.exports = new ProductController();
