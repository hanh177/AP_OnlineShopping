const { OK, CREATED } = require("../../common/successResponse");
const { uploadFile } = require("../../common/s3Client");
const User = require("../models/user.model");
const { NotFound, BadRequest } = require("../../common/errorResponse");
const { toObjectId } = require("../../common/util");
const { ROLES } = require("../../common/constant");
class UserController {
  async getUsers(req, res) {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      sort_order = "desc",
    } = req.query;

    const query = {};
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ];
    }
    const users = await User.find(query)
      .sort({ [sort]: sort_order })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments(query);
    return OK({
      res,
      metadata: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        items: users.map((user) => user.getPublicFields()),
      },
    });
  }
  async getUserById(req, res) {
    const { id } = req.params;
    const user = await User.findById(toObjectId(id));
    if (!user) {
      throw NotFound("User not found");
    }
    return OK({
      res,
      metadata: user.getPublicFields(),
    });
  }
  async getMe(req, res) {
    return OK({
      res,
      metadata: req.user,
    });
  }
  async createUser(req, res) {
    const { _id, ...userData } = req.body;
    const holdUser = await User.findOne({ email: userData.email });
    if (holdUser) {
      throw BadRequest("User already exists");
    }
    const user = await User.create(userData);
    return CREATED({
      res,
      metadata: user.getPublicFields(),
    });
  }
  async updateUser(req, res) {
    const userData = req.body;
    const id =
      req.user.role === ROLES.ADMIN && req.params.id
        ? req.params.id
        : req.user._id;
    const user = await User.findByIdAndUpdate(id, userData, {
      new: true,
    });

    return OK({
      res,
      metadata: user.getPublicFields(),
    });
  }
  async uploadAvatar(req, res) {
    const { file } = req;
    if (!file) {
      throw BadRequest("File is required");
    }
    const avatarUrl = await uploadFile(file);
    await User.findByIdAndUpdate(
      req.user._id,
      { avatar: avatarUrl },
      { new: true }
    );
    return OK({
      res,
      metadata: {
        avatar: avatarUrl,
      },
    });
  }
}

module.exports = new UserController();
