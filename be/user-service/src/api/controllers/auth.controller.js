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
}

module.exports = new AuthController();
