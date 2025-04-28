const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

const REDIS_REVOKED_PREFIX = "revoked_jti";
const HEADER_AUTH = "x-auth";
module.exports = { ROLES, REDIS_REVOKED_PREFIX, HEADER_AUTH };
