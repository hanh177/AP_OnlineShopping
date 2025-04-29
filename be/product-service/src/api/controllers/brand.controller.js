const Brand = require("../models/brand.model");
const { OK } = require("../../common/successResponse");

class BrandController {
  async getBrands(req, res) {
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

    const brands = await Brand.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sort]: sort_order });

    const total = await Brand.countDocuments(query);

    return OK({
      res,
      metadata: {
        items: brands,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
      },
      message: "Categories fetched successfully",
    });
  }
}

module.exports = new BrandController();
