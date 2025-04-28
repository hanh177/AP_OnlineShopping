const jwt = require("jsonwebtoken");
const { Unauthorized, Forbidden } = require("../../common/errorResponse");
const { ROLES } = require("../../common/constant");

const requireAuth = async (req, res, next) => {
  next();
};

const hasRole = (role) => async (req, res, next) => {
  next();
};

const loadUsers = async (req, res, next) => {
  next();
};

module.exports = { requireAuth, hasRole, loadUsers };
