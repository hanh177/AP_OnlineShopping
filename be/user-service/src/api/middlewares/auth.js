const User = require("../models/user.model");
const { Unauthorized, Forbidden } = require("../../common/errorResponse");
const { ROLES, HEADER_AUTH } = require("../../common/constant");

const requireAuth = async (req, res, next) => {
  const decoded = JSON.parse(req.headers[HEADER_AUTH] || "{}");

  if (!decoded._id) {
    throw Unauthorized();
  }

  const user = await User.findById(decoded._id);
  if (!user || user.isDeleted) {
    throw Unauthorized();
  }

  req.user = user;
  req.jti = decoded.jti;
  next();
};

const hasRole = (role) => async (req, res, next) => {
  if ((req.user.role || ROLES.USER) !== role) {
    throw Forbidden();
  }
  next();
};

const loadUsers = async (req, res, next) => {
  const decoded = JSON.parse(req.headers[HEADER_AUTH] || "{}");

  if (!decoded._id) {
    return next();
  }

  const user = await User.findById(decoded._id);
  if (!user || user.isDeleted) {
    throw Unauthorized();
  }

  req.user = user;
  req.jti = decoded.jti;
  next();
};

module.exports = { requireAuth, hasRole, loadUsers };
