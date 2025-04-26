const User = require("../models/user.model");
const { BadRequest, Unauthorized } = require("../../common/errorResponse");
const { OK } = require("../../common/successResponse");
const {
  generateTokenPair,
  revokeRefreshToken,
  hashToken,
} = require("../../common/auth");
const RefreshToken = require("../models/refreshToken.model");
class AuthController {
  async register(req, res) {
    const { name, email, password } = req.body;
    const holdUser = await User.findOne({ email });
    if (holdUser) {
      throw BadRequest("Email already exists");
    }

    const user = await User.create({ name, email, password });
    const { access_token, refresh_token } = await generateTokenPair(user);
    return OK({
      res,
      metadata: { access_token, refresh_token, user: user.toJSON() },
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
    const { access_token, refresh_token } = await generateTokenPair(user);
    return OK({
      res,
      metadata: { access_token, refresh_token, user: user.toJSON() },
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

  async logout(req, res) {
    const { user, jti } = req;
    await revokeRefreshToken({
      userId: user._id,
      jti,
    });

    return OK({
      res,
      metadata: {},
      message: "Logout successfully",
    });
  }

  async refreshToken(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw BadRequest("Refresh token is required");
    }
    const hashedToken = hashToken(refreshToken);
    const token = await RefreshToken.findOne({
      token: hashedToken,
      isRevoked: false,
      expiresAt: { $gt: new Date() },
    });

    if (!token) {
      throw BadRequest("Invalid refresh token");
    }

    const user = await User.findById(token.userId);
    await revokeRefreshToken({
      _id: token._id,
    });

    const { access_token, refresh_token } = await generateTokenPair(user);
    return OK({
      res,
      metadata: { access_token, refresh_token },
    });
  }
}

module.exports = new AuthController();
