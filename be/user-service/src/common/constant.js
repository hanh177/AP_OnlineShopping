const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

const REDIS_REVOKED_PREFIX = "revoked_jti";
module.exports = { ROLES, REDIS_REVOKED_PREFIX };
