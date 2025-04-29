const Category = require("../models/category.model");
const { OK, NotFound } = require("../../common/successResponse");
const { toObjectId } = require("../../common/util");

class CategoryController {
  async getCategories(req, res) {
    const {
      page = 1,
      limit = 10,
      sort = "name",
      sort_order = "asc",
      search,
    } = req.query;

    const query = {
      isActive: true,
    };
    if (search) query.name = { $regex: search, $options: "i" };

    const categories = await Category.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sort]: sort_order });

    const total = await Category.countDocuments(query);

    return OK({
      res,
      metadata: {
        items: categories,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
      },
      message: "Categories fetched successfully",
    });
  }

  async getChildren(req, res) {
    const {
      page = 1,
      limit = 10,
      sort = "name",
      sort_order = "asc",
      search,
    } = req.query;

    const id = req.params.id;
    const parent = await Category.findById(toObjectId(id));

    if (!parent) {
      throw NotFound("Category not found");
    }

    const query = {
      isActive: true,
      parent: parent._id,
    };

    if (search) query.name = { $regex: search, $options: "i" };

    const categories = await Category.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sort]: sort_order });

    const total = await Category.countDocuments(query);

    return OK({
      res,
      metadata: {
        items: categories,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
      },
      message: "Categories fetched successfully",
    });
  }
}

module.exports = new CategoryController();
