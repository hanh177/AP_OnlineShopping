const { APP_USER_PORT, APP_PRODUCT_PORT } = process.env;
module.exports.REDIS_REVOKED_PREFIX = "revoked_jti";
module.exports.API_SERVICES = [
  {
    name: "User Service",
    port: APP_USER_PORT,
    proxyPath: "/users",
    apiDocUrl: `http://localhost:${APP_USER_PORT}/docs-json`,
  },
  {
    name: "Product Service",
    port: APP_PRODUCT_PORT,
    proxyPath: "/products",
    apiDocUrl: `http://localhost:${APP_PRODUCT_PORT}/docs-json`,
  },
];

module.exports.HEADER_AUTH = "x-auth";
