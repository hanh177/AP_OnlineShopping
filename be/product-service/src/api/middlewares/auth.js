const { ROLES, HEADER_AUTH } = require("../../common/constant");
const { Unauthorized, Forbidden } = require("../../common/errorResponse");

const requireAuth = (req, res, next) => {
  const decoded = JSON.parse(req.headers[HEADER_AUTH] || "{}");

  if (!decoded._id) {
    throw Unauthorized();
  }

  const { jti, ...user } = decoded;
  req.user = user;
  next();
};

const hasRole = (role) => (req, res, next) => {
  if ((req.user.role || ROLES.USER) !== role) {
    throw Forbidden();
  }
  next();
};

const loadUsers = (req, res, next) => {
  const decoded = JSON.parse(req.headers[HEADER_AUTH] || "{}");

  if (!decoded._id) {
    return next();
  }

  const { jti, ...user } = decoded;
  req.user = user;
  next();
};

const isProductOwner = (req, res, next) => {
  if ((req.user.role !== ROLES.ADMIN && req.product.user) !== req.user._id)
    throw Forbidden();
  next();
};

module.exports = { requireAuth, hasRole, loadUsers, isProductOwner };
