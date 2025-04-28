const { USER_SERVICE_URL, PRODUCT_SERVICE_URL } = process.env;
module.exports.REDIS_REVOKED_PREFIX = "revoked_jti";
module.exports.API_SERVICES = [
  {
    name: "User Service",
    url: USER_SERVICE_URL,
    proxyPath: "/users",
    apiDocUrl: `${USER_SERVICE_URL}/docs-json`,
  },
  {
    name: "Product Service",
    url: PRODUCT_SERVICE_URL,
    proxyPath: "/products",
    apiDocUrl: `${PRODUCT_SERVICE_URL}/docs-json`,
  },
];

module.exports.HEADER_AUTH = "x-auth";
