const { OK, CREATED } = require("../../common/successResponse");
const { uploadFile } = require("../../common/s3Client");
const User = require("../models/user.model");
const { NOT_FOUND, BAD_REQUEST } = require("../../common/errorResponse");
class UserController {
  async getUsers(req, res) {
    return OK({
      res,
      metadata: req.user,
    });
  }
  async getUserById(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return NOT_FOUND({
        res,
        message: "User not found",
      });
    }
    return OK({
      res,
      metadata: user.toJSON(),
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
      return BAD_REQUEST({
        res,
        message: "User already exists",
      });
    }
    const user = await User.create(userData);
    return CREATED({
      res,
      metadata: user.toJSON(),
    });
  }
  async updateUser(req, res) {
    const userData = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, userData, {
      new: true,
    });

    return OK({
      res,
      metadata: user.toJSON(),
    });
  }
  async uploadAvatar(req, res) {
    const { file } = req;
    const avatarUrl = await uploadFile(file);
    await User.findByIdAndUpdate(
      req.user._id,
      { avatar: avatarUrl },
      { new: true }
    );
    return OK({
      res,
      metadata: avatarUrl,
    });
  }
}

module.exports = new UserController();
