const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { Unauthorized, Forbidden } = require("../../common/errorResponse");
const { ROLES } = require("../../common/constant");

const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw Unauthorized();
  }
  const tokenString = token.split(" ")[1];
  const decoded = jwt.verify(tokenString, process.env.APP_TOKEN_SECRET);
  const user = await User.findById(decoded.id);
  if (!user || user.isDeleted) {
    throw Unauthorized();
  }
  req.user = user;
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
  const tokenString = token.split(" ")[1];
  const decoded = jwt.verify(tokenString, process.env.APP_TOKEN_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    throw Unauthorized();
  }
  req.user = user;
  next();
};

module.exports = { requireAuth, hasRole, loadUsers };
