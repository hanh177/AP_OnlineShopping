const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { Unauthorized, Forbidden } = require("../../common/errorResponse");
const { ROLES } = require("../../common/constant");
const { decodeToken } = require("../../common/auth");

const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw Unauthorized();
  }
  const tokenString = token.split(" ")[1];
  const decoded = decodeToken(tokenString);
  if (!decoded) {
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
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  const decoded = decodeToken(tokenString);
  if (!decoded) {
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

module.exports = { requireAuth, hasRole, loadUsers };
