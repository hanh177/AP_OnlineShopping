const User = require("../models/user.model");
const { BadRequest, Unauthorized } = require("../../common/errorResponse");
const { OK } = require("../../common/successResponse");

class AuthController {
  async register(req, res) {
    const { name, email, password } = req.body;
    const holdUser = await User.findOne({ email });
    if (holdUser) {
      throw BadRequest("Email already exists");
    }
    const user = await User.create({ name, email, password });
    const token = user.generateToken();
    return OK({
      res,
      metadata: { token, user: user.toJSON() },
    });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw Unauthorized("Invalid email or password");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw Unauthorized("Invalid email or password");
    }
    const token = user.generateToken();
    return OK({
      res,
      metadata: { token, user: user.toJSON() },
    });
  }

  async forgotPassword(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw BadRequest("Email not found");
    }

    const newPassword = Math.random().toString(36).substring(2, 15);
    user.password = newPassword;
    await user.save();
    // TODO: Send new password to user email instead of returning it
    return OK({
      res,
      metadata: { newPassword },
      message: "Password reset email sent",
    });
  }

  async changePassword(req, res) {
    const { email, password, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw BadRequest("Email not found");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw BadRequest("Invalid password");
    }
    user.password = newPassword;
    await user.save();
    return OK({
      res,
      metadata: {},
      message: "Password changed successfully",
    });
  }
}

module.exports = new AuthController();
